$(document).ready(function() {

    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

    // ----------------------------

    var headerSite = $(".header-site");
    var countPages = $(".page-num-block");
    var setFooterPositionInterval;
    var contentCoor;
    var slideFooter;
    var footerCoor;

    // ----------------------------

    var headerSiteTopCoord;
    var headerSiteBottomCoord;

    // ----------------------------

    var siteNavRightCoord;

    // ----------------------------

    var slidePageTopCoord;

    // ----------------------------

    getFooterPosition();

    getSiteNavPosition();

    getHeaderSiteStyles();

    getMapSize();

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

        // --------------------------------------------------------

        getFooterPosition();

        getSiteNavPosition();

        getHeaderSiteStyles();

        // getMapSize();

        // ------------------------------------

        if( $("ymaps").length > 0 ) {

            var mapWidth = bodyWidth - ( $(".contacts-thumbnails").offset().left + $(".contacts-thumbnails").width() );

            $(".map-block").width(mapWidth);

        }

    });

    $(document).scroll(function() {

        getHeaderSiteStyles();

    });

    $(function() {

        $(".three-cols-article").each(function() {

            var hBlock = $(this).find(".h-block");

            console.log(hBlock.offset().top);

        });

    });


    $(function() {

        $(".quote").each(function() {

            var firstP = $(this).find("p");

            firstP.eq("0").addClass("first_p");

        });

    });


    function getFooterPosition() {

        $(".slide-page").each(function() {            

            slideFooter = $(this).find(".footer");
            // headerSite = $(".header-site");

            $(this).css({"min-height" : $(window).height() + "px"});

            $(this).css({"padding-top" :  headerSite.height() + "px"});

            if( slideFooter.length > 0) {

                $(this).css({"padding-bottom" :  slideFooter.height() + "px"});

            }

            setFooterPositionInterval = setInterval(function() {

                if( slideFooter.length > 0) {

                    contentCoor = $(this).height() - slideFooter.height();
                    footerCoor = slideFooter.offset().top;

                }

                if( contentCoor != footerCoor || contentCoor < footerCoor) {

                    $(this).css({"min-height" : $(window).height() + "px"});

                    $(this).css({"padding-top" :  headerSite.height() + "px"});

                    if( slideFooter.length > 0) {

                        $(this).css({"padding-bottom" :  slideFooter.height() + "px"});

                    }

                    clearInterval(setFooterPositionInterval);

                }

            }, 35);

        });

    }

    function getSiteNavPosition() {

        // siteNavRightCoord = $(".right-coord").offset().left + $(".right-coord").width() - $(".site-nav-block").width()

        // $(".site-nav-block").css({
        //     "padding-top" :  headerSite.height() + "px",
        //     "left" : siteNavRightCoord  + "px" 
        // });

    }

    function getHeaderSiteStyles() {

        headerSiteTopCoord = headerSite.offset().top;

        headerSiteBottomCoord = headerSite.offset().top + $(window).height();

        $(".slide-page").each(function() {

            slidePageTopCoord = $(this).offset().top;

            if( headerSiteTopCoord >= slidePageTopCoord ) {                

                if( !$(this).hasClass("light-nav") ) {

                    headerSite.addClass("inner_page");

                    countPages.addClass("inner_page");

                } else {

                    headerSite.removeClass("inner_page");

                    countPages.removeClass("inner_page");

                }

            }

            // if( headerSiteTopCoord < slidePageTopCoord + countPages.height() ) {

            //      if( !$(this).hasClass("light-nav") ) {

            //         countPages.addClass("inner_page");

            //     } else {

            //         countPages.removeClass("inner_page");

            //     }

            // }

        });


    }


    function getMapSize() {

        var getMapSizeInterval = setInterval(function() {

            if( $("ymaps").length > 0 ) {

                clearInterval(getMapSizeInterval);

                var mapWidth = bodyWidth - ( $(".contacts-thumbnails").offset().left + $(".contacts-thumbnails").width() );

                $(".map-block").width(mapWidth);

            }

        }, 35);

    }


});
