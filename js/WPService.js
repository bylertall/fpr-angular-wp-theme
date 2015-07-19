'use strict';

angular.module('fprApp').factory('WPService', function ($http, $sce) {
    var WPService = {
        feed: [],
        post: {},
        isFormatted: false,
        trustedPostContent: undefined,
        categories: [],
        currentPage: 1,
        totalPages: 1
    };

    function _isFormatted(post) {
        // check if WP-ACF is set for post
        // if not, run post.content through $sce.trustAsHtml

        if (post.acf['main_copy'] !== '') {
            return WPService.isFormatted = true;
        }

        WPService.trustedPostContent = $sce.trustAsHtml(post.content);
        return WPService.isFormatted = false;
    }

    WPService.getAllPosts = function(page) {
        var postArrayLength = WPService.feed.length;

        // only get if feed is empty
        if (!postArrayLength) {
            return $http.get(WPAPI.api_url + '/posts/?page=' + page + '?post_format=image')
                .success(function(res) {
                    WPService.feed = res;
                    console.log(WPService.feed);
            });
        }
    };

    WPService.singlePost = function(slug) {
        var i,
            postArrayLength = WPService.feed.length;

        if (postArrayLength) {
            for (i = 0; i < postArrayLength; i++) {
                if (WPService.feed[i].slug === slug) {
                    WPService.post = WPService.feed[i];
                    return _isFormatted(WPService.post);
                }
            }
        }

        return $http.get(WPAPI.api_url + '/posts/?filter[name]=' + slug)
            .success(function(res) {
                // filter returns an array of posts, only 1 should return
                WPService.post = res[0];
                _isFormatted(WPService.post);
            });


    };

    //WPService.getAllCategories = function() {
    //    if (WPService.categories.length) {
    //        return;
    //    }
    //
    //    return $http.get(WPAPI.api_url + '/taxonomies/categories/terms')
    //        .success(function(res) {
    //            WPService.categories = res;
    //        });
    //
    //};

    return WPService;
});