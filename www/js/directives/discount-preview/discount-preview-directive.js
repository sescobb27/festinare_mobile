'use strict';

angular.module('festinare_mobile')
  .directive('discountPreview', function () {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/discount-preview/discount-preview.html',
      scope: {
        discount: '=',
        clientId: '='
      },
      link: function (scope, iElement, iAttrs) {

      },
      controller: function ($scope) {
        $scope.likeDiscount = function (clientId, discount) {
          console.log(clientId, discount);
        };
      }
    };
  });
