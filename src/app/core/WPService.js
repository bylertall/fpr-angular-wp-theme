(function() {
    'use strict';

    angular
        .module('fprApp')
        .factory('wpService', wpService);

    wpService.$inject = ['$http', '$sce'];

    function wpService ($http, $sce) {
        var wpService = {
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
                return wpService.isFormatted = true;
            }

            wpService.trustedPostContent = $sce.trustAsHtml(post.content);
            return wpService.isFormatted = false;
        }

        wpService.getAllPosts = function(page) {
            var postArrayLength = wpService.feed.length;

            // only get if feed is empty
            if (!postArrayLength) {
                return $http.get(WPAPI.api_url + '/posts/?page=' + page + '?post_format=image')
                    .success(function(res) {
                        wpService.feed = res;
                        console.log(wpService.feed);
                    });
            }
        };

        wpService.singlePost = function(slug) {
            var i,
                postArrayLength = wpService.feed.length;

            if (postArrayLength) {
                for (i = 0; i < postArrayLength; i++) {
                    if (wpService.feed[i].slug === slug) {
                        wpService.post = wpService.feed[i];
                        return _isFormatted(wpService.post);
                    }
                }
            }

            return $http.get(WPAPI.api_url + '/posts/?filter[name]=' + slug)
                .success(function(res) {
                    // filter returns an array of posts, only 1 should return
                    wpService.post = res[0];
                    _isFormatted(wpService.post);
                });


        };

        //wpService.getAllCategories = function() {
        //    if (wpService.categories.length) {
        //        return;
        //    }
        //
        //    return $http.get(WPAPI.api_url + '/taxonomies/categories/terms')
        //        .success(function(res) {
        //            wpService.categories = res;
        //        });
        //
        //};

        return wpService;
    }
})();