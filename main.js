/* eslint strict: 0 */
"use strict";

const fs = require("fs");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

let template;
let mainWindow = null;
let currentFilePath = null;
let saveAsFlag = false;
let menu = null;

if (process.platform === "darwin") {
    template = [{
        label: "WHADUG",
        submenu: [{
            label: "About WHADUG",
            selector: "orderFrontStandardAboutPanel:"
        }, {
            type: "separator"
        }, {
            label: "Services",
            submenu: []
        }, {
            type: "separator"
        }, {
            label: "Hide WHADUG",
            accelerator: "Command+H",
            selector: "hide:"
        }, {
            label: "Hide Others",
            accelerator: "Command+Shift+H",
            selector: "hideOtherApplications:"
        }, {
            label: "Show All",
            selector: "unhideAllApplications:"
        }, {
            type: "separator"
        }, {
            label: "Quit",
            accelerator: "Command+Q",
            click() {
                app.quit();
            }
        }]
    }, {
        label: "File",
        submenu: [{
            label: "New",
            accelerator: "Command+N",
            selector: "new:",
            click: neww
        }, {
            label: "Open",
            accelerator: "Command+O",
            selector: "open:",
            click: open
        }, {
            type: "separator"
        }, {
            label: "Save",
            accelerator: "Command+S",
            selector: "save:",
            click: save
        }, {
            label: "Save As…",
            accelerator: "Shift+Command+S",
            selector: "saveAs:",
            click: saveAs
        }]
    }, {
        label: "Edit",
        submenu: [{
            label: "Undo",
            accelerator: "Command+Z",
            selector: "undo:"
        }, {
            label: "Redo",
            accelerator: "Shift+Command+Z",
            selector: "redo:"
        }, {
            type: "separator"
        }, {
            label: "Cut",
            accelerator: "Command+X",
            selector: "cut:"
        }, {
            label: "Copy",
            accelerator: "Command+C",
            selector: "copy:"
        }, {
            label: "Paste",
            accelerator: "Command+V",
            selector: "paste:"
        }, {
            label: "Select All",
            accelerator: "Command+A",
            selector: "selectAll:"
        }]
    }, {
        label: "View",
        submenu: (process.env.NODE_ENV === "development") ? [{
            label: "Reload",
            accelerator: "Command+R",
            click() {
                currentFilePath = null;
                mainWindow.restart();
            }
        }, {
            label: "Toggle Full Screen",
            accelerator: "Ctrl+Command+F",
            click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }, {
            label: "Toggle Developer Tools",
            accelerator: "Alt+Command+I",
            click() {
                mainWindow.toggleDevTools();
            }
        }] : [{
            label: "Toggle Full Screen",
            accelerator: "Ctrl+Command+F",
            click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }]
    }, {
        label: "Window",
        submenu: [{
            label: "Minimize",
            accelerator: "Command+M",
            selector: "performMiniaturize:"
        }, {
            label: "Close",
            accelerator: "Command+W",
            selector: "performClose:"
        }, {
            type: "separator"
        }, {
            label: "Bring All to Front",
            selector: "arrangeInFront:"
        }]
    }, {
        label: "Help",
        submenu: [{
            label: "Learn More",
            click() {
                shell.openExternal("http://electron.atom.io");
            }
        }, {
            label: "Documentation",
            click() {
                shell.openExternal("https://github.com/atom/electron/tree/master/docs#readme");
            }
        }, {
            label: "Community Discussions",
            click() {
                shell.openExternal("https://discuss.atom.io/c/electron");
            }
        }, {
            label: "Search Issues",
            click() {
                shell.openExternal("https://github.com/atom/electron/issues");
            }
        }]
    }];
} else {
    template = [{
        label: "&File",
        submenu: [{
            label: "&New",
            accelerator: "Ctrl+N",
            click: neww
        }, {
            label: "&Open",
            accelerator: "Ctrl+O",
            click: open
        }, {
            type: "separator"
        }, {
            label: "&Save",
            accelerator: "Ctrl+S",
            click: save
        }, {
            label: "Save &As…",
            accelerator: "Shift+Ctrl+S",
            click: saveAs
        }, {
            type: "separator"
        }, {
            label: "&Close",
            accelerator: "Ctrl+W",
            click() {
                mainWindow.close();
            }
        }, {
            label: "&Quit",
            accelerator: "Ctrl+Q",
            click() {
                app.quit();
            }
        }]
    }, {
        label: "&View",
        submenu: (process.env.NODE_ENV === "development") ? [{
            label: "&Reload",
            accelerator: "Ctrl+R",
            click() {
                mainWindow.restart();
            }
        }, {
            label: "Toggle &Full Screen",
            accelerator: "F11",
            click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }, {
            label: "Toggle &Developer Tools",
            accelerator: "Alt+Ctrl+I",
            click() {
                mainWindow.toggleDevTools();
            }
        }] : [{
            label: "Toggle &Full Screen",
            accelerator: "F11",
            click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }]
    }, {
        label: "Help",
        submenu: [{
            label: "Learn More",
            click() {
                shell.openExternal("http://electron.atom.io");
            }
        }, {
            label: "Documentation",
            click() {
                shell.openExternal("https://github.com/atom/electron/tree/master/docs#readme");
            }
        }, {
            label: "Community Discussions",
            click() {
                shell.openExternal("https://discuss.atom.io/c/electron");
            }
        }, {
            label: "Search Issues",
            click() {
                shell.openExternal("https://github.com/atom/electron/issues");
            }
        }]
    }];
}
menu = Menu.buildFromTemplate(template);


crashReporter.start({
    productName: "WHADUG",
    companyName: "Patrick Hund",
    submitURL: "http://54.249.141.255:1127/post"
});

if (process.env.NODE_ENV === "development") {
    require("electron-debug")();
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("ready", () => {
    if (process.platform === "darwin") {
        Menu.setApplicationMenu(menu);
    }
    createMainWindow();
});

function createMainWindow() {
    mainWindow = new BrowserWindow({width: 1024, height: 728});

    if (process.env.HOT) {
        mainWindow.loadURL(`file://${__dirname}/app/hot-dev-app.html`);
    } else {
        mainWindow.loadURL(`file://${__dirname}/app/app.html`);
    }

    mainWindow.on("closed", () => {
        currentFilePath = null;
        mainWindow = null;
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.openDevTools();
    }

    if (process.platform !== "darwin") {
        mainWindow.setMenu(menu);
    }

    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const timeout = 10000;
        const handle = setInterval(() => {
            if (!mainWindow.webContents.isLoading()) {
                resolve();
                clearInterval(handle);
            }
            if (startTime + timeout < Date.now()) {
                reject();
                clearInterval(handle);
            }
        }, 10);
    });
}

function open() {
    const options = {
        title: "WHADUG: Open",
        properties: [
            "openFile"
        ],
        filters: [
            { name: "WHADUG-Timesheets", extensions: ["whadug"] }
        ]
    };

    const files = dialog.showOpenDialog(options);

    if (!files) {
        return;
    }

    let data;
    try {
        data = JSON.parse(fs.readFileSync(files[0], "utf8"));
        if (!data.journal || !data.journal.filter || !data.journal.entries) {
            throw new Error("invalid file contents");
        }
    } catch (e) {
        dialog.showErrorBox("WHADUG Error", "Could not read the file you specified – are you sure it was created " +
            "with WHADUG?");
        return;
    }
    currentFilePath = files[0];
    if (!mainWindow) {
        createMainWindow().then(() => mainWindow.webContents.send("file-open", data));
        return;
    }
    mainWindow.webContents.send("file-open", data);
}

function neww() {
    if (!mainWindow) {
        createMainWindow();
        return;
    }
    mainWindow.webContents.send("file-new");
}

function save() {
    if (!mainWindow) {
        return;
    }
    mainWindow.webContents.send("file-save");
}

function saveAs() {
    if (!mainWindow) {
        return;
    }
    saveAsFlag = true;
    mainWindow.webContents.send("file-save");
}

ipcMain.on("file-save-data", (event, data) => {
    if (!currentFilePath || saveAsFlag) {
        saveAsFlag = false;
        const options = {
            title: "WHADUG: Save",
            filters: [
                { name: "WHADUG-Timesheets", extensions: ["whadug"] }
            ]
        };

        const path = dialog.showSaveDialog(options);
        if (!path) {
            return;
        }
        currentFilePath = path;
    }
    try {
        fs.writeFileSync(currentFilePath, JSON.stringify(data), "utf8");
    } catch (e) {
        dialog.showErrorBox("WHADUG Error", "Writing file failed – we apologize for the inconvenience");
    }
});
