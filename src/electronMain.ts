import * as electron from 'electron';
import * as path from 'path';
import * as url from 'url';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Must keep a global reference of the window object so it won't be garbage collected.
let mainWindow: Electron.BrowserWindow;

function createWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
        webPreferences: {
            // Note: 
            // Setting nodeIntegration to true is not recommended in production -
            // https://stackoverflow.com/questions/55093700/electron-5-0-0-uncaught-referenceerror-require-is-not-defined#58350164
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        } 
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});