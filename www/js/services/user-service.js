'use strict';

angular.module('festinare_mobile')
  .factory('UserService', function ($resource, API_V1_URL) {

    const USERS_URL = API_V1_URL + '/users/:action/:id';
    var User = $resource(USERS_URL, {
      action: '@action',
      id: '@id'
    }, {
      login: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });

    UserService.get = function () {
      return User.get({action: 'me'}).$promise;
    };

    UserService.login = function (credentials) {
      return User.login({action: 'login'}, {client: credentials}).$promise;
    };

    UserService.update = function (id, data) {
      return User.update({ id: id }, {client: data}).$promise;
    };

    UserService.logout = function () {
      return User.save({action: 'logout'}).$promise;
    };

    return UserService;

  });
