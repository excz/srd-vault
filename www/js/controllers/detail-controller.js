(function () {
  'use strict';

  angular.module('srdb.controllers').controller('DetailController', function($scope, $data) {

    var selected = $data.selectedItem;
    $scope.item = selected;
  });

})();
