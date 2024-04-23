const { app, BrowserWindow } = require("electron");

var createWindow = () => {
  var win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  win.loadFile("index.html");

  //Open Inspect Element
  win.webContents.openDevTools();

  // Get the default session
    const defaultSession = session.defaultSession;

    // Set up CORS settings for the default session
    defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Access-Control-Allow-Origin': ['*'],
                'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
                'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
            }
        });
    });
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
