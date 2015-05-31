'use strict';

angular.module('festinare_mobile')
  .controller('PreferencesCtrl', function ($scope, CategoriesService, AuthService, UserService) {

    $scope.user = {};

    $scope.categories = CategoriesService.all();

    var selectCategories = function (categories) {
      if (categories.length === 0) { return; }
      categories.forEach(function (category) {
        $scope.categories.forEach(function (optCategory) {
          if (optCategory.name === category.name) {
            optCategory.status = true;
          }
        });
      });
    };

    AuthService.getCurrentUser().then(function (user) {
      $scope.user = user;
      selectCategories(user.categories);
    }).catch(function (error) {
      // TODO
      console.error(error);
    });

    $scope.setupCategories = function () {
      UserService.update($scope.user._id, {
        categories: $scope.categories
      }).then(function () {

      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };
  });
