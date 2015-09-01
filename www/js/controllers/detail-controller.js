(function () {
  'use strict';

  angular.module('srdb.controllers').controller('DetailController', function($scope, $data) {
    $scope.selectedDataset = $data.selectedDataset;
  });

})();
