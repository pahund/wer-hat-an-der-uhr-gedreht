import toCamelCase from "../../app/utils/toCamelCase";
import {
    findAllInRenderedTree,
    isDOMComponent
} from "react-addons-test-utils";

export default (component, ids) => {
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
};
