(function () {
  'use strict';

  angular.module('srdb.filters').filter('stringify_values', function ($filter){
    return function (input) {
      var result = [];
      if (Array.isArray(input)) {
        for (var i = 0; i < input.length; i++) {

          var element = input[i];

          // Create a new item
          var newElement = {};

          // Fill out its contents
          for (var key in element) {
            if (element.hasOwnProperty(key)) {
              var value = element[key];

              if ('string' === typeof value) {
                newElement[key] = value;
              }
              else if (Array.isArray(value)) {
                // If the value is an array or object, then we should ignore it when displaying a lot more data
                newElement[key] = '...';
              }
              else {
                newElement[key] = JSON.stringify(value);
              }

              value = $filter('escapeHtml')(value);
            }
          }
          result.push(newElement);
        }
      }

      return result;
    };
  });

})();
