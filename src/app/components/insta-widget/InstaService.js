angular
    .module('fprApp')
    .factory('instaService', instaService);

instaService.$inject = ['$http'];

function instaService ($http) {
    var instaUrl = 'https://api.instagram.com/v1/users/8382535/media/recent/?client_id=b2df96d07b1f4851ab7ddd155d35de11',
        instaService = {
        feed: [],
        getInstaFeed: getInstaFeed
    };

    function getInstaFeed() {
        // only get if feed is empty
        if (!instaService.feed.length) {
            return $http.jsonp(instaUrl, {
                params: {
                    count: 24,
                    callback: 'JSON_CALLBACK'
                }
            }).success(function(res) {
                instaService.feed = res.data;
            }).error(function() {
                console.log('Unable to get Instagram feed!');
            });
        }
    }

    return instaService;
};