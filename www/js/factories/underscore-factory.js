(function(){
  'use strict';

  // Allow underscorejs to be used in controllers
  angular.module('srdb.factories').factory('_', function() {
      return window._; // make sure _ is loaded in index.html
  });

})();
