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
            optCategory.selected = true;
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
      var categories = $scope.categories.map(function (category) {
        if (category.selected) {
          return { name: category.name };
        }
      }).filter(function (category) {
        return category;
      });
      UserService.update($scope.user._id, {
        categories: categories
      }).then(function () {

      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };
  });
