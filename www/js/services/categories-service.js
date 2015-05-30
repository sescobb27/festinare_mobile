'use strict';

angular.module('festinare_mobile')
  .factory('CategoriesService', function () {

    var CategoriesService = this;

    CategoriesService.all = function () {
      return [
        { icon: 'ion-beer', name: 'Bar', selected: false },
        { icon: 'ion-music-note', name: 'Disco', selected: false },
        { icon: 'ion-icecream', name: 'Restaurant', selected: false }
      ];
    };

    return CategoriesService;
  });
