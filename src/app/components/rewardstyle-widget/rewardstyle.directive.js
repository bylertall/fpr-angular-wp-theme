angular
    .module('fprApp')
    .directive('rewardStyle', rewardStyle);

rewardStyle.$inject = ['$window'];

function rewardStyle($window) {
    var directive = {
        scope: {},
        replace: true,
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var widgetHtml = buildWidget(attrs.rewardStyle);

        elem.html(widgetHtml);

        var window = angular.element($window);

        window[0].__stp.init();

    }

// build rs widget
    function buildWidget(id) {
        var html;

        // rs html
        html = '<div class="shopthepost-widget" data-widget-id="' + id + '">'
            +   '<div class="rs-adblock"><img src="//assets.rewardstyle.com/images/search/350.gif" onerror="this.parentNode.innerHTML=\'Disable your ad blocking software to view this content.\'" style="width: 15px; height: 15px;" />'
            +     '<noscript>JavaScript is currently disabled in this browser. Reactivate it to view this content.</noscript>'
            +   '</div>'
            + '<div>'
        ;

        return html;
    }
}

/**
 * Check for acf.rewardstyle_id, default is false
 * If id is present, build widget from there
 * If no id, look for shop the post widget in the post body
 * If rewardstyle shortcode is present in body, get the id and build widget
 * If no shortcode and no acf id, do nothing
 *
 */



// if attrs id is false, look for shortcode in post content
//function getId () {
//    var stpContent, firstIndex, secondIndex;
//
//    if($stpPostContent !== 'undefined') {
//
//        // get html of rs widget w/ id
//        stpContent = $stpPostContent.html();
//
//        firstIndex = (stpContent.indexOf('"')) + 1;
//
//        //cut string to start w/ id #
//        stpContent = stpContent.slice(firstIndex);
//
//        secondIndex = (stpContent.indexOf('"'));
//
//        return stpContent.substr(0, secondIndex);
//    }
//}









// FROM GHOST BUILD
//
//
//
////  only run if loop or post view
//if ( $('.post-list').length || $('.post-template').length ) {
//
//    // find rs widget div in each post of loop view
//    $stpLoopDivs = $('.shopthepost-widget-container');
//
//    // if loop view, add widget to shop div
//    if($stpLoopDivs.length) {
//
//        widgetCaption = '<div class="widget-caption">From the Post:</div>';
//
//        $stpLoopDivs.each(function(index) {
//
//
//            // find single widget div in loop view
//            $stpPostContent = $(this).find('p:contains("shopthepost")');
//
//            // only run if shop the post id paragraph is present
//            if ($stpPostContent.length) {
//                // get rs widget id from post content
//                idWidget = getId();
//
//                //  build rs widget with proper id
//                rsWidget = buildWidget(idWidget);
//
//                $(this).empty().append(widgetCaption).append(rsWidget);
//
//            } else {
//                // if no rs widget, remove widget container
//                $(this).remove();
//
//                //  also remove shop button
//                idPost = $(this).attr('id');
//                $('.shop-button-container[data-post-id*="' + idPost + '"]').remove();
//            }
//        });
//    } else {
//        // for post view
//        // find <p>'s w/ rs widget id
//        $stpPostContent= $('p:contains("shopthepost")');
//
//        if($stpPostContent.length) {
//
//            idWidget = getId();
//            rsWidget = buildWidget(idWidget)
//            $stpPostContent.empty().append(rsWidget);
//        }
//    }
//
//}