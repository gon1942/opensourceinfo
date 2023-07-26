const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 620,
    height: 360,
    minWidth: 600,
    minHeight: 371,
    frame: false,
    show: false,

    webPreferences: {
      defaultEncoding: "utf8",
      defaultFontFamily: "cursive",
      focusable: true,
      webviewTag: true,
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html");
  mainWindow.setMenu(null);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", () => {
  setTimeout(createWindow, 500);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
