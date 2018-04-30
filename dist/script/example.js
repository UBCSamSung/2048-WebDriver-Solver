"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const util_1 = require("../libs/util");
const url = "http://2048game.com";
const delay = 0.2 * 1000;
async function example() {
    let driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        await driver.wait(selenium_webdriver_1.until.titleContains('2048'), 1000);
        await driver.wait(selenium_webdriver_1.until.elementIsVisible(driver.findElement(selenium_webdriver_1.By.className('tile-container'))));
        console.log(util_1.toString(await parseGrid(driver)));
        let oldGrid1 = null;
        let newGrid1 = null;
        do {
            oldGrid1 = await parseGrid(driver);
            let oldGrid2 = null;
            let newGrid2 = null;
            let k = true;
            do {
                oldGrid2 = await parseGrid(driver);
                await driver.findElement(selenium_webdriver_1.By.xpath("/html")).then(value => { value.sendKeys(k ? selenium_webdriver_1.Key.ARROW_LEFT : selenium_webdriver_1.Key.ARROW_DOWN); });
                k = !k;
                console.log(util_1.toString(await parseGrid(driver)));
                newGrid2 = await parseGrid(driver);
            } while (!util_1.equals(oldGrid2, newGrid2));
            await driver.findElement(selenium_webdriver_1.By.xpath("/html")).then(value => { value.sendKeys(selenium_webdriver_1.Key.ARROW_RIGHT); });
            newGrid1 = await parseGrid(driver);
            if (util_1.equals(oldGrid1, await parseGrid(driver))) {
                driver.sleep(delay);
            }
        } while (!util_1.equals(oldGrid1, await parseGrid(driver)));
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await driver.quit();
    }
}
async function parseGrid(driver) {
    let tiles = new Array();
    while (true) {
        for (let i = 0; i < 4; ++i) {
            tiles[i] = new Array();
            for (let j = 0; j < 4; ++j) {
                let className = `tile-position-${j + 1}-${i + 1}`;
                try {
                    let num = parseInt(await driver.findElement(selenium_webdriver_1.By.className(className)).getText());
                    if (num % 2 != 0) {
                        j--;
                        continue;
                    }
                    ;
                    tiles[i][j] = num;
                }
                catch (error) {
                    tiles[i][j] = 0;
                }
            }
        }
        return tiles;
    }
}
example();
