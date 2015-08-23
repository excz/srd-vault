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

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;

    $scope.srd = {
      "constant": [
        {
          "Quantity ": "{220} lattice spacing of silicon",
          "Value": "192.015 5714 e-12",
          "Uncertainty": "0.000 0032 e-12",
          "Unit": "m"
        },
        {
          "Quantity ": "alpha particle-electron mass ratio",
          "Value": "7294.299 541 36",
          "Uncertainty": "0.000 000 24",
          "Unit": ""
        },
        {
          "Quantity ": "alpha particle mass",
          "Value": "6.644 657 230 e-27",
          "Uncertainty": "0.000 000 082 e-27",
          "Unit": "kg"
        }
      ]
    };

  });

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;

    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.navi.pushPage('srd/121.html', {title : selectedItem.title});
    };
  });

  module.factory('$data', function() {
      var data = {};

      data.items = [
          {
              title: 'CODATA Fundamental Physical Constants',
              label: 'SRD 121',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
              title: 'Ground Levels and Ionization Energies for the Neutral Atoms',
              label: 'SRD 111',
              desc: 'Ut enim ad minim veniam.'
          },
          {
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          },
          {
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
      ];

      return data;
  });
})();

