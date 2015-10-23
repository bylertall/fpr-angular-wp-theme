angular
    .module('fprApp')
    .directive('fprComments', fprComments);

function fprComments() {
    var directive = {
        restrict: 'AE',
        controller: 'commentController as comment',
        templateUrl: 'components/comments/comment.html'
    };

    return directive;
}
