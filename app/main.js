const logger = require('winston');
logger.add(logger.transports.File, { filename: "app.log" });

global.logger = logger;

const electron = require('electron');
// Module to control application life.
const app = electron.app;

app.setAppUserModelId("tb.demo.electron");

//https://medium.com/@svilen/auto-updating-apps-for-windows-and-osx-using-electron-the-complete-guide-4aa7a50b904c#.wpoukxnlq
if (require('electron-squirrel-startup')) {
  logger.info("electron-squirrel-startup. return");
  return;
}

//https://github.com/electron/windows-installer#handling-squirrel-events
// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  logger.info("handleSquirrelEvent. return");
  return;
}
else {
  logger.info("no handleSquirrelEvent. continue");
}


const appVersion = app.getVersion();
const os = require('os');

logger.info("appVersion", appVersion);
logger.info("os", os.platform(), os.arch(), os.release(), os.type(), os.arch());


/*

const autoUpdater = require('autoUpdater');

var feedUrl = 'http://localhost:6001/?version=' + app.getVersion();
autoUpdater.setFeedURL("http://localhost:6001/");

autoUpdater.on('error', function(err) {  
  logger.info("error", err);
});

autoUpdater.on('checking-for-update', function() {  
    logger.info("autoupdater" , "checking-for-update")
});

autoUpdater.on('update-available', function() {
  logger.info("autoupdater" , "update-available")  
});

autoUpdater.on('update-not-available', function() {
  logger.info("autoupdater" , "update-not-available")  
});

autoUpdater.on('update-downloaded', function(x) {
  logger.info("autoupdater" , "update-downloaded")  
});

logger.info("autoUpdater", "checkForUpdates")
autoUpdater.checkForUpdates()
*/

const GhReleases = require('electron-gh-releases')

let options = {
  repo: 'tboeker/tbelectrondemo',
  currentVersion: app.getVersion()
}

const updater = new GhReleases(options)


// Check for updates
// `status` returns true if there is a new update available
updater.check((err, status) => {

  logger.info("updater", status);

  if (!err && status) {


    logger.info("updater", "updater.check. start download");

    // Download the update
    updater.download()    
  }
})

// When an update has been downloaded
updater.on('update-downloaded', (info) => {

  logger.info('updater-downloaded. start install')

  // Restart the app and install the update
  updater.install()
})


logger.info('start autoUpdater. currentVersion:' + app.getVersion())
 // Access electrons autoUpdater
 updater.autoUpdater


// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    logger.info(process.argv);
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) {
      logger.log('eror', error);
    }
    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};