/* eslint no-unused-expressions: 0 */
import toCamelCase from "../../../app/utils/toCamelCase";
import { should } from "chai";

should();

const testCases = [
    { input: "foo", expected: "foo" },
    { input: "foo-bar", expected: "fooBar" },
    { input: "foo-", expected: "foo" },
    { input: "Foo", expected: "foo" },
    { input: "foo bar", expected: "fooBar" },
    { input: "fooBar", expected: "fooBar" },
    { input: "foo1", expected: "foo1" },
    { input: "foo-1", expected: "foo1" },
    { input: "fooBar1", expected: "fooBar1" },
    { input: "fooBar-1", expected: "fooBar1" },
    { input: "foo     bar", expected: "fooBar"}
];

describe("[utils/toCamelCase]", () =>
    testCases.forEach(testCase =>
        describe("When I call toCamelCase with input “" + testCase.input + "”", () =>
            describe("the result", () =>
                it("is “" + testCase.expected + "”", () =>
                    toCamelCase(testCase.input).should.equal(testCase.expected))))));
