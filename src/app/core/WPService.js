angular
    .module('fprApp')
    .factory('wpService', wpService);

wpService.$inject = ['$http', '$sce'];

function wpService($http, $sce) {
    var apiUrl = WPAPI.apiUrl,
        currentFeedPage = 1,
        currentCategoryPage = 1,
        currentTagPage = 1,
        currentSearchPage = 1,
        currentSearchString = '',
        factory = {
            getFeed: getFeed,
            feed: [],
            getSinglePost: getSinglePost,
            post: {},
            isFormatted: false,
            trustedPostContent: undefined,
            categories: [],
            getPostsByCategory: getPostsByCategory,
            postsByCategory: [],
            currentCategoryName: '',
            currentCategorySlug: '',
            totalCategoryPosts: 0,
            getPostsByTag: getPostsByTag,
            postsByTag: [],
            currentTagName: '',
            currentTagSlug: '',
            totalTagPosts: 0,
            getSearchResults: getSearchResults,
            searchResults: []
        };

    // Main Feed
    function getFeed() {
        var feed = [];
        return $http.get(apiUrl + '/posts/?page=' + currentFeedPage)
            .success(function(res, status, headers) {
                feed = factory.feed.concat(res);

                // Use angular.copy to update controller with new results
                angular.copy(feed, factory.feed);

                currentFeedPage += 1;

                console.log(factory.feed);
            });
    }

    // Single Post
    function getSinglePost(slug) {
        var i,
            postArrayLength = factory.feed.length;

        // If post is present in current feed array, use it
        // Otherwise get post by slug
        if (postArrayLength) {
            for (i = 0; i < postArrayLength; i++) {
                if (factory.feed[i].slug === slug) {
                    factory.post = factory.feed[i];
                    factory.trustedPostContent = $sce.trustAsHtml(factory.post.content);
                    _isFormatted(factory.feed[i]);
                }
            }
        }

        return $http.get(apiUrl + '/posts/?filter[name]=' + slug)
            .success(function(res, status, headers) {
                // filter returns an array of posts, only 1 should return
                factory.post = res[0];
                factory.trustedPostContent = $sce.trustAsHtml(factory.post.content);
                _isFormatted(res[0]);
            });
    }

    // Posts by category term
    function getPostsByCategory(category) {
        var feed = [];

        _setCategoryInfo(category);

        return $http.get(apiUrl + '/posts/?filter[category_name]=' + category + '&page=' + currentCategoryPage + '&filter[posts_per_page]=10')
            .success(function(res, status, headers) {
                feed = factory.postsByCategory.concat(res);
                angular.copy(feed, factory.postsByCategory);
                currentCategoryPage += 1;
            });
    }

    // Posts by tag term
    function getPostsByTag(tag) {
        var feed = [];

        _setTagInfo(tag);

        return $http.get(apiUrl + '/posts/?filter[tag]=' + tag + '&page=' + currentTagPage + '&filter[posts_per_page]=10')
            .success(function(res) {
                feed = factory.postsByTag.concat(res);
                angular.copy(feed, factory.postsByTag);
                currentTagPage += 1;
            });
    }

    // get search results
    function getSearchResults(search) {
        var feed = [],
            searchUrl = '';

        // reset search properties
        if (currentSearchString !== search) {
            currentSearchPage = 1;
            currentSearchString = search;
            angular.copy(feed, factory.searchResults);
        }

        searchUrl = apiUrl + '/posts/?filter[s]=' + search + '&page=' + currentSearchPage + '&filter[posts_per_page]=10';

        return $http.get(searchUrl)
            .success(function(res) {
                currentSearchPage += 1;
                feed = factory.searchResults.concat(res);

                // update search results
                angular.copy(feed, factory.searchResults);
            });
    }

    ////////////////////////////////////
    // Private functions
    ////////////////////////////////////

    // determine is post is in new format w/ custom fields
    // if not, run post.content through $sce.trustAsHtml
    function _isFormatted(post) {
        factory.isFormatted = (post.acf['main_copy'] !== undefined) ? true : false;
    }

    // get category taxonomy info
    function _setCategoryInfo(category) {
        // only get category info if different from current category
        if (category !== factory.currentCategorySlug) {
            // clear array & reset page # for new category
            factory.postsByCategory = [];
            currentCategoryPage = 1;

            return $http.get(apiUrl + '/taxonomies/category/terms/?filter[slug]=' + category)
                .success(function(res) {
                    // set category name if get request results in empty array
                    if (!res.length) {
                        factory.currentCategoryName = category;
                        return;
                    }

                    // set category details
                    factory.currentCategorySlug = category;
                    factory.currentCategoryName = res[0].name;
                    factory.totalCategoryPosts = res[0].count;
                });
        }
    }

    // get tag taxonomy info
    function _setTagInfo(tag) {
        // only get tag info if different from current tag
        if (tag === factory.currentTagSlug) {
            return;
        }

        // clear array & reset page # for new tag
        factory.postsByTag = [];
        currentTagPage = 1;

        return $http.get(apiUrl + '/taxonomies/post_tag/terms/?filter[slug]=' + tag)
            .success(function(res) {
                // set tag name if get request results in empty array
                if (!res.length) {
                    factory.currentTagName = tag;
                    return;
                }

                // set tag details
                factory.currentTagSlug = tag;
                factory.currentTagName = res[0].name;
                factory.totalTagPosts = res[0].count;
            });
    }

    return factory;
}
