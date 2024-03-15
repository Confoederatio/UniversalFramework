const { app, BrowserWindow } = require("electron");

var createWindow = () => {
  var win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("index.html");

  //Open Inspect Element
  win.webContents.openDevTools();
};

//Launch app when ready
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
});

//Window lifecycle defaults
app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});
