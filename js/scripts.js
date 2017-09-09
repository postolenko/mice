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

    var centerBlock;
    var windowHeight;
    var contentHeight;
    var centerBlockOffsetTop;

    // ----------------------------

    var getMapSizeInterval;
    var mapWidth;

    // ----------------------------

    var accordeonItem;
    var accordeonItemList;
    var slideFlag;
    var accordeonItemParent;
    var listItems;

    // ----------------------------

    var miniatureIndex;

    // ----------------------------

    var linkContactsHref;
    var linkContacts;

    // ----------------------------

    getFooterPosition();

    getHeaderSiteStyles();

    getMapSize();

    setScrollCoord();

    setTimeout(function() {
        
        getSiteNavStyles();
        getContentCenterPosition();

    }, 500);

    $(window).resize(function() {

        bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

        // --------------------------------------------------------

        getFooterPosition();

        getHeaderSiteStyles();

        getContentCenterPosition();

        getSiteNavStyles();

        // ------------------------------------

        if( $("ymaps").length > 0 ) {

            mapWidth = bodyWidth - ( $(".contacts-thumbnails").offset().left + $(".contacts-thumbnails").width() );

            $(".map-block").width(mapWidth);

        }

        // -------------------------------------

        $(".slide-page").each(function() {

            $(this).css({
                "height" : $(window).height() + "px"
            });

        });

    });

    $(document).scroll(function() {

        getHeaderSiteStyles();

    });


    $(function() {

        $(".quote").each(function() {

            var firstP = $(this).find("p");

            firstP.eq("0").addClass("first_p");

        });

    });


    // -- Accordeon --

    $(function() {

        // var accordeonItem;
        // var accordeonItemList;
        // var slideFlag;
        // var accordeonItemParent;
        // var listItems;

        $(".accordeon").each(function() {

            accordeonItem = $(this).find("li");

            accordeonItem.each(function() {

                accordeonItemList = $(this).children("ul");

                if(accordeonItemList.length > 0) {

                    if( $(this).hasClass("active") ) {

                        accordeonItemList.slideDown(300);

                    } else {

                        accordeonItemList.slideUp(300);

                    }

                }

            });

        });


        $(".accordeon li span, .accordeon li a").click(function(e) {

            if( $(this).children("a").length > 0 ) {

                return true;

            } else {

                itemParent = $(this).closest("li");

                e.preventDefault();

                if( itemParent.children("ul").is(":visible" ) ) {

                    itemParent.children("ul").slideUp(500);

                    itemParent.removeClass("active");

                } else {

                    itemParent.addClass("active-item");

                    accordeonItemParent = itemParent.closest("ul");

                    accordeonItemParent.addClass("active-list");

                    listItems = accordeonItemParent.children("li");      

                    listItems.each(function() {

                        if( $(this).hasClass("active-item") ) {

                            $(this).children("ul").slideDown(500);
                            $(this).addClass("active");

                        } else {

                            $(this).children("ul").slideUp(500);
                            $(this).removeClass("active");

                        }

                    });

                    accordeonItemParent.removeClass("active-list");
                    itemParent.removeClass("active-item");

                }

            }

        });

    });

    // -- /Accordeon --

    $(".respmenubtn").click(function() {

        if( $(".main-nav-block").is(":hidden") ) {

            $(".main-nav-block").fadeIn(300);

            $(".main-nav-block").css({
                "height" : $(window).height() + "px"
            });

            $(this).addClass("active");

        } else {

            $(".main-nav-block").fadeOut(300);

            $(this).removeClass("active");

        }

    });

    $(this).keydown(function(eventObject){

        if (eventObject.which == 27) {

            $(".main-nav-block").fadeOut(300);

        }

    });

    // ----------------

    $(function() {

        // var miniatureIndex;

        $(".miniature-slide").click(function() {

            if( bodyWidth <= 700 ) {

                miniatureIndex = $(this).index();

                $(".parent-slider-block .two-sliders-slide:eq("+ miniatureIndex +")").animate({"left" : 0 + "%"}, 400);

            }

        });

        $(this).keydown(function(eventObject){

            if( bodyWidth <= 700 ) {

                if (eventObject.which == 27) {

                    $(".parent-slider-block .two-sliders-slide:eq("+ miniatureIndex +")").animate({"left" : -110 + "%"}, 400);

                }

            }

        });

        $(".close-slider").click(function() {

            if( bodyWidth <= 700 ) {

                $(".parent-slider-block .two-sliders-slide:eq("+ miniatureIndex +")").animate({"left" : -110 + "%"}, 400);

            }

        });

    });

    // ----------------

    function setScrollCoord() {

        linkContactsHref = location.href.split("#");

        linkContacts = linkContactsHref[linkContactsHref.length - 1];

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

        getMapSizeInterval = setInterval(function() {

            if( $("ymaps").length > 0 ) {

                clearInterval(getMapSizeInterval);

                mapWidth = bodyWidth - ( $(".contacts-thumbnails").offset().left + $(".contacts-thumbnails").width() );

                $(".map-block").width(mapWidth);

            }

        }, 35);

    }

    function getContentCenterPosition() {

        if( bodyWidth > 700 ) {

            $(".slide-page").each(function() {

                centerBlock = $(this).find(".center");            

                if( centerBlock.length > 0 ) {

                    windowHeight = $(window).height();

                    contentHeight = centerBlock.height();

                    centerBlockOffsetTop = ( windowHeight - contentHeight ) / 2;

                    if( centerBlockOffsetTop > headerSite.height() ) {

                        centerBlock.css({
                            "padding-top" : centerBlockOffsetTop  + "px"
                        });

                    } else {

                        centerBlock.css({
                            "padding-top" : headerSite.height()  + "px"
                        });

                    }

                }

            });

        }

    }


    function getSiteNavStyles() {

        if( $(".site-nav-block").length > 0 ) {

            $(".site-nav-block .center-position").css({
                "margin-top" : -1 * ( $(".vertical-line").height() + $(".pages-num").height() ) + "px"
            });        

            if( $(".site-nav-block .center-position").offset().top <= headerSite.height() ) {

                $(".site-nav-block").css({

                    "padding-top" : headerSite.height() + "px"

                });

            }

        }

    }

});
