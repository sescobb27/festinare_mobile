'use strict';

angular.module('festinare_mobile')
  .controller('ReviewCtrl', function ($scope, $state, AuthService, ClientService) {

    AuthService.getCurrentUser().then(function (user) {
      $scope.user = user;
      $scope.getLikedClients(user);
    }).catch(function (error) {
      // TODO
      console.error(error);
      $state.go('login');
    });

    $scope.getLikedClients = function (user) {
      ClientService.getLikedClients(user).then(function (response) {
        var clients = response.clients;
        if (clients.length === 0) {
          $scope.noClients = true;
        } else {
          $scope.clients = clients;
          $scope.clients.forEach(function (client) {
            client.image_url = client.image_url || 'http://placehold.it/160x150';
          });
        }
      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };
  });
