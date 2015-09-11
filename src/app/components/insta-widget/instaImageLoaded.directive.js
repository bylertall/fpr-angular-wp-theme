angular
    .module('fprApp')
    .directive('fprInstaLoaded', fprInstaLoaded);

function fprInstaLoaded() {
    return {
        link: link
    }
}

function link(scope, elem, attrs) {
    if (scope.$last){
        elem.on('load', function() {
            // emit detected by nav, sets nav offset height when
            // insta image is loaded so height is available (see nav directive)
            scope.$emit('instaWidgetLoaded');
        });
    }
}