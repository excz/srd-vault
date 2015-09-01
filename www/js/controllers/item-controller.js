(function() {
  'use strict';

  // Controller for listing data
  angular.module('srdb').controller(
    'ItemController',
    function($scope, $data, $filter) {

      // Each item should have a page.
      $scope.pushItemPage = function () {
        //TODO
        $scope.navi.pushPage(
          '.html',
          {
            title : selectedDataset.title
          }
        );
      };

      $scope.data = $filter('stringify_values')($scope.selectedDataset.raw[$scope.selectedDataset.key]);

      // Whenever search changes, re-filter our results based on it.
      $scope.$watch('search',
        function (searchTerms) {
          // Get current dataset
          var filtered = $data.selectedDataset.raw[$scope.selectedDataset.key];

          // Stringify values of each data item
          filtered = $filter('stringify_values')(filtered);

          // Filter only data items matching our search
          $scope.data = $filter('filter_by_search')(filtered, searchTerms.text, true);
        },
        true
      );

    }
  );

})();
