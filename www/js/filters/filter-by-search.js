(function () {
  'use strict';

  function escapeRegexPattern(str) {
    // http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  // Filter data listings by search input
  angular.module('srdb.filters').filter('filter_by_search', function () {
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
})();
