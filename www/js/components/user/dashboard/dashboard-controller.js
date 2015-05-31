'use strict';

angular.module('festinare_mobile')
  .controller('DashboardCtrl', function ($scope, DiscountService, $ionicLoading, CategoriesService) {

    $ionicLoading.show({
      template: 'loading'
    });

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

    DiscountService.getDiscounts().then(function (clients) {
      $scope.clients = clients;
      $scope.clients.forEach(function (client) {
        client.image_url = client.image_url || 'http://placehold.it/150x150';
      });
      $ionicLoading.hide();
    }).catch(function (error) {
      // TODO
      console.error(error);
    });
  });
