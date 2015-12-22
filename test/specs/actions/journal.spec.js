/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import * as actions from "../../../app/actions/journal";

should();

describe("[actions/journal]", () => {
    describe("addEntry(“foo”)", () => {
        it("should create “addEntry” action with date “2015-12-22” and text “foo”", () => {
            actions.addEntry("2015-12-22", "foo").should.deep.equal({
                type: actions.ADD_ENTRY,
                date: "2015-12-22",
                description: "foo"
            });
        });
    });
    describe("completeEntry(1)", () => {
        it("should create “completeEntry” action with index 1", () => {
            actions.completeEntry(1).should.deep.equal({
                type: actions.COMPLETE_ENTRY,
                index: 1
            });
        });
    });
    describe("setFilter(FilterType.SHOW_ALL)", () => {
        it("should create “setFilter” action with filter SHOW_ALL", () => {
            actions.setFilter(actions.FilterType.SHOW_ALL).should.deep.equal({
                type: actions.SET_FILTER,
                filter: actions.FilterType.SHOW_ALL
            });
        });
    });
});
