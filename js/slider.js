"use strict"

$(document).ready(function() {

		var countSlides;

		var minOffsetLeftVal = 0;
		var minOpacityVal = .1;
		var minScaleVal = .4;

		var maxOffsetLeftVal = 50;
		var maxOpacityVal = 1;
		var maxScaleVal = 1;

		var stepLeft;
		var stepOpacity;
		var stepScale;

		var leftPosition;
		var scaleVal;
		var opacityVal;

		var zIndexVal;
		var indexSlide = 0;

		// ----------------------------------

		var sliderName;
		var controlsParent;
		var srcAttrVideo;

		// ----------------------------------

		var indexSlideAttr;
		var slideParent;

		// ----------------------------------

		var slideInfo;
		var slideIndex;

		// ------------------------------------

		$(function() {

			$(".gallery-slider").each(function() {

				sliderName = $(this).attr("data-slider-name");

				getStyleParameters(sliderName);

				getSlideInfo(sliderName);

				$("[data-slider-name = '" + sliderName + "'] .gallery-pagination-content .count-slides").text(countSlides);

			});

		});

		// ------------------------------------


	$(".gallery-arrow.next").click(function() {

		controlsParent = $(this).closest(".gallery-pagination");

		sliderName = controlsParent.attr("data-slider-name");

		nextSlide(sliderName);

	});

	$(".gallery-arrow.prev").click(function() {

		controlsParent = $(this).closest(".gallery-pagination");

		sliderName = controlsParent.attr("data-slider-name");

		prevSlide(sliderName);

	});

	// ------------------------------------

	$(function() {

		// var indexSlideAttr;

		// $(".gallery-slider .slide").click(function() {

		// 	slideParent = $(this).parent($(".gallery-slider"));

		// 	sliderName = slideParent.attr("data-slider-name");

		// 	indexSlideAttr = $(this).attr("data-index");

		// 	$(".gallery-slide-photos[data-slider-name = '" + sliderName + "']").fadeIn(300);

		// 	$(".gallery-slide-photos[data-slider-name = '" + sliderName + "'] .slide-photos[data-slide-index = '"+ indexSlideAttr +"']").fadeIn(300);

		// });

		// $(".gallery-slide-photos-bg, .close-gallery-slide-btn").click(function() {
		// 	$(".gallery-slide-photos").fadeOut(300);
		// 	$(".gallery-slide-photos .slide-photos[data-slide-index = '"+ indexSlideAttr +"']").fadeOut(300);

		// 	srcAttrVideo = $(".video-slide iframe").attr("src");

  //           $(".video-slide iframe").attr("src", srcAttrVideo + "?enablejsapi=1");

  //           document.getElementById('video').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

  //           $(".video-slide iframe").attr("src", srcAttrVideo);

		// });

    //     $(this).keydown(function(eventObject){
    //         if (eventObject.which == 27) {                
    //         	$(".gallery-slide-photos").fadeOut(300);
				// $(".gallery-slide-photos .slide-photos[data-slide-index = '"+ indexSlideAttr +"']").fadeOut(300);

    //          }
    //     });

	});

	// ------------------------------------

	function nextSlide(sliderName) {

		slideParent = $( "[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +")").parent($(".gallery-slider"));

		$( "[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +")").animate({"opacity" : .01 }, 400);		

		setTimeout(function() {

			$( "[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +")").appendTo(slideParent);

		}, 400);

		setTimeout(function() {

			getStyleParameters(sliderName);
			
		}, 400);

		setTimeout(function() {

			$( "[data-slider-name = '" + sliderName + "'] .slide:eq("+ ( countSlides - 1 ) +")").animate({
				"opacity" : maxOpacityVal
			}, 400);

			getSlideInfo(sliderName);

		}, 500);		

	}

	function prevSlide(sliderName) {

		slideParent = $( "[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +")").parent($(".gallery-slider"));

		$("[data-slider-name = '" + sliderName + "'] .slide:eq("+ ( countSlides - 1 ) +")").animate({"opacity" : .01 }, 400);		

		setTimeout(function() {			

			$("[data-slider-name = '" + sliderName + "'] .slide:eq("+ ( countSlides - 1 ) +")").prependTo(slideParent);

		}, 400);

		setTimeout(function() {

			getStyleParameters(sliderName);

			$("[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +")").animate({"opacity" : 1}, 400);

			getSlideInfo(sliderName);

		}, 400);

	}

	function getStyleParameters(sliderName) {

		countSlides = $("[data-slider-name = '" + sliderName + "'] .slide").length;

		stepLeft = ( maxOffsetLeftVal - minOffsetLeftVal ) / countSlides;
		stepOpacity = ( maxOpacityVal - minOpacityVal ) / countSlides;
		stepScale = ( maxScaleVal - minScaleVal ) / countSlides;

		leftPosition = minOffsetLeftVal;
		scaleVal = maxScaleVal;
		opacityVal = maxOpacityVal;
		zIndexVal = countSlides;

		for( indexSlide = 0; indexSlide <= countSlides - 1; indexSlide++) {

			$("[data-slider-name = '" + sliderName + "'] .slide:eq("+ indexSlide +")").css({
				"left" : leftPosition + "%",
				"transform" : "scale("+ scaleVal + ")",
				"z-index" : zIndexVal
			});

			$("[data-slider-name = '" + sliderName + "'] .slide:eq("+ indexSlide +") .img-box").css({
				"opacity" : opacityVal
			});		

			leftPosition += stepLeft;
			scaleVal -= stepScale;
			opacityVal -= stepOpacity;
			zIndexVal--;

		}

	}

	function getSlideInfo(sliderName) {

		slideInfo = $("[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +") .slide-info").html();
		slideIndex = $("[data-slider-name = '" + sliderName + "'] .slide:eq("+ 0 +")").attr("data-index");

		$(".slide-info-append[data-slider-name = '" + sliderName + "']").animate({
			"opacity" : 0
		}, 200);

		setTimeout(function() {

			$(".slide-info-append[data-slider-name = '" + sliderName + "']").html(slideInfo);

		}, 300);

		$(".slide-info-append[data-slider-name = '" + sliderName + "']").animate({
			"opacity" : 1
		}, 200);

		$("[data-slider-name = '" + sliderName + "'] .current-slide").text(slideIndex);

	}

});