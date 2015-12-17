/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import { spy } from "sinon";
import React from "react";
import {
    renderIntoDocument
} from "react-addons-test-utils";
import AddEntry from "../../../../app/components/journal/AddEntry";
import getDOMComponentsByIds from "../../../utils/getDOMComponentsByIds";

should();

function setup() {
    const actions = {
        onAddClick: spy()
    };
    const component = renderIntoDocument(
        <AddEntry {...actions} />
    );
    const { addEntryButton } = getDOMComponentsByIds(component, ["add-entry-button"]);
    return {
        component,
        actions,
        addEntryButton
    };
}

describe("[components/journal/AddEntry]", () => {
    describe("When I render the “add entry” component", () => {
        const { addEntryButton } = setup();
        describe("the “add entry” button", () => {
            it("should be disabled", () => {
                addEntryButton.disabled.should.be.ok;
            });
        });
    });
});
