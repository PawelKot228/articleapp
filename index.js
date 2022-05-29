const electron = require('electron');
const path = require('path');
const url = require('url');
const axios = require('axios')

require('electron-reloader');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainView;
let articleView;
let articleCategoryView;

// Listen for app to be ready
app.on('ready', function () {
    // Create new window
    mainView = new BrowserWindow({});
    // Load html in window
    mainView.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    mainView.on('closed', function () {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle add item window
function createArticleView() {
    articleView = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Create Article'
    });
    articleView.loadURL(url.format({
        pathname: path.join(__dirname, 'view/add_article.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Handle garbage collection
    articleView.on('close', function () {
        articleView = null;
    });
}

// Handle add item window
function createArticleCategoryView() {
    articleCategoryView = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Create Category',

    });
    articleCategoryView.loadURL(url.format({
        pathname: path.join(__dirname, 'view/add_article_category.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Handle garbage collection
    articleCategoryView.on('close', function () {
        articleCategoryView = null;
    });
}

// Catch item:add
ipcMain.on('item:add', function (e, item) {
    mainView.webContents.send('item:add', item);
    articleView.close();
    // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
    //addWindow = null;
});

// Create menu template
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Article',
                click() {
                    createArticleView();
                }
            },
            {
                label: 'Add Article Category',
                click() {
                    createArticleCategoryView();
                }
            },
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

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}


