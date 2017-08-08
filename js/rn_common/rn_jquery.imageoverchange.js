/* ============================================================

	hoverImageChange
	ver1.1   2011.3
	
	オンマウス、マウスアウトで画像切り替え
	
	※設定は一番下

==============================================================*/

(function($) {
	$.fn.imageOverChange = function(options) {
		// elementに格納
		var element = $(this);
		
		// 初期オプション
		var conf = $.extend({
			// アニメーション設定 false or true
			animate: false,
			animateOpacity: 0.4,
			animateSpeed: 800,
			// 追加するホバーイメージ名
			hoverImage: "_on",
			// キャンセルクラス
			changeCance: "activeImg"
		}, options);
		
		element.each(function(){
			var thisSrc = this.src;
			
			// ON画像プリロード
			if(thisSrc.indexOf("_off.") > 1){
				var hoverSrc = thisSrc.replace("_off.",conf.hoverImage+'.');
				var preloadImages = $("<img>").attr("src", hoverSrc);
			}else {
				var hoverSrc = thisSrc.replace(/^(.+)(\.[a-z]+)$/, "$1"+ conf.hoverImage + "$2");
			}			

			// ホバー処理
			$(this).hover(function(){
				if(!$(this).hasClass(conf.changeCance)){
					$(this).attr("src",hoverSrc);
				}
				if(conf.animate) {
					$(this).stop().animate({opacity: conf.animateOpacity}, 0).animate({opacity: 1}, conf.animateSpeed);
				}
			},function (){
				if(!$(this).hasClass(conf.changeCance)){
					$(this).attr("src",thisSrc);
				}
			});
		});
		return this;
	}
})(jQuery);


/*==============================================================

	プラグイン実行
	オプション設定

	▼ここから変更OK

==============================================================*/

$(function (){
			
	//対象のクラスorID
	$("img.imgover,input.imgover").imageOverChange({ 
												   
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
