'use strict';

angular.module('festinare_mobile', ['ionic', 'ngResource', 'ionic.rating'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    // TODO
    // ALPHA PHASE
    // $ionicAppProvider.identify({
    //   // The App ID (from apps.ionic.io) for the server
    //   app_id: 'f4623b2d',
    //   // The public API key all services will use for this app
    //   api_key: 'f9b768bc90c3b8d4927824d0d190b3ec42362343e722eff5',
    //   // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
    //   gcm_id: '516765447023'
    // });

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'js/components/auth/login.html',
        controller: 'AuthCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'js/components/auth/register.html',
        controller: 'AuthCtrl'
      })
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'js/components/user/preferences/preferences.html',
        controller: 'PreferencesCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/components/user/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .factory('AuthInterceptor', function ($rootScope, $q, SessionService, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if (SessionService.getCurrentSession()) {
          config.headers.Authorization = 'Bearer ' + SessionService.getCurrentSession();
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any state tokens
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });

    // TODO
    // ALPHA PHASE
    // GCM push registrations
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      console.log('Got token', data.token, data.platform);
      // Do something with the token
    });
  });
