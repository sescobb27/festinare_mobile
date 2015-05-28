'use strict';

angular.module('festinare_mobile')
  .controller('AuthCtrl', function($scope, AuthService) {

    $scope.credentials = {};

    $scope.login = function () {
      AuthService.login($scope.credentials).then(function () {

      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };

    $scope.register = function () {
      AuthService.register($scope.credentials).then(function () {

      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };

  });
