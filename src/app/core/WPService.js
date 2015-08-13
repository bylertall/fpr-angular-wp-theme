angular
    .module('fprApp')
    .factory('wpService', wpService);

wpService.$inject = ['$http', '$sce'];

function wpService ($http, $sce) {
    var apiUrl = WPAPI.api_url,
        wpService = {
            feed: [],
            currentFeedPage: 0,
            totalFeedPages: 0,
            post: {},
            isFormatted: false,
            trustedPostContent: undefined,
            categories: [],
            postsByCategory: [],
            currentCategoryPage: 0,
            currentCategoryName: '',
            currentCategorySlug: '',
            totalCategoryPosts: 0,
            totalCategoryPages: 0,
            postsByTag: [],
            currentTagPage: 0,
            currentTagName: '',
            currentTagSlug: '',
            totalTagPosts: 0,
            totalTagPages: 0
        };

    // Main Feed
    wpService.getFeed = function() {
        var feed = [];

        if (wpService.currentFeedPage) {
            wpService.currentFeedPage++;
        } else {
            wpService.currentFeedPage = 1;
        }

        return $http.get(apiUrl + '/posts/?page=' + wpService.currentFeedPage)
            .success(function(res, status, headers) {
                feed = wpService.feed.concat(res);
                wpService.totalFeedPages = headers('X-WP-TotalPages');

                // Use angular.copy to update controller with new results
                angular.copy(feed, wpService.feed);
                console.log(wpService.feed);

                if (wpService.currentFeedPage > wpService.totalFeedPages) {
                    wpService.noMoreFeed = true;
                }
            });
    };

    // Single Post
    wpService.getSinglePost = function(slug) {
        var i,
            postArrayLength = wpService.feed.length;

        // If post is present in current feed array, use it
        // Otherwise get post by slug
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

    // Posts by category term
    wpService.getPostsByCategory = function(category) {
        var feed = [];

        _setCategoryInfo(category);

        // if page is not 0, increment
        // otherwise set to page 1
        if (wpService.currentCategoryPage) {
            wpService.currentCategoryPage++;
        } else {
            wpService.currentCategoryPage = 1;
        }

        return $http.get(apiUrl + '/posts/?filter[category_name]=' + category + '&page=' + wpService.currentCategoryPage)
            .success(function(res, status, headers) {
                feed = wpService.postsByCategory.concat(res);
                wpService.totalCategoryPages = headers('X-WP-TotalPages');

                angular.copy(feed, wpService.postsByCategory);
            });
    };

    // Posts by tag term
    wpService.getPostsByTag = function(tag) {
        var feed = [];

        _setTagInfo(tag);

        // if page is not 0, increment
        // otherwise set to page 1
        if (wpService.currentTagPage) {
            wpService.currentTagPage++;
            console.log('Current tag page: ' + wpService.currentTagPage);
        } else {
            wpService.currentTagPage = 1;
        }

        return $http.get(apiUrl + '/posts/?filter[tag]=' + tag + '&page=' + wpService.currentTagPage)
            .success(function(res, status, headers) {
                feed = wpService.postsByTag.concat(res);
                wpService.totalTagPages = headers('X-WP-TotalPages');

                angular.copy(feed, wpService.postsByTag);
            });
    };

    return wpService;

    ////////////////////////////////////
    // Private functions
    ////////////////////////////////////

    // determine is post is in new format w/ custom fields
    // if not, run post.content through $sce.trustAsHtml
    function _isFormatted(post) {
        if (post.acf['main_copy'] !== '') {
            return wpService.isFormatted = true;
        }

        wpService.trustedPostContent = $sce.trustAsHtml(post.content);
        return wpService.isFormatted = false;
    }

    // get category taxonomy info
    function _setCategoryInfo(category) {
        if (category === wpService.currentCategorySlug) return;

        // clear array & reset page # for new category
        wpService.postsByCategory = [];
        wpService.currentCategoryPage = 0;

        return $http.get(apiUrl + '/taxonomies/category/terms/?filter[slug]=' + category)
            .success(function(res) {
                // set category details
                wpService.currentCategorySlug = category;
                wpService.currentCategoryName = res[0].name;
                wpService.totalCategoryPosts = res[0].count;
                console.log('Current category info:');
                console.log(res);
            });
    }

    // get tag taxonomy info
    function _setTagInfo(tag) {
        if (tag === wpService.currentTagSlug) return;

        // clear array & reset page # for new tag
        wpService.postsByTag = [];
        wpService.currentTagPage = 0;

        return $http.get(apiUrl + '/taxonomies/post_tag/terms/?filter[slug]=' + tag)
            .success(function(res) {
                // set tag details
                wpService.currentTagSlug = tag;
                wpService.currentTagName = res[0].name;
                wpService.totalTagPosts = res[0].count;
                console.log('Current tag info:');
                console.log(res);
            });
    }
}
