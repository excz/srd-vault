(function () {
  'use strict';

  // Initial list of datasets
  angular.module('srdb.filters').factory('$data', function() {
      var data = {};

      data.datasets = [
          {
            srd: 121,
            key: 'constant',
            fileName: 'srd121_allascii_2014.json',
            title: 'Fundamental Physical Constants',
            desc: 'Short description here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            srd: 111,
            key: 'ionization energies data',
            fileName: 'srd111_NIST_Atomic_Ionization_Energies_Output.json',
            title: 'Ground Levels and Ionization Energies for Neutral Atoms',
            desc: 'Short description here. Short description here. '
          }
      ];

      return data;
  });

})();
