'use strict';

angular.module('festinare_mobile')
  .controller('ApplicationCtrl', function ($scope, $ionicHistory) {

    // sideNav initialization
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.collapsible').collapsible();

    $scope.toggleSideNav = function () {
      $('.button-collapse').sideNav('show');
    };

    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
  });

