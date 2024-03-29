'use strict';

angular.module('festinare_mobile')
  .directive('clientPreview', function () {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/client-preview/client-preview.html',
      scope: {
        client: '='
      },
      controller: function ($scope, AuthService, ClientService) {
        AuthService.getCurrentUser().then(function (user) {
          $scope.user = user;
        }).catch(function (error) {
          // TODO
          console.error(error);
        });

        $scope.sendFeedback = function () {
          ClientService.giveFeedbackToClient($scope.user, $scope.client, $scope.review).then(function () {
            console.log('succes');
          }).catch(function (error) {
            // TODO
            // if error.status === 403 (forbidden) hasn't liked that that client
            // if error.status === 405 (method not allowed) user already review that client
            console.error(error);
          });
        };
      }
    };
  });
