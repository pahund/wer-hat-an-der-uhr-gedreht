/* eslint no-unused-expressions: 0 */
import path from "path";
import moment from "moment";
import { should } from "chai";
import { Builder } from "selenium-webdriver";
import electronPath from "electron-prebuilt";

should();

describe("When WHADUG has started", function spec() {
    before(async () => {
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
        this.description = await this.driver.findElement({ id: "add-entry-description" });
        this.button = await this.driver.findElement({ id: "add-entry-button" });
        this.date = await this.driver.findElement({ id: "add-entry-date" });
        this.getTableCell = async ({ row, col }) =>
            await this.driver.findElement({
                css: "#journal tbody tr:nth-child(" + row + ") td:nth-child(" + col + ")"
            });
    });
    describe("the main window's title", () => {
        before(async () => this.title = await this.driver.getTitle());
        it("should be “Wer hat an der Uhr gedreht?”", () =>
            this.title.should.equal("Wer hat an der Uhr gedreht?"));
    });
    describe("the date field in the “add entry” form", () =>
        it("should be today's date", async () =>
            (await this.date.getAttribute("value")).should.equal(moment().format("YYYY-MM-DD"))));
    describe("the description field in the “add entry” form", () =>
        it("should be empty", async () =>
            (await this.description.getAttribute("value")).should.equal("")));
    describe("the submit button in the “add entry” form", () =>
        it("should be disabled", async () => (await this.button.getAttribute("disabled")).should.be.ok));
    describe("and I type a letter into the description field", () => {
        before(() => this.description.sendKeys("f"));
        describe("the submit button in the “add entry” form", () =>
            it("should not be disabled", async () =>
                await this.driver.wait(() =>
                    this.button.getAttribute("disabled").then(disabled => !disabled),
                    1000, "“add entry” button should not be disabled")));
        describe("and I clear the date field", () => {
            before(() => this.date.sendKeys("\u0008"));
            describe("the submit button in the “add entry” form", () =>
                it("should be disabled", async () =>
                    await this.driver.wait(() =>
                        this.button.getAttribute("disabled").then(disabled => disabled),
                        1000, "“add entry” button should be disabled")));
            after(() => this.date.sendKeys(moment().format("D")));
        });
        describe("and I delete the letter with backspace", () => {
            before(() => this.description.sendKeys("\u0008"));
            describe("the submit button in the “add entry” form", () =>
                it("should be disabled", async () =>
                    await this.driver.wait(() =>
                        this.button.getAttribute("disabled").then(disabled => disabled),
                        1000, "“add entry” button should be disabled")));
        });
    });
    describe("and I type “foo” into the description field", () => {
        before(() => this.description.sendKeys("foo"));
        describe("and submit the “add entry” form", () => {
            before(() => this.button.click());
            describe("the first column in the first row of the entry list", () => {
                before(async () => this.cell = await this.getTableCell({
                    row: 1, col: 1
                }));
                it("should contain today's date", async () =>
                    (await this.cell.getText()).should.equal(moment().format("ddd D MMM")));
            });
            describe("the second column in the first row of the entry list", () => {
                before(async () => this.cell = await this.getTableCell({
                    row: 1, col: 2
                }));
                it("should contain “foo”", async () => (await this.cell.getText()).should.equal("foo"));
            });
            describe("the date field in the “add entry” form", () =>
                it("should be today's date", async () =>
                    (await this.date.getAttribute("value")).should.equal(moment().format("YYYY-MM-DD"))));
            describe("the description field in the “add entry” form", () =>
                it("should be empty", async () =>
                    (await this.description.getAttribute("value")).should.equal("")));
            describe("the submit button in the “add entry” form", () =>
                it("should be disabled", async () =>
                    (await this.button.getAttribute("disabled")).should.be.ok));
            describe("and I type 10/10/1971 into the date field", () => {
                before(() => this.date.sendKeys("10101971"));
                describe("and I type “bar” into the description field", () => {
                    before(() => this.description.sendKeys("bar"));
                    describe("and submit the “add entry” form", () => {
                        before(() => this.button.click());
                        describe("the first column in the second row of the entry list", () => {
                            before(async () => this.cell = await this.getTableCell({ row: 2, col: 1 }));
                            it("should contain “Sun 10 Oct”", async () =>
                                (await this.cell.getText())
                                    .should.equal(moment("19711010", "YYYYMMDD").format("ddd D MMM")));
                        });
                        describe("the second column in the second row of the entry list", () => {
                            before(async () => this.cell = await this.getTableCell({ row: 2, col: 2 }));
                            it("should contain “bar”", async () => (await this.cell.getText()).should.equal("bar"));
                        });
                        describe("the date field in the “add entry” form", () => {
                            it("should be set to 10/10/1971", async () =>
                                (await this.date.getAttribute("value"))
                                    .should.equal(moment("19711010", "YYYYMMDD").format("YYYY-MM-DD")));
                        });
                        describe("the description field in the “add entry” form", () =>
                            it("should be empty", async () =>
                                (await this.description.getAttribute("value")).should.equal("")));
                        describe("the submit button in the “add entry” form", () =>
                            it("should be disabled", async () =>
                                (await this.button.getAttribute("disabled")).should.be.ok));
                    });
                });
            });
        });
    });
    after(done => {
        this.timeout(10000);
        this.driver.quit().then(done);
    });
});
