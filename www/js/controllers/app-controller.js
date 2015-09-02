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
    $scope.defaultSearch = {text: ''}; // for resetting search text when pages switch
    $scope.search = angular.copy($scope.defaultSearch);

    // Load datasets
    _.each($data.datasets, function(dataset) {

      // Retrieve from localhost
      var url = 'data/srd' + dataset.srd + '/' + dataset.fileName;
      $http.get(url).then(
        function onSuccess(response) {
          dataset.raw = response.data;
        },
        function onError(response) {
          var errorMessage = 'Could not retrieve the SRD ' + dataset.srd;
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
