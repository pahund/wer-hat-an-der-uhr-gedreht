/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import { spy } from "sinon";
import React from "react";
import {
    renderIntoDocument,
    findAllInRenderedTree,
    isDOMComponent
} from "react-addons-test-utils";
import AddEntry from "../../../app/components/journal/AddEntry";
import configureStore from "../../../app/store/configureStore";
import { Provider } from "react-redux";

should();

function getDOMComponentsByIds(component, ids) {
    const results = {};
    findAllInRenderedTree(component, child => {
        if (!isDOMComponent(child)) {
            return;
        }
        const id = child.getAttribute("id");
        if (ids.find(element => element === id)) {
            results[toCamelCase(id)] = child;
        }
    });
    return results;
}

function toCamelCase(str) {
    return str.toLowerCase()
        .replace(/[-_]+/g, " ")
        .replace(/[^\w\s]/g, "")
        .replace(/ (.)/g, $1 => $1.toUpperCase())
        .replace(/ /g, "");
}

function setup(submitDisabled) {
    const store = configureStore();
    const actions = {
        onAddClick: spy()
    };
    const component = renderIntoDocument(
        <Provider store={store}>
            <AddEntry submitDisabled={submitDisabled} {...actions} />
        </Provider>
    );
    const { addEntryButton } = getDOMComponentsByIds(component, ["add-entry-button"]);
    return {
        component,
        actions,
        addEntryButton
    };
}

describe("[components/journal/AddEntry]", () => {
    describe("When I render the “add entry” component with prop “submit disabled” = false", () => {
        const { addEntryButton } = setup(false);
        describe("the “add entry” button", () => {
            it("should not be disabled", () => {
                addEntryButton.disabled.should.not.be.ok;
            });
        });
    });
    describe("When I render the “add entry” component with prop “submit disabled” = true", () => {
        const { addEntryButton } = setup(true);
        describe("the “add entry” button", () => {
            it("should be disabled", () => {
                addEntryButton.disabled.should.be.ok;
            });
        });
    });
});
