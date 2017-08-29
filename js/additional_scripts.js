(function($){

	$(window).on("load",function(){

		$(".scroll").mCustomScrollbar();

	});

})(jQuery);

$(document).ready(function() {

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

			var sliderParent = $(this).closest(".articles_slider_block");

			var sliderName = $(this).attr("data-slider");

			var countSlides = $(this).find(".slide").length;

			var sliderAppendArrows = $(".slider-pagination[data-slider = '"+ sliderName +"'] .append-arrows");

			$(this).not(".slick-initialized").slick({
				dots: false,
				arrows: true,
				appendArrows : sliderAppendArrows,
				// autoplay: true,
				autoplaySpeed: 10000,
				speed: 1200,
				slidesToShow: 1,
				fade: true
			});

			if( $(this).not(".slick-initialized") ) {

				var slideCurrent = sliderParent.find(".slick-current").attr("data-slick-index");

				$(".slider-pagination[data-slider = '"+ sliderName +"'] .total-slides").text(countSlides);

				$(".slider-pagination[data-slider = '"+ sliderName +"'] .current-slide").text(+slideCurrent + 1);

			}

		});

		$(".articles_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			var sliderName = $(this).attr("data-slider");

			$(".slider-pagination[data-slider = '"+ sliderName +"'] .current-slide").text(+nextSlide + 1);

		});

		$(".inner_slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			return false;

		});

	}


	if($(".inner_slider").length > 0) {

		$(".inner_slider").each(function() {

			var bigSlider = $(this).find(".article-inner-slider");

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
				focusOnSelect: true,
				asNavFor : bigSlider
			});

		});

	}

});