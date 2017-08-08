var $JQuery = $.noConflict(true);
/* ---------------------------------------------
*   Header (Logo fade-in)
--------------------------------------------- */
$JQuery(function () {

	var $logo = $JQuery('#header_upper .item_logo');
	var $headerMiddle = $JQuery('#header_middle');
	var headerMiddleOffsetTop = $headerMiddle.offset().top;
	var headerMiddleheight = $JQuery('#header_middle').height();
	var threshold = headerMiddleOffsetTop + headerMiddleheight;

	$JQuery(window).on('scroll', function() {

		var activeClassName = 'skin_active';

		if ($JQuery(this).scrollTop() > threshold) {
			$logo.stop().fadeIn();
		} else {
			$logo.stop().fadeOut();
		}

	});

});



$JQuery(function () {
//マップアラート6秒後に削除
	if($JQuery('.maparea .alert').length){
	  setTimeout(function(){
	       $JQuery('.maparea .alert').hide();
	    },5000);
	}
});


/* ---------------------------------------------
*   Footer (To-top button fade-in)
--------------------------------------------- */
$JQuery(function () {

	var $scope = $JQuery('#totop_footer');
	var $button = $scope.find('.item_totop');

	$button.off('click').on('click', function() {
		$JQuery('html, body').animate({ scrollTop: 0 }, 500, 'swing');
		return false;
	});

	$JQuery(window).on('load', function() {

		$JQuery(this).on('scroll', function() {
			var floatbtnclass = ".floatbtn";
			var floatsp = 0;
			if($JQuery(floatbtnclass).length){
				var floatbtnheigt = $JQuery(floatbtnclass).height();
				if ($JQuery(floatbtnclass).css('display') == 'block') {
					var floatsp = floatbtnheigt;
				} else {
					var floatsp = 0;
				}
			}else{
				var floatsp = 0;
			}
			var scopeOffsetTop = $scope.offset().top;
			var posBottom = parseFloat($button.css('bottom').replace('px', '')) || 0;
			var scopeHeight = $scope.height();
			var scopeBottom = scopeOffsetTop + scopeHeight;
			var threshold = 600;
			var bottomClassName = 'skin_at_bottom';

			var scrollTop = $JQuery(this).scrollTop();
			var windowHeight = $JQuery(this).height();

			if (!(scrollTop > threshold)) {
				$button.stop().fadeOut();
				return;
			}

			$button.stop().fadeIn();

			if (scrollTop + windowHeight >= scopeBottom + posBottom + floatsp) {
				$button.addClass(bottomClassName);
			} else {
				$button.removeClass(bottomClassName);
			}

		});

	});

});



/* ---------------------------------------------
*   click_R
--------------------------------------------- */
$JQuery(function() {

	$JQuery('.click_R').on('click', function(e) {
		var linkmode = true;
		var classnames = e.target.className;
		var classcount = classnames.search(/stop/);

		if(classcount == -1) {
			e.stopPropagation();
			var target = e.target;
			$target = $JQuery(target);

			if($JQuery(target).parent('.stopClick').length > 0) {
				return false;
			};

			if($JQuery(target).parent('.stopc').length > 0) {
				linkmode = false;
			};

			var t2 = $target.attr('href');
			var t2_linktarget = $target.attr('target');

			var t1 = $target.parents('.click_R').find('.click_R_link').attr('href');
			var t1_linktarget = $target.parents('.click_R').find('.click_R_link').attr('target');

			if(typeof t1 === 'undefined') {
				var t1 = $target.find('a').attr('href');
				var t1_linktarget = $target.find('a').attr('target');
			}

			if(typeof t1 === 'undefined') {
				var t1 = $target.parents('.click_R').find('a').attr('href');
				var t1_linktarget = $target.parents('.click_R').find('a').attr('target');
			}

			if(t2) {
				t1=t2;
				if(t2_linktarget) {
					linktarget = t2_linktarget;
				}else{
					linktarget = '_self';
				}
			}else{
				if(t1_linktarget) {
					linktarget = t1_linktarget;
				}else{
					linktarget = '_self';
				}
			}

			if (!$.support.noCloneChecked) {
				var body = document.getElementsByTagName('body')[0];
				var dummyLink = document.createElement('a');
				dummyLink.href = t1;
				body.appendChild(dummyLink);
				dummyLink.target = linktarget;
				dummyLink.click();
				body.removeChild(dummyLink);
				return false;
			} else {
				window.open(t1,linktarget,'');
			}
		}
		// return false;
	});

});


/* ---------------------------------------------
*   画像on,off
--------------------------------------------- */
$JQuery(function() {
	$JQuery('.module_list_library .library_item').hover(function() {
		$JQuery(this).children('.title').children('a').children('img').attr('src', $JQuery(this).children('.title').children('a').children('img').attr('src').replace('_off', '_on'));
	}, function() {
		if (!$JQuery(this).hasClass('currentPage')) {
			$JQuery(this).children('.title').children('a').children('img').attr('src', $JQuery(this).children('.title').children('a').children('img').attr('src').replace('_on', '_off'));
		}
	});
	$JQuery('.module_list_recommend .recommend_item').hover(function() {
		$JQuery(this).children('.subtitle').children('a').children('img').attr('src', $JQuery(this).children('.subtitle').children('a').children('img').attr('src').replace('_off', '_on'));
	}, function() {
		if (!$JQuery(this).hasClass('currentPage')) {
			$JQuery(this).children('.subtitle').children('a').children('img').attr('src', $JQuery(this).children('.subtitle').children('a').children('img').attr('src').replace('_on', '_off'));
		}
	});
	$JQuery('.imgover').hover(function() {
		$JQuery(this).attr('src', $JQuery(this).attr('src').replace('_off', '_on'));
	}, function() {
		if (!$JQuery(this).hasClass('currentPage')) {
			$JQuery(this).attr('src', $JQuery(this).attr('src').replace('_on', '_off'));
		}
	});
});


/* ---------------------------------------------
*   ログインユーザー名　文字数カット
--------------------------------------------- */
$JQuery(function(){
    var $setElm = $JQuery('.skin_before_login li.username');
    var cutFigure = 19; // カットする文字数
    var afterTxt = ' …'; // 文字カット後に表示するテキスト

    $setElm.each(function(){
        var textLength = $JQuery(this).text().length;
        var textTrim = $JQuery(this).text().substr(0,(cutFigure))

        if(cutFigure+2 < textLength) {
            $JQuery(this).html(textTrim + afterTxt).css({visibility:'visible'});
        } else if(cutFigure >= textLength) {
            $JQuery(this).css({visibility:'visible'});
        }
    });
});
