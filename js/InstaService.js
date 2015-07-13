'use strict';

angular.module('fprApp').factory('InstaService', function($http) {
    var InstaService = {
        feed: []
    };

    InstaService.getInstaFeed = function() {
        // only get if feed is empty
        if (!InstaService.feed.length) {
            return $http.jsonp('https://api.instagram.com/v1/users/8382535/media/recent/?client_id=b2df96d07b1f4851ab7ddd155d35de11', {
                params: {
                    count: 24,
                    callback: 'JSON_CALLBACK'
                }
            }).success(function(res) {
               InstaService.feed = res.data;
                console.log(InstaService.feed);
            });
        }
        return;
    }

    return InstaService;

})