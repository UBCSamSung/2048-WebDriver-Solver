import { Builder, By, Key, until, WebElement } from 'selenium-webdriver';
import { equals, toString } from '../libs/util'

const url = "http://2048game.com";

async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url);
    await driver.wait(until.titleContains('2048'), 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.className('tile-container'))))

    async function parseGrid() {
      let tiles: number[][] = new Array()
      while (true) {
        for (let i = 0; i < 4; ++i) {
          tiles[i] = new Array();
          for (let j = 0; j < 4; ++j) {
            let className = `tile-position-${j + 1}-${i + 1}`;
            try {
              let num = parseInt(await driver.findElement(By.className(className)).getText());
              if (num % 2 != 0) continue;
              tiles[i][j] = num;
            } catch (error) {
              tiles[i][j] = 0;
            }
          }
        }
        return tiles;
      }
    }
    console.log(toString(await parseGrid()));
    let oldGrid = null;
    let newGrid = null;
    do {
      oldGrid = await parseGrid();
      await driver.findElement(By.xpath("/html")).then(value => { value.sendKeys(Key.ARROW_LEFT) });
      await driver.sleep(1*1000);
      console.log(toString(await parseGrid()));
      newGrid = await parseGrid();
    } while (!equals(oldGrid, newGrid));
  } catch {
    console.log('error');
  } finally {
    await driver.quit();
  }
}
example();