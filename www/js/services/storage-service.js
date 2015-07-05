'use strict';

angular.module('festinare_mobile')
  .service('StorageService', function ($cordovaFile) {

    var StorageService = this;

    // Create App Dir if not exist
    (function () {
      $cordovaFile.createDir(window.cordova.file.dataDirectory, 'codes', false).then(function (success) {
        // success
        console.log('Success Creating Codes');
      }).catch(function (error) {
        // TODO
        console.error(error);
      });
    })();

    var writeQr = function (title, data) {
      return $cordovaFile.writeFile(window.cordova.file.dataDirectory, title + '_qrcode.png', data, true);
    };

    StorageService.saveQr = function (title, data) {
      return $cordovaFile.createFile(window.cordova.file.dataDirectory, title + '_qrcode.png', true)
        .then(function (success) {
          return writeQr(title, data);
        });
    };
  });
