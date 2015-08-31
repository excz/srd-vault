(function() {
  'use strict';

  angular.module('srdb.controllers').controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;

    // Selected a data set
    $scope.showDetail = function(index) {

      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;

      //TODO use a different one for each page
      $scope.search = {text: ''};

      $scope.navi.pushPage(
        'detail.html',
        {
          title : selectedItem.title
        }
      );
    };
  });


})();
