$(document).ready(function() {

	var pageIndex = 0;
	var linkSlidetempl;
	var indexLinkPage;

	var headerSite = $(".header-site");
    var countPages = $(".page-num-block");
    var headerSiteTopCoord;
    var headerSiteBottomCoord;

    var currentSlideNum;

    var scrollEvent = 0;

	var countSlidePages = $(".slide-page").length;
	
	$(".slide-page").each(function() {

		$(this).css({
			"height" : $(window).height() + "px",
			"position" : "absolute"
		});

		$(this).attr("data-slide-page-index", pageIndex);

		if( $(this).hasClass("active") ) {

			$(this).css({
				"opacity" : 1
			});

			$(this).css({
				"z-index" : 3
			});

			$(this).addClass("current-slide-page")

			if(pageIndex <= 9) {

				currentSlideNum = parseInt(pageIndex)+ 1;

				$(".current-page").text("0" + currentSlideNum.toString());

			} else {

				currentSlideNum = pageIndex;

				$(".current-page").text(currentSlideNum.toString());

			}

			linkSlidetempl = "<li><a href='#' class='active' data-page-index = "+ pageIndex +"></a></li>";
			
			if( $(this).hasClass("light-nav")) {

				headerSite.removeClass("inner_page");
                countPages.removeClass("inner_page");

            } else {

                headerSite.addClass("inner_page");
                countPages.addClass("inner_page");

            }


		} else {

			$(this).css({
				"opacity" : .1
			});

			$(this).css({
				"z-index" : 1
			});

			linkSlidetempl = "<li><a href='#' data-page-index = "+ pageIndex +"></a></li>";

		}

		$(".site-nav").append(linkSlidetempl);

		pageIndex++;

	});

	if(countSlidePages <= 9) {

		$(".count-pages").text("0 " + countSlidePages.toString());

	} else {

		$(".count-pages").text(countSlidePages);

	}


	$(".site-nav a").click(function(linkEvent) {

		linkEvent.preventDefault();

		indexLinkPage = $(this).attr("data-page-index");

		getActiveSlide(indexLinkPage, scrollEvent)

	});


	 $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {	 		

	 	console.log(scrollEvent + "   100");	 		

	 	scrollEvent++;

	 	if(scrollEvent <= 1) {

		 	$(".slide-page").each(function() {

		 		if( $(this).hasClass("current-slide-page") ) {

		 			indexLinkPage = parseInt( $(this).attr("data-slide-page-index") );

		 		}

		 	});

		    delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

		    if (delta >= 0) {

		    	indexLinkPage--;			   	

				setTimeout(function() {

					scrollEvent = 0;

					if( indexLinkPage < 0 ) {

						indexLinkPage = $(".slide-page").length - 1;

					}

					getActiveSlide(indexLinkPage.toString(), scrollEvent);
					console.log("Up");

				}, 600);

		    } else {		    		    	

				setTimeout(function() {

					console.log(indexLinkPage);

					scrollEvent = 0;

					if( indexLinkPage >= $(".slide-page").length - 1 ) {

						indexLinkPage = 0;

					} else {

						indexLinkPage++;

					}

					getActiveSlide(indexLinkPage.toString(), scrollEvent);
					console.log("Down");

				}, 600);

		    }

		}

	 });


	function getActiveSlide(indexLinkPage, scrollEvent) {

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

						console.log(indexLinkPage + "   219");

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

			var pageSlideLink = $(".site-nav").find("a");

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