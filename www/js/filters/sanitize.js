(function() {
  'use strict';

  // Render raw HTML from a model
  angular.module('srdb.filters').filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
  }]);

})();
