"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const util_1 = require("../libs/util");
const url = "http://2048game.com";
async function example() {
    let driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        await driver.wait(selenium_webdriver_1.until.titleContains('2048'), 1000);
        await driver.wait(selenium_webdriver_1.until.elementIsVisible(driver.findElement(selenium_webdriver_1.By.className('tile-container'))));
        async function parseGrid() {
            let tiles = new Array();
            while (true) {
                for (let i = 0; i < 4; ++i) {
                    tiles[i] = new Array();
                    for (let j = 0; j < 4; ++j) {
                        let className = `tile-position-${j + 1}-${i + 1}`;
                        try {
                            let num = parseInt(await driver.findElement(selenium_webdriver_1.By.className(className)).getText());
                            if (num % 2 != 0)
                                continue;
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
        console.log(util_1.toString(await parseGrid()));
        let oldGrid = null;
        let newGrid = null;
        do {
            oldGrid = await parseGrid();
            await driver.findElement(selenium_webdriver_1.By.xpath("/html")).then(value => { value.sendKeys(selenium_webdriver_1.Key.ARROW_LEFT); });
            await driver.sleep(1 * 1000);
            console.log(util_1.toString(await parseGrid()));
            newGrid = await parseGrid();
        } while (!util_1.equals(oldGrid, newGrid));
    }
    catch (_a) {
        await driver.quit();
    }
    finally {
        await driver.quit();
    }
}
example();
