/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import { spy } from "sinon";
import React from "react";
import {
    renderIntoDocument
} from "react-addons-test-utils";
import AddEntry from "../../../app/components/journal/AddEntry";
import configureStore from "../../../app/store/configureStore";
import { Provider } from "react-redux";

should();

function setup() {
    const store = configureStore();
    const actions = {
        onAddClick: spy()
    };
    const component = renderIntoDocument(
        <Provider store={store}>
            <AddEntry submitDisabled {...actions} />
        </Provider>
    );
    return {
        component: component,
        actions: actions
    };
}

describe("[components/journal/AddEntry]", () => {
    describe("When I render the “add entry” component", () => {
        const { component } = setup();
        describe("the component", () => {
            it("exists", () => {
                component.should.exist;
            });
        });
    });
});
