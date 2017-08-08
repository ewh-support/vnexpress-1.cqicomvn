/* ---------------------------------------------
*   Keyvisual (Carousel)
--------------------------------------------- */
$(function () {

	var $carousel = $('#keyvisual .item_slides');
	var slideWidth = 950;


$(window).load(function () {
    // 実行したい処理
	// init carousel
	$('.item_slide').show();
	$carousel.bxSlider({
		auto: true,
		pause: 5000,
		speed: 500,
		slideWidth: slideWidth,
		onSliderLoad: onSliderLoad,
                randomStart: true,
		preloadImages: 'all'
	});
		
});

	function onSliderLoad() {

		var $bxWrapper = $carousel.closest('.bx-wrapper');
		var $bxViewport = $bxWrapper.children('.bx-viewport');
		var halfOfslideWidth = (slideWidth / 2);

		// set carousel styles
		$carousel.css({
			'overflow': 'visible'
		});

		$bxViewport.css({
			'left': '50%',
			'margin-left': -halfOfslideWidth + 'px',
			'width': $carousel.width() + 'px',
			'overflow': 'visible'
		});

		$bxWrapper.css({
			'max-width': 'none',
		});

		// Set overlay on carousel
		$('<div>')
		.prependTo($bxWrapper)
		.addClass('item_overlay skin_left')
		.css({ 'margin-right': halfOfslideWidth + 'px' })
		.on('click', function() {
			return false;
		});

		$('<div>')
		.appendTo($bxWrapper)
		.addClass('item_overlay skin_right')
		.css({ 'margin-left': halfOfslideWidth + 'px' })
		.on('click', function() {
			return false;
		});

	}

});



/* ---------------------------------------------
*   Keyvisual (Change thumbnail on hover)
--------------------------------------------- */
$(function () {

	var $triggerScope = $('#keyvisual .js_thumbnail_sync_trigger');
	var $trigger = $triggerScope.children();

	var $targetScope = $('#keyvisual .js_thumbnail_sync_target');
	var $target = $targetScope.children();

	$trigger.on('mouseenter', function() {

		var index = $(this).index();
		var $currentTarget = $target.eq(index);
		var hoverClassName = 'skin_hover';

		$target.removeClass(hoverClassName);
		$currentTarget.addClass(hoverClassName);

	});

});

$(function () {

	var $triggerScope = $('#keyvisual .js_thumbnail_sync_trigger2');
	var $trigger = $triggerScope.children();

	var $targetScope = $('#keyvisual .js_thumbnail_sync_target2');
	var $target = $targetScope.children();

	$trigger.on('mouseenter', function() {

		var index = $(this).index();
		var $currentTarget = $target.eq(index);
		var hoverClassName = 'skin_hover';

		$target.removeClass(hoverClassName);
		$currentTarget.addClass(hoverClassName);

	});

});

/* ---------------------------------------------
*   AutoHeight
--------------------------------------------- */

$(function(){
	$('.oyakudachi .box').autoHeight(); 
	$('.oyakudachi ul.link').autoHeight(); 
});









