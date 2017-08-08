$(function (){
    $(".linkbox").click(function(){
        var _url = $(this).find("a").attr("href");
        // targetが指定されている場合は別ウィンドウで開く
        ($(this).find("a").attr("target") == undefined) ? window.location=_url : window.open(_url);
        return false;
    });
});
