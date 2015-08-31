(function() {
  'use strict';

  angular.module('srdb.controllers').controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;

    // Selected a data set
    $scope.showDetail = function(index) {

      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;

      // Clear the search text
      if (!angular.equals($scope.defaultSearch, $scope.search)) {
        angular.copy($scope.defaultSearch, $scope.search);
      }

      // New page
      $scope.navi.pushPage(
        'detail.html',
        {
          title : selectedItem.title
        }
      );

    };
  });


})();
