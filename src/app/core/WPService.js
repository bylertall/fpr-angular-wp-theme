angular
    .module('fprApp')
    .factory('wpService', wpService);

wpService.$inject = ['$http', '$sce', '$state'];

function wpService ($http, $sce, $state) {
    var apiUrl = WPAPI.api_url,
        wpService = {
            feed: [],
            currentFeedPage: 0,
            post: {},
            isFormatted: false,
            trustedPostContent: undefined,
            categories: [],
            postsByCategory: [],
            currentCategoryPage: 0,
            currentCategoryName: '',
            currentCategorySlug: '',
            totalCategoryPosts: 0,
            postsByTag: [],
            currentTagPage: 0,
            currentTagName: '',
            currentTagSlug: '',
            totalTagPosts: 0,
            currentSearchPage: 0,
            currentSearchStr: '',
            searchResults: []
        };

    // Main Feed
    wpService.getFeed = function() {
        var feed = [];

        // if page is 0, set to page 1
        // otherwise increment
        wpService.currentFeedPage === 0 ? wpService.currentFeedPage = 1 : wpService.currentFeedPage++;

        return $http.get(apiUrl + '/posts/?page=' + wpService.currentFeedPage)
            .success(function(res, status, headers) {
                feed = wpService.feed.concat(res);

                // Use angular.copy to update controller with new results
                angular.copy(feed, wpService.feed);
                console.log(wpService.feed);

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
            .success(function(res, status, headers) {
                // filter returns an array of posts, only 1 should return
                wpService.post = res[0];
                _isFormatted(wpService.post);
                console.log(res);
            });
    };

    // Posts by category term
    wpService.getPostsByCategory = function(category) {
        var feed = [];

        _setCategoryInfo(category);

        // if page is 0, set to page 1
        // otherwise increment
        wpService.currentCategoryPage === 0 ? wpService.currentCategoryPage = 1 : wpService.currentCategoryPage++;

        return $http.get(apiUrl + '/posts/?filter[category_name]=' + category + '&page=' + wpService.currentCategoryPage)
            .success(function(res, status, headers) {
                feed = wpService.postsByCategory.concat(res);

                angular.copy(feed, wpService.postsByCategory);
            });
    };

    // Posts by tag term
    wpService.getPostsByTag = function(tag) {
        var feed = [];

        _setTagInfo(tag);

        // if page is 0, set to page 1
        // otherwise increment
        wpService.currentTagPage === 0 ? wpService.currentTagPage = 1 : wpService.currentTagPage++;

        return $http.get(apiUrl + '/posts/?filter[tag]=' + tag + '&page=' + wpService.currentTagPage)
            .success(function(res) {
                feed = wpService.postsByTag.concat(res);

                angular.copy(feed, wpService.postsByTag);
            });
    };

    // get search results
    wpService.getSearchResults = function(search) {
        var feed = [];

        // reset search properties if new search string
        if (wpService.currentSearchStr !== search) {
            wpService.currentSearchPage = 0;
            wpService.currentSearchStr = search;

            angular.copy(feed, wpService.searchResults);
        }

        // if page is 0, set to page 1
        // otherwise increment
        wpService.currentSearchPage === 0 ? wpService.currentSearchPage = 1 : wpService.currentSearchPage++;

        return $http.get(apiUrl + '/posts/?filter[s]=' + search + '&page=' + wpService.currentSearchPage + '&filter[posts_per_page]=20')
            .success(function(res) {
                feed = wpService.searchResults.concat(res);

                console.log('The result is: ');
                console.log(res);

                // update search results
                angular.copy(feed, wpService.searchResults)
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
        // only get category info if different from current category
        if (category === wpService.currentCategorySlug) return;

        // clear array & reset page # for new category
        wpService.postsByCategory = [];
        wpService.currentCategoryPage = 0;

        return $http.get(apiUrl + '/taxonomies/category/terms/?filter[slug]=' + category)
            .success(function(res) {
                // set category name if get request results in empty array
                if (!res.length) {
                    return wpService.currentCategoryName = category;
                }

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
        // only get tag info if different from current tag
        if (tag === wpService.currentTagSlug) return;

        // clear array & reset page # for new tag
        wpService.postsByTag = [];
        wpService.currentTagPage = 0;

        return $http.get(apiUrl + '/taxonomies/post_tag/terms/?filter[slug]=' + tag)
            .success(function(res) {
                // set tag name if get request results in empty array
                if (!res.length) {
                    return wpService.currentTagName = tag;
                }

                // set tag details
                wpService.currentTagSlug = tag;
                wpService.currentTagName = res[0].name;
                wpService.totalTagPosts = res[0].count;
                console.log('Current tag info:');
                console.log(res);
            });
    }
}
