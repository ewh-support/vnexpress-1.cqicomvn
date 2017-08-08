
// 物件番号から探す
$(function (){
    $("#bukkenno_form").submit(function(e){
        var target = $("#bukkenno_form input[name='lid']");
        var bukken_no = target.val();
        if (bukken_no == '') {
            alert("物件番号を入力してください");
            return false;
        }

        bukken_no = bukken_no.toUpperCase();
        bukken_no = bukken_no.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});

        if (bukken_no.length != 8) {
            alert("物件番号が不正です");
            return false;
        }
        if (!bukken_no.match(/^[A-Z]{1}[A-Z0-9]{7}$/)) {
            alert("物件番号が不正です");
            return false;
        }
        if (bukken_no.match(/^[X]{1}/)) {
            alert("物件番号が不正です");
            return false;
        }
        window.open('/m/?lid='+bukken_no, '_blank');
        e.preventDefault();
        return false;
    });
});

$(function (){
	$().ready(function(){


  // 読み込み後に実行

  	//TOPスライド
//	  var ban, banner;
//
//	  banner = (function() {
//	    var $banner, $btn, $mainImg, $mains, $slide, $thumbBtn, $thumbList, $thumbnailArea, curNum, num, startTop, timer, _this;
//	    function banner() {}
//	    $banner = $('.banner');
//	    $mains = $banner.find('.main');
//	    $mainImg = $banner.find('li.mainimg');
//	    $thumbnailArea = $banner.find('.thumbnail');
//	    $slide = $thumbnailArea.find('.slide_area');
//	    $thumbList = $slide.find('.thumb');
//	    $thumbBtn = $thumbList.find('a');
//	    $btn = $thumbnailArea.find('.btn');
//
//	    random = true;
//	    timer = null;
//	    _this = banner;
//	    num = 0;
//	    curNum = 0;
//	    startTop = 60;
//	    baseheight = 56;
//	    slide_speed = 5000;
//	    thumb_speed = 400;
//
//	    if(random){
//	    slidelength = $('.slide_area .thumb').length;
//	    curNum = Math.floor( Math.random()*slidelength );
//	    }
//
//	    banner.prototype.init = function() {
//	      var sort;
//	      $mainImg.hide();
//	      $mainImg.eq(curNum).show();
//	      $thumbList.css({
//	        'position': 'absolute'
//	      });
//	      $.map($thumbList, function(thumb, i) {
//	        var $thumb, top;
//	        $thumb = $(thumb);
//	        top = startTop + (baseheight * i);
//	        if (i === 0) {
//	          top = startTop;
//	        } else if (i === $thumbList.length - 1) {
//	          top = 5;
//	        }
//	        $thumb.css({
//	          'position': 'absolute',
//	          'top': top
//	        });
//	        $thumb.attr('id', '' + i);
//	      });
//	      sort = $thumbList.sort(function(a, b) {
//	        if (parseInt($(a).css('top')) > parseInt($(b).css('top'))) {
//
//	          return 1;
//	        } else {
//	          return -1;
//	        }
//	      });
//	      $slide.empty();
//	      $slide.append(sort);
//	      this.setEvent();
//
//	      this.startTimer();
//	      $slide.find('.thumb').eq(1).addClass("active");
//	      for (var is=0; is<curNum; is++) {
//	      this.thumbMoves();
//	      }
//
//	    };
//
//	    banner.prototype.setEvent = function() {
//	      $thumbList.bind('click', $.proxy(this.changeMain, this));
//	      $btn.eq(0).bind('click', $.proxy(this.up, this));
//	      $btn.eq(1).bind('click', $.proxy(this.down, this));
//	      $mains.bind('mouseover', $.proxy(this.endTimer, this));
//	      $mains.bind('mouseout', $.proxy(this.startTimer, this));
//	    };
//
//	    banner.prototype.unsetEvent = function() {
//	      $thumbList.unbind('click', $.proxy(this.changeMain, this));
//	      $btn.eq(0).unbind('click', $.proxy(this.up, this));
//	      $btn.eq(1).unbind('click', $.proxy(this.down, this));
//	    };
//
//	    banner.prototype.changeMain = function(e) {
//	      var top;
//	      top = parseInt($(e.currentTarget).css('top'), 10);
//	      if (top > 56) {
//	        this.up();
//	      } else {
//	        this.down();
//	      }
//	    };
//
//	    banner.prototype.startTimer = function() {
//	      var _this = this;
//	      this.endTimer();
//	      timer = setInterval(function() {
//	        return _this.up();
//	      }, slide_speed);
//	    };
//
//	    banner.prototype.endTimer = function() {
//	      clearInterval(timer);
//	    };
//
//	    banner.prototype.thumbMove = function(flag, num) {
//	      var count, last, top;
//	      if ($thumbList.queue("fx").length > 0) {
//	        return;
//	      }
//	      top = baseheight;
//	      count = 0;
//	      if (flag === 'down') {
//	        top = '+=' + top;
//	        $slide.find('.thumb:last').clone().prependTo($slide).css({
//	          'top': -52
//	        });
//	        $slide.find('.thumb').animate({
//	          top: top
//	        }, thumb_speed, 'swing', function() {
//	          if (count !== 0) {
//	            return;
//	          }
//	          $slide.find('.thumb:last').remove();
//	          count++;
//	        });
//	      } else {
//	        top = '-=' + top;
//	        last = parseInt($slide.find('.thumb:last').css('top'), 10) + baseheight;
//	        $slide.find('.thumb:first').clone().appendTo($slide).css({
//	          'top': last
//	        });
//	        $slide.find('.thumb').animate({
//	          top: top
//	        }, thumb_speed, 'swing', function() {
//	          if (count !== 0) {
//	            return;
//	          }
//	          $slide.find('.thumb:first').remove();
//	          count++;
//	        });
//	      }
//	      this.show(num);
//	      $thumbList = $slide.find('.thumb');
//	      this.unsetEvent();
//	      this.setEvent();
//	      this.startTimer();
//	      $slide.find('.thumb').removeClass("active");
//	      setTimeout( function () {
//	      $slide.find('.thumb').eq(1).addClass("active");
//		} , thumb_speed+100 );
//	    };
//
//	    banner.prototype.thumbMoves = function() {
//	      var count, last, top;
//	      if ($thumbList.queue("fx").length > 0) {
//	        return;
//	      }
//	      top = baseheight;
//	      count =0;
//	        top = '-=' + top;
//	        last = parseInt($slide.find('.thumb:last').css('top'), 10) + baseheight;
//	        $slide.find('.thumb:first').clone().appendTo($slide).css({
//	          'top': last
//	        });
//	        $slide.find('.thumb').animate({
//	          top: top
//	        }, 0, 'swing', function() {
//	          if (count !== 0) {
//	            return;
//	          }
//	          $slide.find('.thumb:first').remove();
//	          count++;
//	        });
//	      $thumbList = $slide.find('.thumb');
//	      $slide.find('.thumb').removeClass("active");
//	      $slide.find('.thumb').eq(1).addClass("active");
//	    };
//
//	    banner.prototype.up = function() {
//
//	      var upNum;
//	      upNum = curNum + 1;
//	      if (upNum >= $mainImg.length) {
//	        upNum = 0;
//	      }
//	      this.thumbMove('up', upNum);
//	    };
//
//	    banner.prototype.down = function() {
//	      var downNum;
//	      downNum = curNum - 1;
//	      if (downNum < 0) {
//	        downNum = $mainImg.length - 1;
//	      }
//	      this.thumbMove('down', downNum);
//	    };
//
//	    banner.prototype.show = function(index) {
//	      $mainImg.eq(curNum).fadeOut(thumb_speed);
//	      $mainImg.eq(index).fadeIn(thumb_speed);
//	      curNum = index;
//	    };
//
//	    return banner;
//
//	  })();
//
//	  $(window).load(function(){
//	    ban = new banner();
//	    ban.init();
//	  })
//
    });

});



$(function() {

	$().ready(function(){
  // 読み込み後に実行


         $('#image001_01').bind({
		    'mouseenter':function(){
		    	$("#image001").css("background","url(/images/rn_top/slide/01/slide_01_02.jpg)");
		    },
		    'mouseleave':function(){
		    	$("#image001").css("background","url(/images/rn_top/slide/01/slide_01.jpg)");
		    }
		});

         $('#image001_02').bind({
		    'mouseenter':function(){
		    	$("#image001").css("background","url(/images/rn_top/slide/01/slide_01_01.jpg)");
		    },
		    'mouseleave':function(){
		    	$("#image001").css("background","url(/images/rn_top/slide/01/slide_01.jpg)");
		    }
		});

         $('#image002 dt p').bind({
		    'mouseenter':function(){
		    	$("#image002 dt p").removeClass('active');
		    	$(this).addClass('active');
		    },
		    'mouseleave':function(){
		    }
		});

         $('#image003').bind({
		    'mouseenter':function(){
		    	$(this).addClass('on');
		    },
		    'mouseleave':function(){
		    	$(this).removeClass('on');
		    }
		});

		 $('#image004 dt p').bind({
		    'mouseenter':function(){
		    	$("#image004 dt p").removeClass('active');
		    	$(this).addClass('active');
		    },
		    'mouseleave':function(){
		    }
		});

         $('.click_Row').bind({
		    'click':function(e){
			var classnames = e.target.className;
			var classcount = classnames.search(/stop/);
			if(classcount == -1){
				e.stopPropagation();
				var target = e.target;
				$target = $(target);
				if($(target).parent(".stopClick").length>0) return false;
				var t2 = $target.attr('href');
				var t2_linktarget = $target.attr('target');
				if(!t2){
				var t2 = $target.parent().attr('href');
				var t2_linktarget = $target.parent().attr('target');
				}

					var t1 =$(this).children('a').attr('href');
					var t1_linktarget =$(this).children('a').attr('target');

				var t3 = $target.parents('.click_Row').find('a').attr('href');
				var t3_linktarget = $target.parents('.click_Row').find('a').attr('target');

				if(t1){}else{
				t1=t3;
				t1_linktarget=t3_linktarget;
				}

				if(t2){
					t1=t2;
					if(t2_linktarget){
					linktarget= t2_linktarget;
					}else{
					linktarget= "_self";
					}
				}else{
					if(t1_linktarget){
					linktarget= t1_linktarget;
					}else{
					linktarget= "_self";
					}
				}

				window.open(t1,linktarget,"");
			}
			return false;
		    },
		    'mouseenter':function(){
		    	$(this).addClass('on');
		    },
		    'mouseleave':function(){
		    	$(this).removeClass('on');
		    }
		});

    });
})
/* *
 * jquery.tgImageChange
 * for jQuery 1.8.1
 */
;(function($){
	$.fn.tgImageChange = function(options){
		var opts = $.extend({}, $.fn.tgImageChange.defaults, options);

		$(opts.selectorThumb).mouseover(function(){
			var selectedSrc = $(this).attr('data-img').replace(/^(.+)_thumb(\.gif|\.jpg|\.png+)$/, "$1"+"$2");
			// メイン画像入れ替え
			$(opts.selectorMain).stop().fadeOut(opts.fadeOutTime,
				function(){
					$(opts.selectorMain).attr('src', selectedSrc);
					$(opts.selectorMain).stop().fadeIn(opts.fadeInTime);
				}
			);
			// サムネイルの枠を変更
			$(this).css({"border":opts.thumbCssBorder});
		});

		// マウスアウトでサムネイル枠もとに戻す
		$(opts.selectorThumb).mouseout(function(){
			$(this).css({"border":""});
		});
	}

	// default option
	$.fn.tgImageChange.defaults = {
		selectorMain : '.mainImages',					// メイン画像セレクタ
		selectorThumb : '.slidethumbs',							// サムネイル画像セレクタ
		fadeOutTime : 0,											// カーソルON時のアニメーション時間
		fadeInTime : 0,											// カーソルOFF時のアニメーション時間
		thumbCssBorder : '0'	// カーソルON時のサムネイル枠CSS
	}
})(jQuery);



/*==============================================================

	プラグイン実行
	オプション設定

	▼ここから変更OK

==============================================================*/

$(function (){

	//対象のクラスorID
	$("img.imgovers,input.imgovers").imageOverChange({

		// 透過アニメーション設定（false/true）
		animate: false,

		// 透過度(0～0.1)
		animateOpacity: 0.4,

		// 透過スピード（ミリ秒）
		animateSpeed: 800,

		// 追加するホバーイメージ名
		hoverImage: "_on"

	});

});

//autoHeight==========================================================================================

$(function(){
    $('#list ul').autoHeight();
	$('#oyakudachi .info_item').autoHeight();
});

$(function(){
	$(".selection_Area .title").autoHeight();
    $(".selection_Area .sub").autoHeight();
});

$(function(){
	$(".nomura_n_Area .title").autoHeight();
	$(".nomura_n_Area .price").autoHeight();
    $(".nomura_n_Area .sub").autoHeight();
});

//一覧ボタンIE角丸==========================================================================================

$(function()
{
  $('div.link a').each(function()
  {
	if(!jQuery.support.opacity){
    PIE.attach(this);
	}
  });
});
