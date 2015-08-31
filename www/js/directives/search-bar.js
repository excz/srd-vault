(function() {
  'use strict';

  // Wide text search bar
  angular.module('srdb.directives').directive('searchBar', function() {
    return {
      link: function(scope, element, attributes) {
        //TODO any way to clear the search text whenever page changes?
      },
      restrict: 'A',
      templateUrl: 'views/search-bar.html'
    };
  });

})();
