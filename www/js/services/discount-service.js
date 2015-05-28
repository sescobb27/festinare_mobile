'use strict';

angular.module('festinare_mobile')
  .factory('DiscountService', function ($resource, $q, API_V1_URL) {

    var DiscountService = this;
    const DISCOUNTS_URL = API_V1_URL + '/users/:user_id/like/:client_id/discount/:discount_id'

    var Discounts = $resource(DISCOUNTS_URL, {
      user_id: '@user_id',
      client_id: '@client_id',
      discount_id: '@discount_id'
    });

    DiscountService.getDiscounts = function (user_id, client_id, discount_id) {

    };

    return DiscountService;
  });
