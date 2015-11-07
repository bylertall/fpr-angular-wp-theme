angular
    .module('fprApp')
    .filter('htmlToPlaintext', htmlToPlaintext);


function htmlToPlaintext() {
    return function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
}
