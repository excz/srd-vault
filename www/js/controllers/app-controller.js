(function () {
  'use strict';

  angular.module('srdb.controllers').controller('AppController', function($scope, $http, $data, _) {
    $scope.doSomething = function() {
      setTimeout(function() {
        ons.notification.alert({ message: 'tapped' });
      }, 100);
    };

    $scope.isSearchVisible = true;

    // Model for user search
    $scope.search = {text: ''};

    // Load datasets
    _.each($data.items, function(item) {

      // Retrieve the dataset
      var url = 'data/' + item.fileName;
      $http.get(url).then(
        // Success
        function(response) {
          item.dataset = response.data;
        },
        // Error
        function (response) {
          var errorMessage = 'Could not retrieve the SRD ' + item.srd;
          setTimeout(
            function() {
              ons.notification.alert({
                title: 'Oops!',
                message: errorMessage
              });
            },
            100 //ms
          );
        }
      );
    });

  });

})();
