'use strict';

angular.module('festinare_mobile')
  .factory('ClientService', function ($resource, API_V1_URL) {
    var ClientService = this;
    const LIKED_CLIENTS = API_V1_URL + '/clients/users/:id';
    const REVIEW_CLIENT = API_V1_URL + '/clients/:client_id/users/:id/review';

    var LikedClients = $resource(LIKED_CLIENTS, {
      id: '@id'
    }, {});

    var ReviewClient = $resource(REVIEW_CLIENT, {
      client_id: '@client_id',
      id: '@id'
    }, {});

    ClientService.getLikedClients = function (user) {
      return LikedClients.get({ id: user._id }).$promise;
    };

    ClientService.giveFeedbackToClient = function (user, client, data) {
      return ReviewClient.save({
        id: user._id,
        client_id: client._id,
        user: {
          rate: data.rate,
          feedback: data.feedback
        }
      }).$promise;
    };

    return ClientService;
  });
