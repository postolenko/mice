(function($){

	$(window).on("load",function(){

		$(".scroll").mCustomScrollbar();

	});

})(jQuery);

$(document).ready(function() {

	var sliderAppendDots;
	var initDots;

	var initialized = false;

	// ---------------------

	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

	// ---------------------

	var sliderName;
	var countSlides;
	var sliderAppendArrows;
	var slideCurrent;
	var miniatureSlider;

	// ---------------------

	var dotsItemsParent;
	var dotsItems;
	var startYear;
	var itemYear;

	// ---------------------

	var bigSlider;

	// ---------------------

	// ---------------------

	slick_slider();

	$(window).resize(function() {

		bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

		slick_slider();

	});


	if( $(".promo-backgrounds-slider").length > 0 ) {
		
		$(".promo-backgrounds-slider").not(".slick-initialized").slick({
	      dots: false,
	      arrows: false,
	      autoplay: true,
	      autoplaySpeed: 10000,
	      speed: 1200,
	      slidesToShow: 1,
	      fade: true,
	      draggable : false
	    });

	}

	if( $(".promo-slider").length > 0 ) {

		$(".promo-slider").not(".slick-initialized").slick({
			dots: false,
			arrows: false,      
			autoplay: true,
			autoplaySpeed: 10000,
			speed: 1200,
			slidesToShow: 1,
			fade: true,
			draggable : false
		});

	}

	if( $(".articles_slider").length > 0 ) {

		$(".articles_slider").each(function() {

			sliderName = $(this).attr("data-slider");

			countSlides = $(this).find(".slide").length;

			sliderAppendArrows = $(".append-arrows[data-slider = '"+ sliderName +"']");

			if( $(".dots-pagination-append[data-slider = '"+ sliderName +"']").length > 0   ) {

				sliderAppendDots = $(".dots-pagination-append[data-slider = '"+ sliderName +"']");
				initDots = true;

			} else {

				sliderAppendDots = false;
				initDots = false;
			}

			$(this).not(".slick-initialized").slick({
				dots: initDots,
				arrows: true,
				appendArrows : sliderAppendArrows,
				appendDots : sliderAppendDots,
				// autoplay: true,
				autoplaySpeed: 10000,
				speed: 1200,
				slidesToShow: 1,
				fade: true
			});

			if( $(this).not(".slick-initialized") ) {

				slideCurrent = $(this).find(".slick-current").attr("data-slick-index");

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .total-slides").text(countSlides);

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+slideCurrent + 1);

			}

		});

		$(".articles_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			sliderName = $(this).attr("data-slider");

			$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+nextSlide + 1);

		});

		$(".inner_slider, .news-slider-inner").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			return false;

		});

		if($(".range-pagination .slick-dots").length > 0) {

			$(".range-pagination .slick-dots").each(function() {

				dotsItemsParent = $(this).closest(".range-pagination");

				dotsItems = $(this).find("li");

				startYear = parseInt( dotsItemsParent.attr("data-start") );

				dotsItems.each(function() {

					$(this).attr("data-year", startYear++);

					itemYear = $(this).attr("data-year");

					$(this).prepend("<span class='item-year'>"+ itemYear +"</span>");

				});

			});

		}

	}

	if($(".parent_slider").length > 0) {

		$(".parent_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			sliderName = $(this).attr("data-slider");

			$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+nextSlide + 1);

		});

	}

	if($(".news-big-slider").length > 0) {

		$(".news-big-slider").each(function() {

			sliderName = $(this).attr("data-slider");

			sliderAppendArrows = $(".append-arrows[data-slider = '"+ sliderName +"']");

			miniatureSlider = $(".news-miniatures-slider[data-slider = '"+ sliderName +"']");

			countSlides = $(this).find(".slide").length;

			$(this).not(".slick-initialized").slick({
				dots: false,
				arrows: true,
				// autoplay: true,
				autoplaySpeed: 10000,
				speed: 1200,
				slidesToShow: 1,
				fade: true,
				appendArrows: sliderAppendArrows,
				asNavFor : $(".news-miniatures-slider")
			});

			miniatureSlider.not(".slick-initialized").slick({
				dots: false,
				arrows: false,
				// autoplay: true,
				autoplaySpeed: 10000,
				speed: 1200,
				vertical: true,
				draggable: true,
				slidesToShow: 3,
				slidesToScroll : 1,
				focusOnSelect: true,
				asNavFor : $(".news-big-slider"),
				responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 2
			      }
			    },
			    {
			     breakpoint: 768,
			      settings: {
			        slidesToShow: 2
			      }
			    },
			    {
			     breakpoint: 700,
			      settings: {
			        slidesToShow: 3,
			        vertical: false
			      }
			    },
			    {
			     breakpoint: 532,
			      settings: {
			        slidesToShow: 2,
			        vertical: false
			      }
			    },
			    {
			      breakpoint: 350,
			      settings: {
			        slidesToShow: 1,
			        vertical: false
			      }
			    }
			  ]
			});
			

			if( $(this).not(".slick-initialized") ) {

				slideCurrent = $(this).find(".slick-current").attr("data-slick-index");

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .total-slides").text(countSlides);

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+slideCurrent + 1);

			}

		});

		$(".news-big-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			sliderName = $(this).attr("data-slider");

			$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+nextSlide + 1);

		});

		$(".news-slider-inner").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			return false;

		});

	}

	if($(".news-slider-inner").length > 0) {

		$(".news-slider-inner").each(function() {

			sliderName = $(this).attr("data-inner-slider");

			sliderAppendArrows = $(".news-inner-arrows[data-inner-slider = '"+ sliderName  +"']");

			$(this).not(".slick-initialized").slick({
				dots: false,
				arrows: true,
				autoplay: true,
				autoplaySpeed: 10000,
				speed: 1200,
				slidesToShow: 1,
				fade: true,
				appendArrows: sliderAppendArrows
			});

		});


	}

	function slick_slider() {

		if ($(".miniatures_slider.slick-initialized").length > 0 && bodyWidth <= 700 ) {

			setTimeout(function() {

				$(".miniatures_slider").slick("unslick");			

				$(".parent-slider").slick("unslick");

			}, 500);

			initialized = false;

		} else if( bodyWidth > 700 ) {

			if( initialized == false ) {

				if ($(".parent_slider.slick-initialized").length > 0 ) {

					$(".parent-slider").each(function() {
						$(this).slick("unslick");
					});

				}

				$(".parent_slider").each(function() {

					bigSlider = $(this);

					sliderName = $(this).attr("data-parent-slider");

					sliderAppendArrows = $(".append-arrows[data-parent-slider = '"+ sliderName +"']");

					miniaturesSlider = $(".miniatures_slider[data-miniature-slider = '"+ sliderName +"']");

					bigSlider.not(".slick-initialized").slick({
						dots: false,
						arrows: false,
						// autoplay: true,
						draggable : false,
						focusOnSelect: true,
						autoplaySpeed: 10000,
						speed: 1200,
						slidesToShow: 1,
						fade: true,
						asNavFor : miniaturesSlider
					});

					miniaturesSlider.not(".slick-initialized").slick({
						dots: false,
						arrows: false,
						// autoplay: true,
						autoplaySpeed: 10000,
						speed: 1200,
						slidesToShow: 4,
						slidesToScroll : 1,
						centerMode: false,
						focusOnSelect: true,
						asNavFor : bigSlider,
						responsive: [
					    {
					      breakpoint: 1340,
					      settings: {
					        slidesToShow: 3
					      }
					    },
					    {
					      breakpoint: 980,
					      settings: {
					        slidesToShow: 2
					      }
					    },
					    {
					      breakpoint: 700,
					      settings: {
					        slidesToShow: 3
					      }
					    },
					    {
					      breakpoint: 430,
					      settings: {
					        slidesToShow: 2
					      }
					    }
					  ]
					});

				});

				initialized = true;

			}

		}

	}


});