$(window).bind('load',function(){


/* デバイス判定 ---------------------------------------------------------- */
var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());


/* ロールオーバー ---------------------------------------------------------- */
$(function(){
     $("#zoomBannerNav img").hover(function(){
        $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
          }, function(){
             if (!$(this).hasClass('cur')) {
             $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
        }
   });
});



/* 共通 ---------------------------------------------------------- */
var nav = $("#zoomBannerNav li");
var panel = $("#zoomBannerPanel li");
var navAndPanel = $("#zoomBannerNav li,#zoomBannerPanel li");
var getNum = 99;
var getIDNum = 99;

// url取得
var panelURL = [];
panel.each(function(i){
	url = $(this).find("a").attr("href");
	panelURL.push(url);
});

//開く
function zbOpen() {
	
	switch(idname){
		case 'zbPanel-01' :
		case 'zbPanel-02' :
		case 'zbPanel-05' :
		case 'zbPanel-06' : 
			panel.eq(getNum)
			.css({"z-index":8})
			.stop().velocity({ width:381,height:149} , { duration: 200, easing: "easeInOutQuad"});	
			break;
		
		case 'zbPanel-03' :
		case 'zbPanel-04' : 
		case 'zbPanel-07' :
		case 'zbPanel-08' : 
			panel.eq(getNum)
			.css({"z-index":8})
			.stop().velocity({ width:382,height:149} , { duration: 200, easing: "easeInOutQuad"});	
			break;
	}
		
	panel.eq(getNum).find(".zbImg_l")
		.velocity({	opacity:1} , { duration: 0})
		.css({"z-index":100});
		
	$(".zbTtl_l")
		.stop().velocity({ opacity:0} , { duration: 0})
		.css({"z-index":1}); 
};

//閉じる
function zbClose() {			
				
	panel
		.velocity({	width:190,height:104} , { duration: 100, easing: "easeInOutQuad"}).css({"z-index":5});	
		
	panel.find(".zbImg_l")
		.stop().velocity({ opacity:0} , { duration: 0})
		.css({"z-index":1});
		
	$(".zbTtl_l")
		.stop().velocity({ opacity:1} , { duration: 0})
		.css({"z-index":1000});
    
};



/* PC ---------------------------------------------------------- */
if(!_ua.Mobile && !_ua.Tablet) {
	
	//hover処理
	navAndPanel.hover(
	  function () {
		  
		getNum = $(this).index();
		idname = panel.eq(getNum).attr("id");
		
			if(getNum !== getIDNum) {
				
				getID = $(this).attr("id");
				getIDNum = getID.slice(-1) -1;
					
				zbClose();
				zbOpen();
				
			}
			
	  },
	  function () {
		  
			if(getNum !== getIDNum) {
				
				zbClose();
				
			}
	  }
	  
	);
	
	$("#zoomBannerWrap").hover(function(){},function () {
		
		zbClose();
		getIDNum = 99;
		
	});


	//navにもリンク
	for (var i=0; i<getNum; i++) {
		nav.eq(i).wrapInner('<a href="' + panelURL[i] + '"></a>');
	}

}



/* Mobile ---------------------------------------------------------- */
if(_ua.Mobile || _ua.Tablet) {
	
	// aを一旦削除
	$(".zbImg_l").unwrap();
	

	var start = "touchstart";
	var end   = "touchend";	
	
	navAndPanel.bind(end,function(){	
		
		getNum = $(this).index();
		idname = panel.eq(getNum).attr("id");
		
		if (!panel.eq(getNum).hasClass("selected")) {		
		
			//該当のパネルを開いてselected付与、他のパネルを閉じてselected削除
		
			if(getNum !== getIDNum) {
				
				getID = $(this).attr("id");
				getIDNum = getID.slice(-1) -1;
				
				zbClose();
				zbOpen();
				
				panel.removeClass("selected");
				panel.eq(getNum).addClass("selected");
			}
				
	  
		} else {
				//開いている場合はリンク
				switch(idname){
					case 'zbPanel-01' : panel.eq(getNum).wrapInner('<a href="' + panelURL[0] + '"></a>'); break;
					case 'zbPanel-02' : panel.eq(getNum).wrapInner('<a href="' + panelURL[1] + '"></a>'); break;
					case 'zbPanel-03' : panel.eq(getNum).wrapInner('<a href="' + panelURL[2] + '"></a>'); break;
					case 'zbPanel-04' : panel.eq(getNum).wrapInner('<a href="' + panelURL[3] + '"></a>'); break;
					case 'zbPanel-05' : panel.eq(getNum).wrapInner('<a href="' + panelURL[4] + '"></a>'); break;
					case 'zbPanel-06' : panel.eq(getNum).wrapInner('<a href="' + panelURL[5] + '"></a>'); break;
					case 'zbPanel-07' : panel.eq(getNum).wrapInner('<a href="' + panelURL[6] + '"></a>'); break;
					case 'zbPanel-08' : panel.eq(getNum).wrapInner('<a href="' + panelURL[7] + '"></a>'); break;
				}
		}
		
	});
}

});