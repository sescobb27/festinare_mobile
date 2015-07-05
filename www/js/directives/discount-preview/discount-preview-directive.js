'use strict';

angular.module('festinare_mobile')
  .directive('discountPreview', function () {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/discount-preview/discount-preview.html',
      scope: {
        discount: '=',
        client: '='
      },
      controller: function ($scope, DiscountService, AuthService, StorageService) {
        AuthService.getCurrentUser().then(function (user) {
          $scope.user = user;
        });

        $scope.likeDiscount = function () {
          DiscountService.likeDiscount($scope.user, $scope.client, $scope.discount).then(function (response) {
            // console.log(response);
            return StorageService.saveQr($scope.discount.title, response).then(function () {
              $scope.discount.liked = true;
            });
          }).catch(function (error) {
            // TODO
            console.error(error);
          });
        };
      }
    };
  });
