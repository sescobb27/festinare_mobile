'use strict';

angular.module('festinare_mobile')
  .controller('DashboardCtrl', function ($scope, DiscountService, $ionicLoading, CategoriesService) {

    const discountsLimit = 20;
    var offset = 0;

    var showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
    };

    var formatDiscountUntilDate = function (discount) {
      var tmp = new Date(discount.created_at);
      return new Date(tmp.getTime() + (discount.duration * 60000));
    };

    $scope.hashtags = function (hashtags) {
      return hashtags ? hashtags.join(' ') : '';
    };

    var categories = CategoriesService.all();

    $scope.getCategoryIcon = function (category) {
      var icon = '';
      categories.forEach(function (optCategory) {
        if (optCategory.name === category.name) {
          icon = optCategory.icon;
        }
      });
      return icon;
    };

    var endIonicEvents = function () {
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.fetchDiscounts = function (operation) {
      showLoading();
      offset += discountsLimit;
      DiscountService.getDiscounts(discountsLimit, offset).then(function (clients) {
        if (clients.length === 0) {
          $scope.noClients = true;
          $ionicLoading.hide();
          endIonicEvents();
          return;
        }

        clients.forEach(function (client) {
          client.image_url = client.image_url || 'http://placehold.it/160x150';
          angular.forEach(client.discounts, function (discount) {
            discount.until_date = formatDiscountUntilDate(discount);
          });
        });

        if ($scope.clients && operation === 'prepend') {
          $scope.clients = clients.concat($scope.clients);
        } else if ($scope.clients) {
          $scope.clients = $scope.clients.concat(clients);
        } else {
          $scope.clients = clients;
        }

        $ionicLoading.hide();
        endIonicEvents();
        console.log($scope.clients.length);
      }).catch(function (error) {
        // TODO
        console.error(error);
        $scope.noClients = true;
        $ionicLoading.hide();
        endIonicEvents();
      });
    };

    (function () {
      $scope.fetchDiscounts(0);
    })();
  });
