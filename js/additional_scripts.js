(function($){

	$(window).on("load",function(){

		$(".scroll").mCustomScrollbar();

	});

})(jQuery);

$(document).ready(function() {

	var sliderAppendDots;
	var initDots;

	if( $(".promo-backgrounds-slider").length > 0 ) {
		
		$(".promo-backgrounds-slider").not(".slick-initialized").slick({
	      dots: false,
	      arrows: false,
	      // autoplay: true,
	      autoplaySpeed: 3000,
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

			// var sliderParent = $(this).closest(".articles_slider_block");

			var sliderName = $(this).attr("data-slider");

			var countSlides = $(this).find(".slide").length;

			var sliderAppendArrows = $(".slider-pagination .append-arrows[data-slider = '"+ sliderName +"']");

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

				var slideCurrent = $(this).find(".slick-current").attr("data-slick-index");

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .total-slides").text(countSlides);

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+slideCurrent + 1);

			}

		});

		$(".articles_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			var sliderName = $(this).attr("data-slider");

			$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+nextSlide + 1);

		});

		$(".inner_slider, .news-slider-inner").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			return false;

		});

		if($(".range-pagination .slick-dots").length > 0) {

			$(".range-pagination .slick-dots").each(function() {

				var dotsItemsParent = $(this).closest(".range-pagination");

				var dotsItems = $(this).find("li");

				var startYear = parseInt( dotsItemsParent.attr("data-start") );

				dotsItems.each(function() {

					$(this).attr("data-year", startYear++);

					var itemYear = $(this).attr("data-year");

					$(this).prepend("<span class='item-year'>"+ itemYear +"</span>");

				});

			});

		}

	}


	if($(".inner_slider").length > 0) {

		$(".inner_slider").each(function() {

			var bigSlider = $(this).find(".article-inner-slider");

			var sliderName = $(this).attr("data-slider");

			var sliderAppendArrows = $(".append-arrows[data-slider = '"+ sliderName +"']");

			var miniaturesSlider = $(this).find(".article-inner-miniatures-slider");

			bigSlider.not(".slick-initialized").slick({
				dots: false,
				arrows: false,
				// autoplay: true,
				draggable : false,
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
				asNavFor : bigSlider
			});

		});

	}

	if($(".news-big-slider").length > 0) {

		$(".news-big-slider").each(function() {

			var sliderName = $(this).attr("data-slider");

			var sliderAppendArrows = $(".append-arrows[data-slider = '"+ sliderName +"']");

			var miniatureSlider = $(".news-miniatures-slider[data-slider = '"+ sliderName +"']");

			var countSlides = $(this).find(".slide").length;

			$(this).not(".slick-initialized").slick({
				dots: false,
				arrows: true,
				// autoplay: true,
				// draggable : false,
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
				asNavFor : $(".news-big-slider")
			});

			if( $(this).not(".slick-initialized") ) {

				var slideCurrent = $(this).find(".slick-current").attr("data-slick-index");

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .total-slides").text(countSlides);

				$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+slideCurrent + 1);

			}

		});

		$(".news-big-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			var sliderName = $(this).attr("data-slider");

			$(".count-slides-block[data-slider = '"+ sliderName +"'] .current-slide").text(+nextSlide + 1);

		});

		$(".news-slider-inner").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			return false;

		});

	}

	if($(".news-slider-inner").length > 0) {

		$(".news-slider-inner").each(function() {

			var sliderName = $(this).attr("data-inner-slider");

			var sliderAppendArrows = $(".news-inner-arrows[data-inner-slider = '"+ sliderName  +"']");

			$(this).not(".slick-initialized").slick({
				dots: false,
				arrows: true,
				// autoplay: true,
				// draggable : false,
				// autoplaySpeed: 10000,
				speed: 1200,
				slidesToShow: 1,
				fade: true,
				appendArrows: sliderAppendArrows
			});

		});


	}


});