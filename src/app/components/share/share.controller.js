angular
    .module('fprApp')
    .controller('shareController', shareController);

function shareController() {
    init();

    function init() {
        var p = document.createElement('script');
        p.type = 'text/javascript';
        p.async = true;
        p.src = '//assets.pinterest.com/js/pinit.js';
        (document.getElementsByTagName('footer')[0]).appendChild(p);
        console.log('Share controller');
    }
}
