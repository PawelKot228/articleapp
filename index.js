const electron = require('electron');
const path = require('path');
const url = require('url');
const axios = require('axios')


// SET ENV
process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainView;
let articleView;
let articleCategoryView;

// Fire up the app when it's ready
app.on('ready', function () {
    // Create window
    mainView = new BrowserWindow({
        title: 'Articles'
    });

    // Load app
    mainView.loadURL(url.format({
        pathname: path.join(__dirname, 'view/main.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainView.on('closed', function () {
        app.quit();
    });


    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

    // Add developer tools option if in dev
    if (process.env.NODE_ENV !== 'production') {
        mainView.webContents.openDevTools();
    }
});



// Menu array
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If OSX, add empty object to menu
if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({});
}


