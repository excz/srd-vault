(function(){
  'use strict';

  //TODO there's a bug in here, search '192' in SRD 121, it matches something random
  // Escape a pattern string for constructing a regular expression
  RegExp.escape= function(s) {
    // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  function escapeRegexPattern(str) {
    // http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

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

    // Retrieve the dataset
    var url = 'data/' + selected.url;
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

      $scope.navi.pushPage(
        'detail.html',
        {
          title : selectedItem.title
        }
      );

    };
  });


  // Initial list of datasets
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

  // Customized template for each data set
  module.directive('srdItem', function() {
    // http://stackoverflow.com/questions/21835471/angular-js-directive-dynamic-templateurl
    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        scope.getSrdTemplateUrl = function() {
          return 'srd/' + scope.item.srd + '.html';
        }
      },
      template: '<div ng-include="getSrdTemplateUrl()"></div>'
    };
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
        var regex = new RegExp(escapeRegexPattern(searchValue), flags);

        // Iterate through input and filter based on search
        for (var i = 0; i < input.length; i++) {

          var item = input[i];
          var newItem = {};



          // See if current item has a match
          var isMatch = false;
          for (var key in item) {
            if (item.hasOwnProperty(key)) {
              var value = item[key];
              var newValue = '';
              var lastIndex = 0;

              // Note there might be multiple matches
              var match = null;
              if ('string' === typeof value) {
                while ((match = regex.exec(value))) {
                  isMatch = true;

                  // Highlight the match
                  newValue += value.substring(lastIndex, match.index) + '<span class="highlight">' + match[0] + '</span>';

                  lastIndex = regex.lastIndex;
                }

                newItem[key] = newValue + value.substring(lastIndex);
              }
              else {
                newItem[key] = value;
              }
            }
          }

          if (isMatch) {
            result.push(newItem);
          }
        }
      }

      return result;
    };
  });

  // Render raw HTML from a model
  module.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    }
  }]);


})();

