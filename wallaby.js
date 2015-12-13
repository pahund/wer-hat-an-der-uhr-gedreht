const babel = require("babel");

module.exports = wallaby => {
    return {
        files: [
            "app/**/*.js",
            "app/**/*.css"
        ],

        tests: [
            "test/**/*.spec.js"
        ],
        env: {
            type: "node"
        },
        compilers: {
            "**/*.js": wallaby.compilers.babel({
                babel,
                stage: 0
            })
        },
        bootstrap: () => {
            const jsdom = require("jsdom");
            const hook = require("css-modules-require-hook");
            hook({
                generateScopedName: "[name]__[local]___[hash:base64:5]"
            });
            global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
            global.window = document.defaultView;
            global.navigator = global.window.navigator;
        }
    };
};
