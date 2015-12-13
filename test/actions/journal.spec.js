/* eslint no-unused-expressions: 0 */
import { expect } from "chai";
import * as actions from "../../app/actions/journal";

describe("[actions/journal]", () => {
    describe("addEntry(“foo”)", () => {
        it("should create “addEntry” action with text “foo”", () => {
            expect(actions.addEntry("foo")).to.deep.equal({
                type: actions.ADD_ENTRY,
                text: "foo"
            });
        });
    });
    describe("completeEntry(1)", () => {
        it("should create “completeEntry” action with index 1", () => {
            expect(actions.completeEntry(1)).to.deep.equal({
                type: actions.COMPLETE_ENTRY,
                index: 1
            });
        });
    });
    describe("setFilter(FilterType.SHOW_ALL)", () => {
        it("should create “setFilter” action with filter SHOW_ALL", () => {
            expect(actions.setFilter(actions.FilterType.SHOW_ALL)).to.deep.equal({
                type: actions.SET_FILTER,
                filter: actions.FilterType.SHOW_ALL
            });
        });
    });
    describe("textfieldEmpty()", () => {
        it("should create “textfieldEmpty” action", () => {
            expect(actions.textfieldEmpty()).to.deep.equal({
                type: actions.TEXTFIELD_EMPTY
            });
        });
    });
    describe("textfieldFilled()", () => {
        it("should create “textfieldFilled” action", () => {
            expect(actions.textfieldFilled()).to.deep.equal({
                type: actions.TEXTFIELD_FILLED
            });
        });
    });
});
