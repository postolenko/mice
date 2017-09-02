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

    getHeaderSiteStyles();

    getMapSize();

    setScrollCoord();

    setTimeout(function() {

        getContentCenterPosition();

    }, 500);

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

        // --------------------------------------------------------

        getFooterPosition();

        getHeaderSiteStyles();

        getContentCenterPosition();

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

        });

    });


    $(function() {

        $(".quote").each(function() {

            var firstP = $(this).find("p");

            firstP.eq("0").addClass("first_p");

        });

    });

    $(function() {

        var parentSlidePopup;

        $(".show-slide-popup").click(function() {

            parentSlidePopup = $(this).closest(".slide-popup");

            if( parentSlidePopup.find(".hidden-block").is(":hidden") ) {

                parentSlidePopup.addClass("active");

                parentSlidePopup.find(".hidden-block").fadeIn(300);

                parentSlidePopup.find(".visible-block").css({
                    "display" : "none"
                });
            }

        });

        $(".hide-slide-popup").click(function() {

            parentSlidePopup = $(this).closest(".slide-popup");

            if( parentSlidePopup.find(".hidden-block").is(":visible") ) {

                parentSlidePopup.removeClass("active");

                parentSlidePopup.find(".hidden-block").css({
                    "display" : "none"
                });

                parentSlidePopup.find(".visible-block").fadeIn(300);

            }

        });

    });

    // -- Accordeon --

    $(function() {

        var accordeonItemList;
        var btnTeml = "<button class='slide_list_btn' ></button>";

        $(".accordeon li").each(function() {

            if( $(this).children("ul").length > 0 ) {

                $(this).append(btnTeml);

            }

        });        

        $(".accordeon").each(function() {

            var accordeonItem = $(this).find("li");

            accordeonItem.each(function() {

                accordeonItemList = $(this).children("ul");

                if( $(this).hasClass("active") ) {

                    accordeonItemList.slideDown(300);

                } else {

                    accordeonItemList.slideUp(300);

                }

            });

        });


        $(".accordeon li .slide_list_btn").click(function(e) {

            e.preventDefault();

            itemParent = $(this).closest("li");

            if( itemParent.children("ul").is(":visible" ) ) {

                itemParent.children("ul").slideUp(400);

                itemParent.removeClass("active");

            } else {

                var accordeonItemParent = $(this).closest("ul");

                accordeonItemParent.addClass("active-list");

                var listItems = accordeonItemParent.children("li");


                itemParent = $(this).closest("li");
                itemParent.addClass("active-item");

                listItems.each(function() {

                    if( $(this).hasClass("active-item") ) {

                        $(this).children("ul").slideDown(400);

                        $(this).addClass("active");

                    } else {

                        $(this).children("ul").slideUp(400);

                        $(this).removeClass("active");

                    }

                });

                accordeonItemParent.removeClass("active-list");
                itemParent.removeClass("active-item");

            }

        });

    });

    // -- /Accordeon --


    function setScrollCoord() {

        var linkContactsHref = location.href.split("#");

        var linkContacts = linkContactsHref[linkContactsHref.length - 1];

        if( linkContacts == "contacts" && $("#" + linkContacts).length > 0 ) {

            $(".slide-page").each(function(){

                if( $(this).attr("id") == linkContacts ) {

                    $(this).addClass("active");

                } else {

                    $(this).removeClass("active");

                }

            });

        }

    }


    function getFooterPosition() {

        $(".slide-page").each(function() {            

            slideFooter = $(this).find(".footer");
            headerSite = $(".header-site");

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

    function getHeaderSiteStyles() {

        if( $(".header-site").length > 0 ) {

            headerSiteTopCoord = headerSite.offset().top;

            headerSiteBottomCoord = headerSite.offset().top + $(window).height();

            $(".slide-page").each(function() {

                slidePageTopCoord = $(this).offset().top;

                if( headerSiteTopCoord >= slidePageTopCoord ) {

                    if( $(this).hasClass("light-nav") ) {                        

                        headerSite.removeClass("inner_page");

                        countPages.removeClass("inner_page");

                    } else {

                        headerSite.addClass("inner_page");

                        countPages.addClass("inner_page");

                    }                    

                }

            });

        }

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

    function getContentCenterPosition() {

        $(".slide-page").each(function() {

            var centerBlock = $(this).find(".center");

            var windowHeight = $(window).height();

            var contentHeight = centerBlock.height();

            var centerBlockOffsetTop = ( windowHeight - contentHeight ) / 2;             

            centerBlock.css({

                "padding-top" : centerBlockOffsetTop  + "px"

            });


        });

    }

});
