import { Builder, By, Key, ThenableWebDriver, until, WebDriver, WebElement } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { Bot } from '../libs/bot';
import { Board } from './board';

export class Solver {

  public url: string;
  public delay: number;
  public driver?: WebDriver;
  public bot: Bot;
  public moves: { [key: string]: string } = {
    DOWN: Key.ARROW_DOWN,
    LEFT: Key.ARROW_LEFT,
    RIGHT: Key.ARROW_RIGHT,
    UP: Key.ARROW_UP,
  };

  constructor() {
    this.url = 'http://2048game.com';
    this.delay = 0.1 * 1000;
    this.bot = new Bot();
  }
  public async init() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    // const driver = await new Builder().forBrowser('chrome').build();
    await driver.get(this.url);
    await driver.wait(until.titleContains('2048'), 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.className('tile-container'))));
    this.driver = driver;
  }
  public async run() {
    const isGameOver = false;
    let retryCount = 0;
    if (this.driver) {
      const driver = this.driver;
      try {
        while (!isGameOver) {
          const isUpdate = await this.update(true);
          if (isUpdate) {
            retryCount = 0;
            const nextMove = this.calculate();
            await this.move(nextMove);
          } else if (retryCount < 5) {
            const nextMove = this.calculate();
            await this.move(nextMove);
          } else {
            if (retryCount > 5) {
              console.log('Timed out');
              this.bot.print();
              break;
            }
            retryCount++;
          }
          await this.sleep(this.delay);
        }
      } catch (error) {
        console.log(error);
      } finally {
        await driver.quit();
      }
    }
  }
  public async  sleep(time: number): Promise<void> {
    const driver = this.driver;
    if (driver) {
      await driver.sleep(time);
    }
  }

  public calculate() {
    const bot = this.bot;
    const nextMove = bot.calcuateNextMove();
    console.log(`Move ${nextMove}!`);    
    return this.moves[nextMove];
  }

  public async update(force?:boolean): Promise<boolean> {
    const driver = this.driver;
    let isUpdated = false;
    if (driver) {
      const grid = await this.parseGrid(driver);
      const bot = this.bot;
      const newBoard = new Board(grid.join());
      if (force) {
        bot.setBoard(newBoard);
        bot.print();
        return true;
      }
      isUpdated = bot.syncBoard(newBoard);
      if (isUpdated) {
        console.log(bot.getScore());
        bot.print();
      }
    }
    return isUpdated;
  }

  public async  move(move: string) {
    const driver = this.driver;
    if (driver) {
      const window = await driver.findElement(By.xpath('/html'));
      await window.sendKeys(move);
    }
  }

  public async  parseGrid(driver: WebDriver) {
    const grid: number[] = new Array();
    while (true) {
      for (let x = 0; x < 4; ++x) {
        for (let y = 0; y < 4; ++y) {
          const index = y * 4 + x;
          const className = `tile-position-${x + 1}-${y + 1}`;
          const className2 = 'tile-merged';
          try {
            let text = ''
            try {
              text = await driver.findElement(By.css(`.${className}.${className2}`)).getText();
            } catch (error) {
              text = await driver.findElement(By.css(`.${className}`)).getText();              
            }
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
