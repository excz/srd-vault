(function () {
  'use strict';

  angular.module('srdb.filters').filter('stringify_values', function ($filter){
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

})();
