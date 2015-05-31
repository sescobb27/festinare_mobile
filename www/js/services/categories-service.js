'use strict';

angular.module('festinare_mobile')
  .factory('CategoriesService', function () {

    var CategoriesService = this;

    CategoriesService.all = function () {
      return [
        { icon: 'ion-beer', name: 'Bar', status: false },
        { icon: 'ion-music-note', name: 'Disco', status: false },
        { icon: 'ion-icecream', name: 'Restaurant', status: false }
      ];
    };

    return CategoriesService;
  });
