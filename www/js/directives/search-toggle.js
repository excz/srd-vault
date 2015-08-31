(function() {
  'use strict';

  // Icon button for toggling the search bar
  angular.module('srdb.directives').directive('searchToggle', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        var button = element.find('button')[0];

        // Toggle search button to reflect if bar is visible
        scope.toggleSearchButton = function (isVisible) {

          // optional, set search visibility
          if (isVisible) {
            scope.isSearchVisible = true;
          }

          if (scope.isSearchVisible) {
            button.setAttribute('class', 'button button--cta');
          }
          else {
            button.setAttribute('class', 'button button--quiet');
          }
        };

        scope.toggleSearchButton();

        // Show/hide search bar
        scope.toggleSearchBar = function () {
          scope.isSearchVisible = !scope.isSearchVisible;
          scope.toggleSearchButton();
        };
      },
      templateUrl: 'views/search-toggle.html'
    };

  });

})();
