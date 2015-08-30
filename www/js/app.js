(function(){
  'use strict';

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

  // Allow underscorejs to be used in controllers
  module.factory('_', function() {
      return window._; // make sure _ is loaded in index.html
  });

  module.controller('AppController', function($scope, $http, $data, _) {
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
            100
          );
        }
      );
    });

  });


  module.controller('DetailController', function($scope, $data) {

    var selected = $data.selectedItem;
    $scope.item = selected;
  });


  module.controller('MasterController', function($scope, $data) {
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


  // Initial list of datasets
  module.factory('$data', function() {
      var data = {};

      data.items = [
          {
            srd: 121,
            key: 'constant',
            fileName: 'srd121_allascii_2014.json',
            title: 'Fundamental Physical Constants',
            label: 'SRD 121',
            desc: 'Short description here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            srd: 111,
            key: 'ionization energies data',
            fileName: 'srd111_NIST_Atomic_Ionization_Energies_Output.json',
            title: 'Ground Levels and Ionization Energies for Neutral Atoms',
            label: 'SRD 111',
            desc: 'Short description here. Short description here. '
          }
      ];

      return data;
  });

  // Controller for listing data
  module.controller('ItemController', function($scope, $data, $filter) {
    $scope.data = $filter('stringify_values')($data.selectedItem.dataset[$scope.item.key]);

    // Whenever search changes, re-filter our results based on it.
    $scope.$watch('search',
      function (searchTerms) {
        var filtered = $data.selectedItem.dataset[$scope.item.key];
        filtered = $filter('stringify_values')(filtered);
        $scope.data = $filter('filter_by_search')(filtered, searchTerms.text, true);
      },
      true
    );
  });

  // Customized template for each data set
  module.directive('srdItem', function() {
    // http://stackoverflow.com/questions/21835471/angular-js-directive-dynamic-templateurl
    return {
      restrict: 'AE',
      link: function(scope, element, attributes) {
        scope.getSrdTemplateUrl = function() {
          return 'srd/' + scope.item.srd + '.html';
        };
      },
      template: '<div ng-include="getSrdTemplateUrl()"></div>'
    };
  });


  module.filter('stringify_values', function ($filter){
    return function (input) {
      var result = [];
      if (Array.isArray(input)) {
        for (var i = 0; i < input.length; i++) {
          var element = input[i];
          var newElement = {};
          for (var key in element) {
            if (element.hasOwnProperty(key)) {
              var value = $filter('escapeHtml')(element[key]);

              if ('string' === typeof value) {
                newElement[key] = value;
              }
              else {
                newElement[key] = JSON.stringify(value);
              }
            }
          }
          result.push(newElement);
        }
      }

      return result;
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
              if ('string' !== typeof value) {
                value = JSON.stringify(value);
              }

              while ((match = regex.exec(value))) {
                isMatch = true;

                // Highlight the match
                newValue += value.substring(lastIndex, match.index) + '<span class="highlight">' + match[0] + '</span>';

                lastIndex = regex.lastIndex;
              }

              newItem[key] = newValue + value.substring(lastIndex);
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

  // Escape a string into raw HTML
  module.filter('escapeHtml', function () {
    //http://stackoverflow.com/a/28537958/982802
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    };

    return function(str) {
      return String(str).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
      });
    };
  });

  // Render raw HTML from a model
  module.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
  }]);

})();

