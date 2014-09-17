// credits: https://github.com/mozilla/fireplace/blob/d3d572935f77f7c5a2556c37c3ba72b0e8f51cf0/src/media/js/utils_local.js#L42-L124

function triggerEvent(type) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  event.eventName = type;
  (document.body || window).dispatchEvent(event);
}

function offline(socket) {
  if (navigator.onLine) {
    // Fire event for going offline.
    triggerEvent('offline');
    navigator.onLine = false;
  }
  if (socket) {
    reset_socket(socket);
  }
  return navigator.onLine;
}

function online(socket) {
  if (!navigator.onLine) {
    // Fire event for going online.
    triggerEvent('online');
    navigator.onLine = true;
  }
  if (socket) {
    reset_socket(socket);
  }
  return navigator.onLine;
}

function reset_socket(socket) {
  socket.onopen = null;
  socket.onerror = null;
  socket.close();
}

navigator.__defineGetter__('onLine', checkOnline);

function checkOnline() {
  return new Promise(function (resolve, reject) {
    // Using TCPSocket, available on only Firefox OS for privileged, packaged web apps.
    // See https://developer.mozilla.org/en-US/docs/Web/API/TCPSocket
    // Be sure to add `{"permissions": {"tcp-socket"}}` to your app's manifest.
    if (navigator.mozTCPSocket === null) {
      return checkOnlineDesktop();
    }

    try {
      var host = window.location.host;
      var port = 80;
      var socket = navigator.mozTCPSocket.open(host, port);
      socket.onerror = function (e) {
        reject(offline(socket));
      };
      socket.onopen = function (e) {
        resolve(socket));
      };
    } catch (e) {
      return checkOnlineDesktop();
    }
  });
}

function checkOnlineDesktop() {
  return new Promise(function (resolve, reject) {
    var i = new Image();
    i.src = 'dummy.gif?' + (+new Date());
    i.onload = function () {
      resolve();
    };
    i.onerror = function () {
      reject();
    };
  });
}

function pollOnlineState() {
  if (check_interval) {
    clearInterval(check_interval);
  }
  check_interval = setInterval(checkOnline, 10000);
}
