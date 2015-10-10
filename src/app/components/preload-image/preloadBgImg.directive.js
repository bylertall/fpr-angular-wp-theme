// inspired by http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
// and https://github.com/RevillWeb/angular-preload-image

angular
    .module('fprApp')
    .directive('fprPreloadBg', fprPreloadBg);

function fprPreloadBg() {
    var directive = {
        scope: {
          fprPreloadBg: '@'
        },
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var imgUrl = scope.fprPreloadBg;
        // if background img url is NOT false or empty string, set background img url, then emit ready
        // otherwise, just emit ready to  remove loading
        if (imgUrl && imgUrl !== 'false') {
            preLoader(imgUrl, function() {
                elem.css({
                    'background-image': 'url(' + imgUrl + ')'
                });
            });
        } else {
            elem.css({
                'background-color': '#EEBACC'
            });
        }

        scope.$emit('bgImageReady');
    }

    function preLoader(url, successCallback) {
        angular.element(new Image()).bind('load', function() {
            successCallback();
        }).attr('src', url);
    }
}
