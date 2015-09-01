(function () {
  'use strict';

  // Initial list of datasets
  angular.module('srdb.filters').factory('$data', function() {
      var data = {};

      data.items = [
          {
            srd: 121,
            key: 'constant',
            fileName: 'srd121_allascii_2014.json',
            title: 'Fundamental Physical Constants',
            label: 'SRD 121',
            desc: 'Short description here. Lorem ipsum dolor sit amet',
            keywords: ['physics','fundamental','constants']
          },
          {
            srd: 111,
            key: 'ionization energies data',
            fileName: 'srd111_NIST_Atomic_Ionization_Energies_Output.json',
            title: 'Ground Levels and Ionization Energies for Neutral Atoms',
            label: 'SRD 111',
            desc: 'Short description here. Short description here. ',
            keywords: ['ion','elements','energy']
          }
      ];

      return data;
  });

})();
