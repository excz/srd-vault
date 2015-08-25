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

    $scope.isSearchVisible = true;

    // Model for user search
    $scope.search = {};
    $scope.search.text = '';
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

    // Selected a data set
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
            title: 'Fundamental Physical Constants',
            label: 'SRD 121',
            desc: 'Short description here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            srd: 111,
            url: 'srd111_NIST_Atomic_Ionization_Energies_Output.json',
            title: 'Ground Levels and Ionization Energies for Neutral Atoms',
            label: 'SRD 111',
            desc: 'Short description here. Short description here. '
          }
      ];

      return data;
  });

  // Filter data listings by search input
  module.filter('filter_by_search', function () {
    return function (input, searchValue, ignoreCase) {

      var result = [];

      if ('string' !== typeof searchValue || '' === searchValue) {
        result = input;
      }
      else {

        // create regular expression
        var flags = 'g';
        if (ignoreCase) {
          flags += 'i';
        }
        var regex = new RegExp(searchValue, flags);

        // Iterate through input and filter based on search
        for (var i = 0; i < input.length; i++) {

          var item = input[i];
          var isMatch = false;

          for (var key in item) {
            if (item.hasOwnProperty(key)) {
              var value = item[key];

              // Find 1-N matches for the search string
              var match = null;
              if ('string' === typeof value) {
                while ((match = regex.exec(value))) {
                  isMatch = true;
                  console.log( JSON.stringify(match) + '    ' + value );
                }
              }
            }
          }

          if (isMatch) {
            result.push(item);
          }
        }
      }

      return result;
    };
  });

})();

