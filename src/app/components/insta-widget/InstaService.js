angular
    .module('fprApp')
    .factory('instaService', instaService);

instaService.$inject = ['$http'];

function instaService ($http) {
    var instaUrl = 'https://api.instagram.com/v1/users/8382535/media/recent/?client_id=b2df96d07b1f4851ab7ddd155d35de11',
        factory = {
        feed: [],
        getInstaFeed: getInstaFeed
    };

    function getInstaFeed() {
        return $http.jsonp(instaUrl, {
            params: {
                count: 24,
                callback: 'JSON_CALLBACK'
            }
        }).success(function(res) {
            factory.feed = res.data;
        }).error(function() {
            console.log('Unable to get Instagram feed!');
        });
    }

    return factory;
}
