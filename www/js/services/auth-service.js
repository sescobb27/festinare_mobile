'use strict';

angular.module('festinare_mobile')
  .factory('AuthService', function ($rootScope, SessionService, $resource, UserService, $q) {
    var AuthService = this;
    var user_promise = null;
    var client;
    var subscriptors = [];

    if(SessionService.getCurrentSession()) {
      user_promise = UserService.get().then(function (res) {
        console.log('CLIENT: ', res.client);
        client = res.client;
        notify(client);
      });
    } else {
      user_promise = $q(function (resolve, reject) { reject(); });
    }

    $rootScope.$on('logout', function () {
      AuthService.logout();
    });

    AuthService.login = function(credentials) {
      return UserService.login(credentials).then(function (res) {
        SessionService.addSession(res);
        user_promise = UserService.get().then(function (res) {
          client = res.client;
          notify(client);
          return client;
        });
        return user_promise;
      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };

    AuthService.register = function(credentials) {

    };

    AuthService.logout = function() {
      return UserService.logout();
    };

    // TODO
    AuthService.forgotPassword = function(email) {};
    // TODO
    AuthService.resetPassword = function(token, password) {};
    // TODO
    AuthService.updatePassword = function(oldPassword, newPassword, userId) {};

    AuthService.isLoggedIn = function () {
      return user_promise.then(function () {
        return !!client;
      }).catch(function (error) {
        // TODO
        console.error(error);
        return false
      });
    };

    AuthService.getCurrentUser = function() {
      return user_promise.then(function () {
        return client;
      });
    };

    AuthService.subscribe = function(subscriptor) {
      return subscriptors.push(subscriptor) - 1;
    };

    AuthService.unsuscribe = function(index) {
      subscriptors.splice(index, 1);
    };

    var notify = function(user) {
      angular.forEach(subscriptors, function (subscriptor) {
        subscriptor.notify(user);
      });
    };

    return AuthService;
  });
