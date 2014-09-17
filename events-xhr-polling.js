// credits: https://github.com/remy/polyfills/blob/master/offline-events.js

(function () {

function triggerEvent(type) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  event.eventName = type;
  (document.body || window).dispatchEvent(event);
}

function testConnection() {
  // Make sync-AJAX request.
  var xhr = new XMLHttpRequest();

  // Phone home.
  xhr.open('HEAD', '/', false);   // async=false
  try {
    xhr.send();
    onLine = true;
  } catch (e) {
    // Throws NETWORK_ERR when disconnected.
    onLine = false;
  }

  return onLine;
}

var onLine = true;
var lastOnLineStatus = true;

// Note: this doesn't allow us to define a getter in Safari.
navigator.__defineGetter__('onLine', testConnection);
testConnection();

if (onLine === false) {
  lastOnLineStatus = false;
  // Trigger offline event.
  triggerEvent('offline');
}

setInterval(function () {
  testConnection();
  if (onLine !== lastOnLineStatus) {
    triggerEvent(onLine ? 'online' : 'offline');
    lastOnLineStatus = onLine;
  }
}, 5000);  // 5 seconds, made up - can't find docs to suggest interval time

})();
