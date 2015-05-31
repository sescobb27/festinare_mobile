'use strict';

angular.module('festinare_mobile')
  .factory('DiscountService', function ($resource, $q, API_V1_URL) {

    var DiscountService = this;
    // const DISCOUNTS_URL = API_V1_URL + '/users/:user_id/like/:client_id/discount/:discount_id';
    const DISCOUNTS_URL = API_V1_URL + '/discounts';

    // var Discounts = $resource(DISCOUNTS_URL, {
    //   user_id: '@user_id',
    //   client_id: '@client_id',
    //   discount_id: '@discount_id'
    // });

    var Discounts = $resource(DISCOUNTS_URL, {}, {});

    DiscountService.getDiscounts = function () {
      var deferred = $q.defer();
      Discounts.get().$promise.then(function (clients) {
        // client.discounts => array of clients, FIX
        deferred.resolve(clients.discounts);
      }).catch(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    return DiscountService;
  });
