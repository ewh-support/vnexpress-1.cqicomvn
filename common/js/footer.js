try {jQuery.trim('');} catch (e) {document.write('<script type="text/javascript" src="/common/js/jquery-1.9.1.min.js"></scri'+'pt>');}
jQuery(function(){
     var elem = jQuery(".footer-top"), //表示の操作をするオブジェクト(フッター)
               elem_base = jQuery("#pagetopInner"), //表示を変更する基準となるオブジェクト
               content = jQuery("#footer"), //表示を変更する基準となるオブジェクト
               win = jQuery(window); //windowオブジェクト

     var contentTop = 0; //表示変更をする基準点

     win
          .load(function(){
               updatePosition();
               update();
          })
          .resize(function(){
               updatePosition();
               update();
          })
          .scroll(function(){
               update();
          });

     // HTMLが動的に変わることを考えて、contentTopを最新の状態に更新します
     function updatePosition(){
          contentTop = content.offset().top;
     }

     // スクロールのたびにチェック
     function update(){
			jQuery('#set_wide').val(win.scrollTop() + win.height());
          // 現在のスクロール位置 + 画面の高さで画面下の位置を求めます
          if( win.scrollTop() + win.height() > contentTop ){
      //         elem_base.addClass("static_base");
               elem.addClass("static");
      //         elem.css('position','static');
          }else if( elem.hasClass("static") ){
        //       elem_base.removeClass("static_base");
               elem.removeClass("static");
       	//		 jQuery('.footer-top').exFixed(); // for IE6
          }else{
       	//		 jQuery('.footer-top').exFixed(); // for IE6
          
          
          }
     }
     
     //IE6
     	var ua = navigator.userAgent;
		var isIE = ua.match(/msie/i);
		    isIE6 = ua.match(/msie [6.]/i);
    if (isIE6) {
               elem.css('position','absolute');
               elem.css('width','950px');
    }
});

jQuery(function(){
	var pageTop = jQuery('.footer-top');
	pageTop.hide();
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 600) {
			pageTop.fadeIn();
		} else {
			pageTop.fadeOut();
		}
	});
    pageTop.click(function () {
		jQuery('body, html').animate({scrollTop:0}, 500, 'swing');
		return false;
    });
});

//provisional
jQuery(function(){
    jQuery("div[class!='footer-inner-img'] > a[href='\\#top']").hide();
    jQuery("div#pageTop > a[href='\\#top']").hide();
    jQuery("a[href='\\#page_top']").hide();
});
