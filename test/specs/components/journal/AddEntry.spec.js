/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import { spy } from "sinon";
import React from "react";
import {
    renderIntoDocument
} from "react-addons-test-utils";
import AddEntry from "../../../../app/components/journal/AddEntry";
import configureStore from "../../../../app/store/configureStore";
import { Provider } from "react-redux";
import getDOMComponentsByIds from "../../../utils/getDOMComponentsByIds";

should();

function setup(submitDisabled = true) {
    const store = configureStore({
        journal: {
            submitDisabled
        }
    });
    const actions = {
        onAddClick: spy()
    };
    const component = renderIntoDocument(
        <Provider store={store}>
            <AddEntry {...actions} />
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
