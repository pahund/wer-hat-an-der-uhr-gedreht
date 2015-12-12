# Wer hat an der Uhr gedreht?

Timesheet application, based on [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
by [C. T. Lin](https://github.com/chentsulin).

## Install

Install dependencies.

```bash
npm install
```

## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
npm run hot-server
npm run start-hot
```

*Note: requires a node version >= 4 and an npm version >= 2.*

### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

### Toggle Redux DevTools

- All platforms: <kbd>Ctrl+H</kbd>

*See [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more information.*

## Running Tests

### Unit Tests (Mocha)

To run the unit tests, which are based on [Mocha](https://mochajs.org/):

```bash
npm test
```

### End-to-End Tests (Selenium Webdriver)

To run the end-to-end tests, which are based on [Selenium Webdriver](https://github.com/SeleniumHQ/selenium), do a 
release build first (required every time the application has new changes that need to be tested):

```bash
npm run build
```

Then start the Selenium server using Chrome driver:

```bash
npm run test-e2e:crdv
```

While the server is running, in another terminal, start the tests:

```bash
npm run test-e2e
```

## Externals

If you use any 3rd party libraries which can't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```

You can find those lines in the file.


## CSS Modules support

Import css file as [css-modules](https://github.com/css-modules/css-modules) using `.module.css`.


## Package

```bash
npm run package
```

To package apps for all platforms:

```bash
npm run package-all
```

#### Options

- --name, -n: Application name (default: WHADUG)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them form `devDependencies` to `dependencies`.

#### Building windows apps from non-windows platforms

Please checkout [Building windows apps from non-windows platforms](https://github.com/maxogden/electron-packager#building-windows-apps-from-non-windows-platforms).

## Native-like UI

If you want to have native-like User Interface (OS X El Capitan and Windows 10), [react-desktop](https://github.com/gabrielbull/react-desktop) may perfect suit for you.

## License

MIT © [Patrick Hund](https://github.com/pahund)

### [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)

MIT © [C. T. Lin](https://github.com/chentsulin)
