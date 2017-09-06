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

            var mapWidth = bodyWidth - ( $(".contacts-thumbnails").offset().left + $(".contacts-thumbnails").width() );

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

        $(".accordeon").each(function() {

            var accordeonItem = $(this).find("li");

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


        $(".accordeon li span").click(function(e) {

            if( $(this).children("a").length > 0 ) {

                return true;

            } else { 

                itemParent = $(this).closest("li");

                e.preventDefault();

                if( itemParent.children("ul").is(":visible" ) ) {

                    itemParent.children("ul").slideUp(400);

                    itemParent.removeClass("active");

                } else {

                    itemParent.addClass("active-item");

                    var accordeonItemParent = itemParent.closest("ul");

                    accordeonItemParent.addClass("active-list");

                    var listItems = accordeonItemParent.children("li");         

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

            // $(this).css({"padding-top" :  headerSite.height() + "px"});

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

                    // $(this).css({"padding-top" :  headerSite.height() + "px"});

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
