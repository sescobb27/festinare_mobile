'use strict';

angular.module('festinare_mobile')
  .factory('DiscountService', function ($resource, $q, API_V1_URL) {

    var DiscountService = this;
    const LIKE_DISCOUNT_URL = API_V1_URL + '/users/:user_id/like/:client_id/discount/:discount_id';
    const DISCOUNTS_URL = API_V1_URL + '/discounts';

    var LikeDiscount = $resource(LIKE_DISCOUNT_URL, {
      user_id: '@user_id',
      client_id: '@client_id',
      discount_id: '@discount_id'
    });

    var Discounts = $resource(DISCOUNTS_URL, {}, {});

    DiscountService.getDiscounts = function (limit, offset) {
      var deferred = $q.defer();
      Discounts.get({
        limit: limit,
        offset: offset
      }).$promise.then(function (clients) {
        // client.discounts => array of clients, FIX
        deferred.resolve(clients.discounts);
      }).catch(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    DiscountService.likeDiscount = function (user, client, discount) {
      return LikeDiscount.save({
        user_id: user._id,
        client_id: client._id,
        discount_id: discount._id
      }).$promise;
    };

    return DiscountService;
  });
