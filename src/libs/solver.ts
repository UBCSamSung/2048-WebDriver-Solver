import { Builder, By, Key, until, WebElement, WebDriver, ThenableWebDriver } from 'selenium-webdriver';
import { Driver } from 'selenium-webdriver/ie';
import { Bot } from "../libs/bot";
import { Board } from './grid';


export class Solver {

  url: string;
  delay: number;
  driver?: WebDriver;
  bot: Bot;
  moves:{[key:string]:string} = {
    'UP':Key.ARROW_UP,
    'DOWN':Key.ARROW_DOWN,
    'LEFT':Key.ARROW_LEFT,
    'RIGHT':Key.ARROW_RIGHT,    
  };

  constructor() {
    this.url = "http://2048game.com";
    this.delay = 0.2 * 1000;
    this.bot = new Bot();
  }
  async init() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get(this.url);
    await driver.wait(until.titleContains('2048'), 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.className('tile-container'))));
    this.driver = driver;
  }
  async run() {
    let isGameOver = false;
    let retryCount = 0;
    if (this.driver) {
      const driver = this.driver;
      try {
        while (!isGameOver) {
          const isUpdate = await this.update(driver);
          if (isUpdate) {
            retryCount = 0;
            const nextMove = this.calculate();
            await this.move(driver, nextMove);
          } else {
            if (retryCount > 3) {
              console.log('Timed out');
              break;
            }
            retryCount ++;
          }
          await this.sleep(driver, 200);
        }
      } catch (error) {
        console.log(error);
      } finally {
        await driver.quit();
      }
    }
  }
  async  sleep(driver: WebDriver, time: number): Promise<void> {
    driver.sleep(time);
  }

  calculate() {
    const bot = this.bot;
    return this.moves[bot.calcuateNextMove()];
  }

  async update(driver: WebDriver): Promise<boolean> {
    const grid = await this.parseGrid(driver);
    const bot = this.bot;
    const isUpdated = bot.syncBoard(new Board(grid.join()));
    if (isUpdated) {
      console.log(bot.getScore());
      bot.print();
    }
    return isUpdated;
  }

  async  move(driver: WebDriver, move: string) {
    let window = await driver.findElement(By.xpath("/html"));
    await window.sendKeys(move);
  }

  async  parseGrid(driver: WebDriver) {
    let grid: number[] = new Array();
    while (true) {
      for (let x = 0; x < 4; ++x) {
        for (let y = 0; y < 4; ++y) {
          const index = y * 4 + x;
          const className = `tile-position-${x + 1}-${y + 1}`;
          try {
            const text = await driver.findElement(By.className(className)).getText();
            const num = parseInt(text);
            grid[index] = num;
          } catch (error) {
            grid[index] = 0;
          }
        }
      }
      return grid;
    }
  }
}


