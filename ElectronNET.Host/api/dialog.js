"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
module.exports = function (socket) {
    socket.on('showMessageBox', function (browserWindow, options, guid) {
        if ("id" in browserWindow) {
            var window = electron_1.BrowserWindow.fromId(browserWindow.id);
            electron_1.dialog.showMessageBox(window, options, function (response, checkboxChecked) {
                global.elesocket.emit('showMessageBoxComplete' + guid, [response, checkboxChecked]);
            });
        }
        else {
            var message = browserWindow;
            var id_1 = guid || options;
            electron_1.dialog.showMessageBox(browserWindow, function (response, checkboxChecked) {
                global.elesocket.emit('showMessageBoxComplete' + id_1, [response, checkboxChecked]);
            });
        }
    });
    socket.on('showOpenDialog', function (browserWindow, options, guid) {
        var window = electron_1.BrowserWindow.fromId(browserWindow.id);
        electron_1.dialog.showOpenDialog(window, options, function (filePaths) {
            filePaths = filePaths || [];
            var encodeFilePaths = [];
            filePaths.forEach((item, index) => {
                encodeFilePaths.push(encodeURIComponent(item));
            });
            global.elesocket.emit('showOpenDialogComplete' + guid, encodeFilePaths);
        });
    });
    socket.on('showSaveDialog', function (browserWindow, options, guid) {
        var window = electron_1.BrowserWindow.fromId(browserWindow.id);
        electron_1.dialog.showSaveDialog(window, options, function (filename) {
            filename = encodeURIComponent(filename || '');
            global.elesocket.emit('showSaveDialogComplete' + guid, filename);
        });
    });
    socket.on('showErrorBox', function (title, content) {
        electron_1.dialog.showErrorBox(title, content);
    });
    socket.on('showCertificateTrustDialog', function (browserWindow, options, guid) {
        var window = electron_1.BrowserWindow.fromId(browserWindow.id);
        electron_1.dialog.showCertificateTrustDialog(window, options, function () {
            global.elesocket.emit('showCertificateTrustDialogComplete' + guid);
        });
    });
};
//# sourceMappingURL=dialog.js.map