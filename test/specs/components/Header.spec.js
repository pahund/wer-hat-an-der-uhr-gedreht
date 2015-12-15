/* eslint no-unused-expressions: 0 */
import { should } from "chai";
import React from "react";
import { Link } from "react-router";
import {
    renderIntoDocument,
    scryRenderedComponentsWithType,
    scryRenderedDOMComponentsWithTag
} from "react-addons-test-utils";
import Header from "../../../app/components/Header";

should();

function setup(section = "home") {
    const component = renderIntoDocument(<Header section={section} />);
    return {
        component: component,
        links: scryRenderedComponentsWithType(component, Link),
        listItems: scryRenderedDOMComponentsWithTag(component, "li")
    };
}

describe("[components/Header]", () => {
    describe("When I render the header for section “home”", () => {
        const { links, listItems } = setup();
        describe("the first link on the navigation", () => {
            it("should link to route “/”", () =>
                links[0].props.to.should.equal("/"));
            it("should have id “nav-to-list”", () =>
                links[0].props.id.should.equal("nav-to-list"));
        });
        describe("the second link on the navigation", () => {
            it("should link to route “/counter”", () =>
                links[1].props.to.should.equal("/counter"));
            it("should have id “nav-to-counter”", () =>
                links[1].props.id.should.equal("nav-to-counter"));
        });
        describe("the list of navigation items", () =>
            it("should have two items", () =>
                listItems.length.should.equal(2)));
        describe("the first navigation item", () =>
            it("should have class “active”", () =>
                listItems[0].className.should.equal("active")));
        describe("the second navigation item", () =>
            it("should not have class “active”", () =>
                listItems[1].className.should.equal("")));
    });
    describe("When I render the header for section “counter”", () => {
        const { listItems } = setup("counter");
        describe("the first navigation item", () =>
            it("should not have class “active”", () =>
                listItems[0].className.should.equal("")));
        describe("the second navigation item", () =>
            it("should have class “active”", () =>
                listItems[1].className.should.equal("active")));
    });
});
