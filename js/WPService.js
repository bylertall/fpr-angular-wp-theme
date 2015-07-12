'use strict';

angular.module('fprApp').factory('WPService', function ($http) {
    var WPService = {
        feed: [],
        post: [],
        categories: [],
        currentPage: 1,
        totalPages: 1
    };

    WPService.getAllPosts = function() {
        // only get if feed is empty
        if (!WPService.feed.length) {
            return $http.get(WPAPI.api_url + '/posts')
                .success(function(res) {
                    WPService.feed = res;
            });
        }
        return;
    };

    WPService.singlePost = function(slug) {
        var postArrayLength = WPService.feed.length,
            i;

        if (!postArrayLength) {
            return $http.get(WPAPI.api_url + '/posts/?filter[name]=' + slug)
                .success(function(res) {
                    // filter returns an array of posts, only 1 should return
                    WPService.post = res[0];
                });
        }

        for (i = 0; i < postArrayLength; i++) {
            if (WPService.feed[i].slug === slug) {
                WPService.post = WPService.feed[i];
            }
        }
    };

    WPService.getAllCategories = function() {
        if (WPService.categories.length) {
            return;
        }

        return $http.get(WPAPI.api_url + '/taxonomies/categories/terms')
            .success(function(res) {
                WPService.categories = res;
            });

    };

    return WPService;
});