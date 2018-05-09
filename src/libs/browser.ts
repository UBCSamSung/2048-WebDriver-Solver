import 'chromedriver';
import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise } from 'selenium-webdriver';

export class Browser {
    private driver: ThenableWebDriver;

    constructor(private browserName: string) {
        this.driver = new Builder().forBrowser(browserName).build();
    }

    public async navigate(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public findElement(selector: string): WebElementPromise {
        return this.driver.findElement(By.css(selector));
    }

    public async clearCookies(url?: string): Promise<void> {
        if (url) {
            const currentUrl = await this.driver.getCurrentUrl();
            await this.navigate(url);
            await this.driver.manage().deleteAllCookies();
            await this.navigate(currentUrl);
        } else {
            await this.driver.manage().deleteAllCookies();
        }
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }
}
