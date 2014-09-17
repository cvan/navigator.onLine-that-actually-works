(function () {

navigator.__defineGetter__('onLine', function (cb) {
  var i = new Image();
  i.src = '/dummy.gif?' + +new Date();
  i.onload = function () {
    cb(null, false);  // err=null, data=true
  };
  i.onerror = function () {
    cb(null, true);  // err=null, data=true
  };
});

})();
