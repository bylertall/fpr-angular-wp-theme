'use strict';

angular.module('fprApp').factory('WPService', function ($http, $sce) {
    var WPService = {
        feed: [],
        post: {},
        trustedPostContent: undefined,
        categories: [],
        currentPage: 1,
        totalPages: 1
    };

    function _trustPostContent() {
        return $sce.trustAsHtml(WPService.post.content);
    }

    WPService.getAllPosts = function() {
        // only get if feed is empty
        if (!WPService.feed.length) {
            return $http.get(WPAPI.api_url + '/posts')
                .success(function(res) {
                    WPService.feed = res;
                    console.log(WPService.feed);
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
                    WPService.trustedPostContent = _trustPostContent();
                });
        }

        for (i = 0; i < postArrayLength; i++) {
            if (WPService.feed[i].slug === slug) {
                WPService.post = WPService.feed[i];
                WPService.trustedPostContent = _trustPostContent();
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

    WPService.isFormatted = function(post) {
        if (post.acf['main_copy'] == '') {
            return false;
        }

        return true;
    };

    return WPService;
});