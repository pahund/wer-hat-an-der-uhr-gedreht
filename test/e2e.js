/* eslint no-unused-expressions: 0 */
import path from "path";
import { Builder } from "selenium-webdriver";
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
                    args: ["app=" + path.resolve()]
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
        return this.driver.findElement({id: "counter"});
    };

    const findButtons = () => {
        return this.driver.findElements({className: counterStyles.btn});
    };

    it("should open window", async () => {
        const title = await this.driver.getTitle();
        expect(title).to.equal("Wer hat an der Uhr gedreht?");
    });

    it("should have an empty input field", async () => {
        const input = await this.driver.findElement({id: "add-entry-input"});
        expect(await input.getAttribute("value")).to.equal("");
    });

    it("should have a disabled button", async () => {
        const button = await this.driver.findElement({id: "add-entry-button"});
        expect(await button.getAttribute("disabled")).to.be.ok;
    });

    it("should have an enabled button after I typed a letter", async () => {
        const input = await this.driver.findElement({id: "add-entry-input"});
        const button = await this.driver.findElement({id: "add-entry-button"});
        input.sendKeys("f");
        await this.driver.wait(() =>
            button.getAttribute("disabled").then(disabled => !disabled),
            1000, "“add entry” button should be disabled");
    });

    it("should have a disabled button after I've cleared the input field", async () => {
        const input = await this.driver.findElement({id: "add-entry-input"});
        const button = await this.driver.findElement({id: "add-entry-button"});
        input.sendKeys("\u0008");
        await this.driver.wait(() =>
            button.getAttribute("disabled").then(disabled => disabled),
            1000, "“add entry” button should not be disabled");
    });

    it("should add a list item when I enter text and click the “add” button", async () => {
        const input = await this.driver.findElement({id: "add-entry-input"});
        const button = await this.driver.findElement({id: "add-entry-button"});
        input.sendKeys("foo");
        button.click();
        const td = await this.driver.findElement({css: "#journal tbody tr td"});
        expect(await td.getText()).to.equal("foo");
    });

    it("should have an empty input field after I have added an element", async () => {
        const input = await this.driver.findElement({id: "add-entry-input"});
        expect(await input.getAttribute("value")).to.equal("");
    });

    it("should have a disabled button after I have added an element", async () => {
        const button = await this.driver.findElement({id: "add-entry-button"});
        expect(await button.getAttribute("disabled")).to.be.ok;
    });

    it("should add another list item when I enter text and click the “add” button", async () => {
        const input = await this.driver.findElement({id: "add-entry-input"});
        const button = await this.driver.findElement({id: "add-entry-button"});
        input.sendKeys("bar");
        button.click();
        const td = await this.driver.findElement({css: "#journal tbody tr:nth-child(2) td"});
        expect(await td.getText()).to.equal("bar");
    });

    it("should render the first list element as stricken through when I click on it", async () => {
        const tr = await this.driver.findElement({css: "#journal tbody tr"});
        tr.click();
        await this.driver.wait(() =>
            tr.getCssValue("text-decoration").then(textDecoration => textDecoration === "line-through"),
            1000, "first item should be stricken through");
    });

    it("should display only one list element when I click on the “completed” filter button",
        async () => {
            const a = await this.driver.findElement({css: "#filters li:nth-child(2) a"});
            const tbody = await this.driver.findElement({css: "#journal tbody"});
            a.click();
            await this.driver.wait(() =>
                tbody.findElements({tagName: "tr"}).then(elements => elements.length === 1),
                1000, "there should be exactly one item on the list");
        });

    it("should display a list element that is stricken-through when “completed” filter is selected", async () => {
        const tr = await this.driver.findElement({css: "#journal tbody tr"});
        expect(await tr.getCssValue("text-decoration")).to.equal("line-through");
    });

    it("should display only one list element when I click on the “active” filter button", async () => {
        const a = await this.driver.findElement({css: "#filters li:nth-child(3) a"});
        const tbody = await this.driver.findElement({css: "#journal tbody"});
        a.click();
        await this.driver.wait(() =>
            tbody.findElements({tagName: "tr"}).then(elements => elements.length === 1),
            1000, "there should be exactly one item on the list");
    });

    it("should display a list element that is not stricken-through when “active” filter is selected", async () => {
        const tr = await this.driver.findElement({css: "#journal tbody tr"});
        expect(await tr.getCssValue("text-decoration")).to.equal("none");
    });

    it("should display two list elements when I click on the “all” filter button", async () => {
        const a = await this.driver.findElement({css: "#filters li:nth-child(1) a"});
        const tbody = await this.driver.findElement({css: "#journal tbody"});
        a.click();
        await this.driver.wait(() =>
            tbody.findElements({tagName: "tr"}).then(elements => elements.length === 2),
            1000, "there should be exactly two items on the list");
    });

    it("should display a list element that is stricken-through when “all” filter is selected", async () => {
        const tr = await this.driver.findElement({css: "#journal tbody tr"});
        expect(await tr.getCssValue("text-decoration")).to.equal("line-through");
    });

    it("should display a list element that is not stricken-through when “all” filter is selected", async () => {
        const tr = await this.driver.findElement({css: "#journal tbody tr:nth-child(2)"});
        expect(await tr.getCssValue("text-decoration")).to.equal("none");
    });

    it("should go to Counter with click “to Counter” link", async () => {
        const link = await this.driver.findElement({id: "nav-to-counter"});
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
        const link = await this.driver.findElement({id: "nav-to-list"});
        link.click();

        await this.driver.findElement({id: "page-home"});
    });
});
