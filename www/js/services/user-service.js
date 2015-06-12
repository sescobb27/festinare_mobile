'use strict';

angular.module('festinare_mobile')
  .factory('UserService', function ($resource, API_V1_URL) {

    var UserService = this;
    const USERS_URL = API_V1_URL + '/users/:action/:id';
    const USERS_URL_MOBILE = API_V1_URL + '/users/:id/mobile';

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

    var Mobile = $resource(USERS_URL_MOBILE, {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    UserService.get = function () {
      return User.get({ action: 'me' }).$promise;
    };

    UserService.login = function (credentials) {
      return User.login({action: 'login'}, { user: credentials }).$promise;
    };

    UserService.update = function (id, data) {
      return User.update({ id: id }, { user: data }).$promise;
    };

    UserService.logout = function () {
      return User.save({ action: 'logout' }).$promise;
    };

    UserService.addDevice = function (id, platform, deviceToken) {
      return Mobile.update({ id: id }, {
        user: {
          mobile: {
            token: deviceToken,
            platform: platform
          }
        }
      }).$promise;
    };

    return UserService;

  });
