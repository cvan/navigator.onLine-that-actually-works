(function () {

navigator.onLine = true;
var socket = new WebSocket('ws://echo.websocket.org');  // Fails in Firefox for some reason.
socket.onerror = socket.onclose = function() {
	navigator.onLine = false;
};

})();
