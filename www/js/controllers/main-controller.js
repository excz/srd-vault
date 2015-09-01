(function() {
  'use strict';

  angular.module('srdb.controllers').controller('MainController', function($scope, $data) {
    $scope.datasets = $data.datasets;

    // Selected a data set
    $scope.showDetail = function(index) {

      $data.selectedDataset = $data.datasets[index];

      // Clear the search text
      if (!angular.equals($scope.defaultSearch, $scope.search)) {
        angular.copy($scope.defaultSearch, $scope.search);
      }

      // New page
      $scope.navi.pushPage(
        'views/detail.html',
        {
          title : $data.selectedDataset.title
        }
      );

    };
  });


})();
