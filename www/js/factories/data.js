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
            description: 'Short description here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            srd: 111,
            key: 'ionization energies data',
            fileName: 'srd111_NIST_Atomic_Ionization_Energies_Output.json',
            title: 'Ground Levels and Ionization Energies for Neutral Atoms',
            description: 'Short description here. Short description here. '
          },
          {
            srd: 144,
            key: 'data',
            fileName: 'srd144_Atomic_Weights_and_Isotopic_Compositions_for_All_Elements.json',
            title: 'Atomic Weights and Isotopic Compositions',
            description: 'FILL THIS OUT FOOL'
          }
      ];

      return data;
  });

})();
