'use strict';

// GO visit this url https://github.com/hollyschinsky/PushNotificationSample
angular.module('festinare_mobile')
  .service('DeviceService', function ($cordovaPush, $cordovaMedia, UserService, AuthService) {

    var DeviceService = this;

    var deviceUser;
    AuthService.getCurrentUser().then(function (user) {
      deviceUser = user;
    }).catch(function (error) {
      // TODO
      console.error(error);
    });

    var register = function (platform, deviceToken) {
      if (!deviceUser) {
        return;
      }
      UserService.addDevice(deviceUser._id, platform, deviceToken).then(function () {

      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    };

    DeviceService.registeredOnAndroid = function (deviceToken) {
      register('android', deviceToken);
    };

    DeviceService.registeredOnIOs = function (deviceToken) {
      register('ios', deviceToken);
    };

    DeviceService.handleAndroidNotification = function (notification) {
      // ** NOTE: ** You could add code for when app is in foreground or not,
      //             or coming from coldstart here too via the console fields as shown.
      // notification.foreground
      // notification.coldstart
      if (notification.event === 'registered') {
        this.registeredOnAndroid(notification.regid);
      } else if (notification.event === 'message') {
        // TODO
        // $cordovaDialogs.alert(notification.message, "Push Notification Received");
        console.error('TODO');
      } else if (notification.event === 'error') {
        // TODO
        // $cordovaDialogs.alert(notification.msg, "Push notification error event");
        console.error(notification);
      } else {
        // TODO
        // Push notification handler - Unprocessed Event
        console.error(notification);
      }
    };

    DeviceService.handleIOSNotification = function (notification) {
      // ** NOTE: ** You could add code for when app is in foreground or not,
      //             or coming from coldstart here too via the console fields as shown.
      // notification.foreground
      // notification.coldstart
      if (notification.foreground === '1') {
        console.error('TODO');
      }
      if (notification.alert) {
        navigator.notification.alert(notification.alert);
      }

      if (notification.sound) {
        var sound = $cordovaMedia.newMedia(notification.sound);
        sound.promise.then($cordovaMedia.play(sound.media));
      }

      if (notification.badge) {
        $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
          // Success!
        }, function(error) {
          // TODO
          console.error(error);
        });
      }
    };

  });
