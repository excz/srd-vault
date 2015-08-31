(function() {
  'use strict';

  // Controller for listing data
  angular.module('srdb').controller(
    'ItemController',
    function($scope, $data, $filter) {
      $scope.data = $filter('stringify_values')($data.selectedItem.dataset[$scope.item.key]);

      // Whenever search changes, re-filter our results based on it.
      $scope.$watch('search',
        function (searchTerms) {
          var filtered = $data.selectedItem.dataset[$scope.item.key];
          filtered = $filter('stringify_values')(filtered);
          $scope.data = $filter('filter_by_search')(filtered, searchTerms.text, true);
        },
        true
      );
    }
  );

})();
