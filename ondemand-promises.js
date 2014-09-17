(function () {

if (!('Promise') in window) {
  console.error('Your browser does not support promises! Use this polyfill: '
    'https://github.com/jakearchibald/es6-promise');
}

navigator.__defineGetter__('onLine', function () {
  return new Promise(function (resolve, reject) {
    var i = new Image();
    i.src = '/dummy.gif?' + +new Date();
    i.onload = function () {
      resolve();
    };
    i.onerror = function () {
      reject();
    };
  });
});

})();
