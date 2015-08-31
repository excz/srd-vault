(function(){
  'use strict';

  // Escape a pattern string for constructing a regular expression
  RegExp.escape = function(s) {
    // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };


  // Initialize app
  var module = angular.module('srdb', [
    'srdb.controllers',
    'srdb.directives',
    'srdb.factories',
    'srdb.filters',

    // Onsen Framework
    'onsen'
  ]);

  // Dependencies
  angular.module('srdb.controllers', []);
  angular.module('srdb.directives', []);
  angular.module('srdb.factories', []);
  angular.module('srdb.filters', []);


})();

