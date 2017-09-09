$(document).ready(function() {

	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

	var pageIndex = 0;
	var linkSlidetempl;
	var indexLinkPage;

	var headerSite = $(".header-site");
    var countPages = $(".page-num-block");

    var activeSlideIndex;
    var currentSlideNum;

    var scrollEvent = 0;

    var pageSlideLink;

    var contactsPage = "about";
    var linkContactsId = "contacts";

	var countSlidePages = $(".slide-page").length;

	// -------------------------------

	var linkContactsHref;
	var firstIndex;
	var lastIndex;
	var linkContacts;

	// -------------------------------

	$(document).resize(function() {

		bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

	});

	// -------------------------------
	
	$(".slide-page").each(function() {

		$(this).css({
			"position" : "absolute",
			"opacity" : .1,
			"z-index" : 1
		});

		$(this).attr("data-slide-page-index", pageIndex);

		pageIndex++;

	});

	// -------------------------------

	$(".slide-page").each(function() {

		if( $(this).hasClass("active") ) {

			activeSlideIndex = parseInt( $(this).attr("data-slide-page-index") );

			return false;

		} else {

			activeSlideIndex = 0;

			return true;

		}

	});

	$(".slide-page:eq("+activeSlideIndex+")").addClass("active");

	$(".slide-page").eq(activeSlideIndex).css({
		"opacity" : 1,
		"z-index" : 3
	});

	$(".slide-page").eq(activeSlideIndex).addClass("current-slide-page");

	if(activeSlideIndex <= 9) {

		currentSlideNum = "0" + (activeSlideIndex+ 1).toString();

	} else {

		currentSlideNum = activeSlideIndex.toString();

	}

	$(".current-page").text(currentSlideNum);


	if(countSlidePages <= 9) {

		$(".count-pages").text("0 " + countSlidePages.toString());

	} else {

		$(".count-pages").text(countSlidePages);

	}

	// ---------------------------------

	$(".slide-page").each(function() {

		pageIndex = parseInt( $(this).attr("data-slide-page-index") );

		if( $(this).hasClass("current-slide-page") ) {

			linkSlidetempl = "<li><a href='#' class='active' data-page-index = "+ pageIndex +"></a></li>";

		} else {

			linkSlidetempl = "<li><a href='#' data-page-index = "+ pageIndex +"></a></li>";

		}

		$(".site-nav").append(linkSlidetempl);

	});

	$(".slide-page").each(function() {

		if( $(this).hasClass("light-nav") && $(this).hasClass("current-slide-page") ) {

			headerSite.removeClass("inner_page");
            countPages.removeClass("inner_page");

            return false;

        } else {

            headerSite.addClass("inner_page");
            countPages.addClass("inner_page");

            return true;

        }

     });
	
	// -----------------------------------------

	$(".site-nav a").click(function(linkEvent) {

		linkEvent.preventDefault();

		indexLinkPage = $(this).attr("data-page-index");

		getActiveSlide(indexLinkPage);

	});

	$("a.contacts-link").click(function(linkEvent) {

		linkContactsHref = location.href;

		firstIndex = linkContactsHref.lastIndexOf("/");

		lastIndex = linkContactsHref.lastIndexOf(".");

		linkContacts = linkContactsHref.substring(lastIndex, firstIndex+1);

        if( linkContacts == contactsPage ) {

	        linkEvent.preventDefault();

	        if( $("#" + linkContactsId).length > 0 ) {

				$(".slide-page").each(function(){

			        if( $(this).attr("id") == "contacts" ) {

			            indexLinkPage = $(this).attr("data-slide-page-index");

			            getActiveSlide(indexLinkPage);

			            return false;

			        }

			    });

			}

		}

    });


	$(window).on('mousewheel', function(e) {

		if( bodyWidth > 700 ) {

		 	scrollEvent++;

		 	if(scrollEvent <= 1) {

			 	$(".slide-page").each(function() {

			 		if( $(this).hasClass("current-slide-page") ) {

			 			indexLinkPage = parseInt( $(this).attr("data-slide-page-index") );

			 		}

			 	});

			    if (e.deltaY > 0) {

			    	indexLinkPage--;			   	

					setTimeout(function() {

						scrollEvent = 0;

						if( indexLinkPage < 0 ) {

							indexLinkPage = $(".slide-page").length - 1;

						}

						getActiveSlide(indexLinkPage.toString());

					}, 600);

			    } else {		    		    	

					setTimeout(function() {

						scrollEvent = 0;

						if( indexLinkPage >= $(".slide-page").length - 1 ) {

							indexLinkPage = 0;

						} else {

							indexLinkPage++;

						}

						getActiveSlide(indexLinkPage.toString());

					}, 600);

			    }

			}

		}

	 });


	function getActiveSlide(indexLinkPage) {

		if( $(".slide-page:eq("+ indexLinkPage +")").hasClass("current-slide-page") && $(".slide-page:eq("+ indexLinkPage +")").attr("data-slide-page-index") == indexLinkPage ) {

			return false;

		} else {

			$(".slide-page").each(function() {

				if( $(this).attr("data-slide-page-index") != indexLinkPage ) {

					$(this).animate({
						"opacity" : .1
					}, 500);

				}

			});

			$(".sliding").animate({
				"width" : 100 + "%"
			},700);	

			setTimeout(function() {

				$(".slide-page").each(function() {

					if( $(this).attr("data-slide-page-index") != indexLinkPage ){

						$(".slide-page").css({"z-index" : 1});

						$(this).removeClass("current-slide-page");

					}

				});

			}, 800);

			setTimeout(function() {

				$(".slide-page").each(function() {

					if( $(this).attr("data-slide-page-index") == indexLinkPage.toString() ){

						$(this).addClass("current-slide-page");

						$(this).css({"z-index" : 3});

						$(this).animate({
							"opacity" : 1
						}, 300);

						$(".sliding").css({
							"width" : 0 + "%"
						});

						return;

					}

				});

			}, 1000);

			pageSlideLink = $(".site-nav").find("a");

			pageSlideLink.each(function() {

				if( $(this).hasClass("active") ) {

					$(this).removeClass("active");

				} else if( $(this).attr("data-page-index") == indexLinkPage ) {

					$(this).addClass("active");

				}

			});

			if(indexLinkPage <= 9) {

				currentSlideNum = parseInt(indexLinkPage) + 1;

				$(".current-page").text("0" + currentSlideNum.toString());

			} else {

				$(".current-page").text(currentSlideNum.toString());

			}

			if( $(".slide-page:eq("+ indexLinkPage +")").hasClass("light-nav")) {

				headerSite.removeClass("inner_page");
                countPages.removeClass("inner_page");

            } else {

                headerSite.addClass("inner_page");
                countPages.addClass("inner_page");

            }

		}

	}
	

});