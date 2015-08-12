angular
    .module('fprApp')
    .factory('wpService', wpService);

wpService.$inject = ['$http', '$sce'];

function wpService ($http, $sce) {
    var apiUrl = WPAPI.api_url,
        wpService = {
            feed: [],
            post: {},
            isFormatted: false,
            trustedPostContent: undefined,
            categories: [],
            postsByCategory: [],
            currentCategoryName: '',
            currentCategorySlug: '',
            postsByTag: [],
            currentTagName: '',
            currentTagSlug: '',
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

    // get category taxonomy info
    function _getCategory(category) {
        return $http.get(apiUrl + '/taxonomies/category/terms/?filter[slug]=' + category)
            .success(function(res) {
                wpService.currentCategorySlug = category;
                wpService.currentCategoryName = res[0].name;
            });
    }

    // get tag taxonomy info
    function _getTag(tag) {
        return $http.get(apiUrl + '/taxonomies/post_tag/terms/?filter[slug]=' + tag)
            .success(function(res) {
                wpService.currentTagSlug = tag;
                wpService.currentTagName = res[0].name;
            });
    }

    wpService.getFeed = function(page) {
        var postArrayLength = wpService.feed.length;

        // only get if feed is empty
        if (!postArrayLength) {
            return $http.get(apiUrl + '/posts/?page=' + page + '?post_format=image')
                .success(function(res) {
                    wpService.feed = res;
                    console.log(wpService.feed);
                });
        }
    };

    wpService.getSinglePost = function(slug) {
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

        return $http.get(apiUrl + '/posts/?filter[name]=' + slug)
            .success(function(res) {
                // filter returns an array of posts, only 1 should return
                wpService.post = res[0];
                _isFormatted(wpService.post);
            });


    };

    wpService.getPostsByCategory = function(category) {
        if (wpService.currentCategorySlug === category) {
            return;
        }

        _getCategory(category);

        return $http.get(apiUrl + '/posts/?filter[category_name]=' + category)
            .success(function(res) {
                if (wpService.postsByCategory.length) {
                    wpService.postsByCategory = [];
                }

                wpService.postsByCategory = res;
                console.log("number of category posts: " + wpService.postsByCategory.length);

            });
    };

    wpService.getPostsByTag = function(tag) {
        if (wpService.currentTagSlug === tag) {
            return;
        }

        _getTag(tag);

        return $http.get(apiUrl + '/posts/?filter[tag]=' + tag)
            .success(function(res) {
                if (wpService.postsByTag.length) {
                    wpService.postsByTag = [];
                }

                wpService.postsByTag = res;
                console.log("number of tag posts: " + wpService.postsByTag.length);

            });
    };

    return wpService;
}
