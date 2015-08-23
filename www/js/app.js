(function(){
  'use strict';

  // Initialize app
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        ons.notification.alert({ message: 'tapped' });
      }, 100);
    };
  });

  module.controller('DetailController', function($scope, $http, $data) {
    var selected = $data.selectedItem;
    $scope.item = selected;

    $scope.srd = {
      "constant": [
        {
          "Quantity ": "Retrieving data ... ",
          "Value": "0.0",
          "Uncertainty": "0.0",
          "Unit": "?"
        }
      ]
    };

    var url = 'data/' + selected.url;

    // Retrieve the data
    $http.get(url).then(
      // Success
      function(response) {
        $scope.srd = response.data;
      },
      // Error
      function (response) {
        var errorMessage = 'Could not get data ' + url;
        setTimeout(
          function() {
            ons.notification.alert({
              title: 'Oops!',
              message: errorMessage
            });
          },
          100
        );

        $scope.srd = {
          "constant": [
            {
              "Quantity ": errorMessage,
              "Value": "0.0",
              "Uncertainty": "0.0",
              "Unit": "?"
            }
          ]
        };
      }
    );

  });

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;

    $scope.showDetail = function(index) {

      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;

      var templateUrl = 'srd/' + selectedItem.srd + '.html';
      $scope.navi.pushPage(
        templateUrl,
        {
          title : selectedItem.title
        }
      );

    };
  });

  module.factory('$data', function() {
      var data = {};

      data.items = [
          {
            srd: 121,
            url: 'srd121_allascii_2014.json',
            title: 'CODATA Fundamental Physical Constants',
            label: 'SRD 121',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            srd: 111,
            url: 'srd111_NIST_Atomic_Ionization_Energies_Output.json',
            title: 'Ground Levels and Ionization Energies for the Neutral Atoms',
            label: 'SRD 111',
            desc: 'Ut enim ad minim veniam.'
          }
      ];

      return data;
  });
})();

