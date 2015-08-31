(function() {
  'use strict';


  // Customized template for each data set
  angular.module('srdb.directives').directive('srdItem', function() {
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

})();
