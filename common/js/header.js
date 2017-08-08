if($JQuery == undefined) {
var $JQuery = $.noConflict(true);
}else {
var $JQuery = $JQuery.noConflict(true);
}

try {$JQuery.trim('');} catch (e) {document.write('<script type="text/javascript" src="/common/js/jquery-1.9.1.min.js"></scri'+'pt>');}
try {jQuery.cookie('');} catch (e) {document.write('<script type="text/javascript" src="/common/js/jquery.cookie.js"></scri'+'pt>');}

var bukken_class;
var useful_bukken_class;
var directory;

window.onload = function(){
	initialize();
	scrollNavi();
	activateNavi();
	getFavoriteCount();
	getHistoryCount();
	setAutoLoginTag();
	getFavoriteCountRN();
	getHistoryCountRN();
};

function scrollNavi() {
	$JQuery(document).ready(function(){
		var nav = $JQuery('#headerMenu3');

        // SP版など対象が存在しない場合は処理なし
        if (nav.length < 1) return;

        var headernav = $JQuery('#headerhide'),
					offset = nav.offset();
		$JQuery(window).scroll(function () {
			if($JQuery(window).scrollTop() > offset.top - 0) {
				nav.addClass('fixed');
				headernav.addClass('headerHeight');
				$JQuery("#headerMenu3").removeClass('hide');
				$JQuery(".headerInLogo").fadeIn("slow");;
				$JQuery("#headerLine").hide();
				$JQuery("#headerMenu1").hide();
				$JQuery("#headerMenu2").hide();
			} else {
				nav.removeClass('fixed');
				headernav.removeClass('headerHeight');
				$JQuery("#headerMenu3").addClass('hide');
				$JQuery(".headerInLogo").fadeOut("slow");;
				$JQuery("#headerLine").show();
				$JQuery("#headerMenu1").show();
				$JQuery("#headerMenu2").show();
			}
		});
	});
}

function isLogined() {
	var member_name;
	try {
		member_name = $JQuery.ajax({
			url: "/header/getusername.php?time="+Date.parse(new Date()),
			async: false,
			cache: false
		}).responseText;
	} catch (e) {
		if(window.XMLHttpRequest) {
			xmlhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				xmlhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xmlhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {

				}
			}
		}

		if (xmlhr) {
			xmlhr.open("GET", "/header/getusername.php?time="+Date.parse(new Date()), false);
			xmlhr.send(null);
			member_name = xmlhr.responseText;
		}
	}

	var hostname_s = "https://"+location.hostname+"/";
	if (member_name == "") {
		document.write('<li class="nav2"><a href="' + hostname_s + 'index/module/Member/action/LoginInput">ログイン</a></li>');
		document.write('<li class="nav1"><a href="/members/">会員登録</a></li>');
	} else {
		document.write('<li class="nav2"><a href="' + hostname_s + 'index/module/MyPage/action/MyPage">マイページへ</a></li>');
		document.write('<li class="nav1">ようこそ！' + member_name + 'さま。</li>');
	}
	return;
}

function getFavoriteCount() {
	var favorite_count = 0;

	var favorite = jQuery.cookie('favorite_bukken');
	if (favorite != null && favorite != undefined) {
		if (favorite.substr(-1) == ',') favorite = favorite.slice(0, -1);
		favorite_count = favorite.split(',').length;
	}

	if (favorite_count == 0) {
		$JQuery("#favorite_count").hide();
	} else {
		$JQuery("#favorite_count").text(favorite_count+'件');
	}
}

function getHistoryCount() {
	var history_count = 0;

	var history = jQuery.cookie('browse_history');
	if (history != null && history != undefined) {
		if (history.substr(-1) == ',') history = history.slice(0, -1);
		history_count = history.split(',').length;
	}

	if (history_count == 0) {
		$JQuery("#history_count").hide();
	} else {
		$JQuery("#history_count").text(history_count+'件');
	}
}

function activateNavi() {
	if ($JQuery("div#headerMenu2Inner > ul").hasClass('menu_osaka')) {
	if (directory == 'seller') {
		$JQuery('li.nav8 a').addClass('active');
	}
	if (location.pathname.indexOf('/house/') == 0) {
		$JQuery('li.nav4 a').addClass('active');
	}
	} else {
	if (directory == 'seller') {
		$JQuery('li.nav8 a').addClass('active');
	}
	}
}

function initialize() {
	var url = location.pathname;
	if (url.indexOf('/mansion/') == 0) {
		directory = 'mansion';
		bukken_class = 'mansion';
		useful_bukken_class = 'mansion';
	} else if (url.indexOf('/house/') == 0) {
		directory = 'house';
		bukken_class = 'house';
		useful_bukken_class = 'used_house';
	} else if (url.indexOf('/house_n/') == 0) {
		directory = 'house_n';
		bukken_class = 'house_n';
		useful_bukken_class = 'new_house';
	} else if (url.indexOf('/land/')  == 0) {
		directory = 'land';
		bukken_class = 'land';
		useful_bukken_class = 'land';
	} else if (url.indexOf('/mansion_n/')  == 0) {
		directory = 'mansion_n';
	} else if (url.indexOf('/seller/')  == 0) {
		directory = 'seller';
	} else {
		bukken_class = $JQuery(':input[name="bukken_class_name"]').val();
		directory = bukken_class;
	}
	var hostname_p = "http://"+location.hostname;
	$JQuery("#history_anchor").attr('href', hostname_p+'/useful/index/type/'+ ((useful_bukken_class !== undefined) ? useful_bukken_class : 'mansion') +'_history/');
	$JQuery("#favorite_anchor").attr('href', hostname_p+'/favorite_list/index/type/'+ ((useful_bukken_class !== undefined) ? useful_bukken_class : 'mansion') +'_favorite/');
    $JQuery("#switch_top").click(function() {
        jQuery.cookie('disp_kansai_top', '', {path: '/'});
        jQuery.cookie('disp_tokai_top', '', {path: '/'});
        return true;
    });
    $JQuery("#switch_kansai_top").click(function() {
        jQuery.cookie('disp_tokai_top', '', {path: '/'});
        return true;
    });
    $JQuery("#switch_tokai_top").click(function() {
        jQuery.cookie('disp_kansai_top', '', {path: '/'});
        return true;
    });
}

function addOnloadEvent(fnc) {
	if (typeof window.addEventListener != 'undefined') {
		window.addEventListener('load', fnc, false );
	} else if (typeof window.attachEvent != 'undefined') {
		window.attachEvent('onload', fnc);
	}
}

function setAutoLoginTag() {

	var dim = jQuery.cookie('dim');
	if (dim != null && dim != undefined) {
		// 自動ログイン中は、GoogleAnalytics用タグを出力
		var ga = document.createElement("script");
		ga.setAttribute("type", "text/javascript");
		ga.innerHTML = "\n/* <![CDATA[ */\n" +
					   "var isMember = true;\n" +
					   "/* ]]> */\n";
		document.getElementsByTagName("head")[0].appendChild(ga);

	}

}

function isLoginedRN() {
	var member_name;
	try {
		member_name = $JQuery.ajax({
			url: "/header/getusername.php?time="+Date.parse(new Date()),
			async: false,
			cache: false
		}).responseText;
	} catch (e) {
		if(window.XMLHttpRequest) {
			xmlhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				xmlhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xmlhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {

				}
			}
		}

		if (xmlhr) {
			xmlhr.open("GET", "/header/getusername.php?time="+Date.parse(new Date()), false);
			xmlhr.send(null);
			member_name = xmlhr.responseText;
		}
	}

	var hostname_s = "https://"+location.hostname+"/";
	if (member_name == "") {
		document.write('<li class="item_link skin_login"> <a href="' + hostname_s + 'index/module/Member/action/LoginInput" class="item_link_inner bg_filler">ログイン</a> </li>');
	} else {
		document.write('<li class="item_link username">ようこそ！' + member_name + 'さま</li>');
		document.write('<li class="item_link skin_mypage"> <a href="' + hostname_s + 'index/module/Member/action/LoginInput" class="item_link_inner bg_filler">マイページ</a> </li>');
	}
	return;
}

function getFavoriteCountRN() {
	var favorite_count = 0;

	var favorite = jQuery.cookie('favorite_bukken');
	if (favorite != null && favorite != undefined) {
		if (favorite.substr(-1) == ',') favorite = favorite.slice(0, -1);
		favorite_count = favorite.split(',').length;
	}

	$JQuery("#favorite_count_rn").text(favorite_count);
}

function getHistoryCountRN() {
	var history_count = 0;

	var history = jQuery.cookie('browse_history');
	if (history != null && history != undefined) {
		if (history.substr(-1) == ',') history = history.slice(0, -1);
		history_count = history.split(',').length;
	}

	$JQuery("#history_count_rn").text(history_count);
}