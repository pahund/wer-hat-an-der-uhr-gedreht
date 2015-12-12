import path from "path";
import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import electronPath from "electron-prebuilt";
import counterStyles from "../app/components/Counter.module.css";

describe("main window", function spec() {
    before((done) => {
        this.timeout(5000);
        this.driver = new Builder()
            .usingServer("http://localhost:9515")
            .withCapabilities({
                chromeOptions: {
                    binary: electronPath,
                    args: [ "app=" + path.resolve() ]
                }
            })
            .forBrowser("electron")
            .build();
        done();
    });

    after(async () => {
        this.timeout(10000);
        await this.driver.quit();
    });

    const findCounter = () => {
        return this.driver.findElement(By.id("counter"));
    };

    const findButtons = () => {
        return this.driver.findElements(By.className(counterStyles.btn));
    };

    it("should open window", async () => {
        const title = await this.driver.getTitle();
        expect(title).to.equal("Wer hat an der Uhr gedreht?");
    });

    it("should to Counter with click “to Counter” link", async () => {
        const link = await this.driver.findElement({ id: "nav-to-counter" });
        link.click();

        const counter = await findCounter();
        expect(await counter.getText()).to.equal("0");
    });

    it("should display updated count after increment button click", async () => {
        const buttons = await findButtons();
        buttons[0].click();

        const counter = await findCounter();
        expect(await counter.getText()).to.equal("1");
    });

    it("should display updated count after descrement button click", async () => {
        const buttons = await findButtons();
        const counter = await findCounter();

        buttons[1].click();  // -

        expect(await counter.getText()).to.equal("0");
    });

    it("shouldn't change if even and if odd button clicked", async () => {
        const buttons = await findButtons();
        const counter = await findCounter();
        buttons[2].click();  // odd

        expect(await counter.getText()).to.equal("0");
    });

    it("should change if odd and if odd button clicked", async () => {
        const buttons = await findButtons();
        const counter = await findCounter();

        buttons[0].click();  // +
        buttons[2].click();  // odd

        expect(await counter.getText()).to.equal("2");
    });

    it("should change if async button clicked and a second later", async () => {
        const buttons = await findButtons();
        const counter = await findCounter();
        buttons[3].click();  // async

        expect(await counter.getText()).to.equal("2");

        await this.driver.wait(() =>
                counter.getText().then(text => text === "3")
            , 1000, "count not as expected");
    });

    it("should back to home if back button clicked", async () => {
        const link = await this.driver.findElement({ id: "nav-to-list" });
        link.click();

        await this.driver.findElement({ id: "page-home" });
    });
});
