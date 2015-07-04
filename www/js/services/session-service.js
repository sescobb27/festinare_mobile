'use strict';

angular.module('festinare_mobile')
  .service('SessionService', function ($window) {

    var SessionService = this;

    SessionService.addSession = function(data) {
      $window.localStorage.setItem('festinare_session', data);
    };

    SessionService.removeCurrentSession = function() {
      $window.localStorage.removeItem('festinare_session');
    };

    SessionService.getCurrentSession = function() {
      return $window.localStorage.getItem('festinare_session');
    };
  });
