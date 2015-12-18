/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import * as actions from "../../../app/actions/file";

should();

describe("[actions/file]", () => {
    describe("neww()", () => {
        it("should create “new” action", () => {
            actions.neww().should.deep.equal({
                type: actions.NEW
            });
        });
    });
    describe("open({foo:'bar'})", () => {
        it("should create “open” action with data {foo:'bar'}", () => {
            actions.open({ foo: "bar" }).should.deep.equal({
                type: actions.OPEN,
                data: {
                    foo: "bar"
                }
            });
        });
    });
});
