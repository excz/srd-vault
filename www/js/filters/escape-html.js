(function(){
  'use strict';

  // Escape a string into raw HTML
  angular.module('srdb').filter('escapeHtml', function () {
    //http://stackoverflow.com/a/28537958/982802
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    };

    return function(str) {
      return String(str).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
      });
    };
  });

})();
