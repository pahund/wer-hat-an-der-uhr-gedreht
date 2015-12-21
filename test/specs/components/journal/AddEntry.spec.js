/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import { spy } from "sinon";
import React from "react";
import {
    Simulate,
    renderIntoDocument
} from "react-addons-test-utils";
import AddEntry from "../../../../app/components/journal/AddEntry";

should();

function setup() {
    const actions = {
        onAddClick: spy()
    };
    const component = renderIntoDocument(
        <AddEntry {...actions} />
    );
    return {
        component,
        actions
    };
}

describe("[components/journal/AddEntry]", () => {
    describe("When I render the “add entry” component", () => {
        const { component, actions } = setup();
        const description = component.refs.description;
        const button = component.refs.button;
        describe("and I enter some text into the text input field", () => {
            description.value = "foo";
            describe("and I hit the “enter” key", () => {
                Simulate.keyUp(description, { key: "Enter", keyCode: 13, which: 13 });
                describe("the “add click” action", () =>
                    it("is called", () => actions.onAddClick.called.should.be.ok));
                describe("the argument passed to the “add click” action", () =>
                    it("is the value entered into the text input field", () =>
                        actions.onAddClick.args[0][0].should.equal("foo")));
            });
            describe("and I click the “add” button", () => {
                Simulate.click(button);
                describe("the “add click” action", () =>
                    it("is called", () => actions.onAddClick.called.should.be.ok));
                describe("the argument passed to the “add click” action", () =>
                    it("is the value entered into the text input field", () =>
                        actions.onAddClick.args[0][0].should.equal("foo")));
            });
        });
    });
});
