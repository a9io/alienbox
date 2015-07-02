var menubar = require("menubar");
var ipc = require("ipc");

var authenticated = false;

var mb = menubar({
	dir: __dirname,
	preloadWindow: true,
  icon: "inbox.png",
	width: 300,
	height: 200
});

mb.on("show", function() {
	mb.window.webContents.send("show");
});

mb.on("hide", function() {
	mb.window.webContents.send("hide");
});

mb.on("after-create-window", function() {
	mb.window.webContents.on("will-navigate", function(e) {
		e.preventDefault();
	});
});

ipc.on("unread", function(){
  mb.tray.setImage("unread.png");
});

ipc.on("inbox", function(){
  mb.tray.setImage("inbox.png");
});

ipc.on("quit", function(){
  mb.app.quit();
});
