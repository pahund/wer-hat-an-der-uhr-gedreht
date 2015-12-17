import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import routes from "./routes";
import configureStore from "./store/configureStore";
import "./app.css";
import jQuery from "jquery";
import { ipcRenderer } from "electron";
import { open, neww } from "./actions/file";

const store = configureStore();

// jQuery is used by the Twitter Bootstrap JS bundle
window.jQuery = jQuery;

render(
    <Provider store={store}>
        <Router>
            {routes}
        </Router>
    </Provider>,
    document.getElementById("root")
);

ipcRenderer.on("file-open", (event, data) => store.dispatch(open(data)));
ipcRenderer.on("file-new", () => store.dispatch(neww()));
ipcRenderer.on("file-save", () => ipcRenderer.send("file-save-data", store.getState()));
