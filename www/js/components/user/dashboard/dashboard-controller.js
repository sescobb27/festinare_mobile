'use strict';

angular.module('festinare_mobile')
  .controller('DashboardCtrl', function ($scope, DiscountService, $ionicLoading, CategoriesService) {

    const discountsLimit = 20;
    var offset = 0;

    var showLoading = function () {
      $ionicLoading.show({
        template: 'loading'
      });
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

    $scope.fetchDiscounts = function () {
      showLoading();
      offset += discountsLimit;
      DiscountService.getDiscounts(discountsLimit, offset).then(function (clients) {
        if (clients.length === 0) {
          $scope.noClients = true;
          $ionicLoading.hide();
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }

        clients.forEach(function (client) {
          client.image_url = client.image_url || 'http://placehold.it/150x150';
        });

        if ($scope.clients) {
          $scope.clients = $scope.clients.concat(clients);
        } else {
          $scope.clients = clients;
        }

        $ionicLoading.hide();
        $scope.$broadcast('scroll.infiniteScrollComplete');
        console.log($scope.clients.length);
      }).catch(function (error) {
        // TODO
        console.error(error);
        $ionicLoading.hide();
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    (function () {
      $scope.fetchDiscounts(0);
    })();
  });
