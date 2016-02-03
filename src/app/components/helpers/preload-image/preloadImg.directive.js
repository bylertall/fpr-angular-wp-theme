// inspired by http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
// and https://github.com/RevillWeb/angular-preload-image

angular
    .module('fprApp')
    .directive('fprPreloadImg', fprPreloadImg);

function fprPreloadImg() {
    var directive = {
        scope: {
            fprPreloadImg: '@'
        },
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var imgUrl = scope.fprPreloadImg;

        preLoader(imgUrl, function(img) {
            img.addClass('post-image');

            if (!!attrs.nopin) {
                img.attr('nopin', 'nopin');
            }
            if (!attrs.title) {
                img.attr('title', attrs.title);
            }

            if (!attrs.alt) {
                img.attr('alt', attrs.alt);
            }

            elem.append(img);
        });
    }

    function preLoader(url, successCallback) {
        var img = angular.element(new Image());

        img.bind('load', function() {
            successCallback(img);
        }).attr('src', url);
    }
}
