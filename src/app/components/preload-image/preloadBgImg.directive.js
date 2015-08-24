// inspired by http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
// and https://github.com/RevillWeb/angular-preload-image

angular
    .module('fprApp')
    .directive('fprPreloadBg', fprPreloadBg);

function fprPreloadBg() {
    var directive = {
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        // url given in html template
        var url = attrs.fprPreloadBg;

        // if no featured img url is set then
        // acf['featured_image'] is set to 'false'
        if (url !== 'false') {
            preLoader(url, function() {
                elem.css({
                    'background-image': 'url("' + url + '")'
                });
            });
        }
    }
}

function preLoader(url, successCallback) {
    angular.element(new Image()).bind('load', function() {
        successCallback();
    }).attr('src', url);
}