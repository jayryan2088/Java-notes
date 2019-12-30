//by gyn
//其他页面js

//报名流程页面城市银行信息切换
$(".box_flow .city_tab a").mouseenter(function(){
	$(".bank .bank_list").eq($(this).index()).addClass("bank_list_cur").siblings().removeClass("bank_list_cur");
})
$(".cityad .city").change(function(){
	var optIndex = $(".cityad .city option:selected").index();                
	$(".bank .bank_list:eq("+optIndex+")").eq($(this).index()).slideDown().siblings().slideUp();					
})

//师资页面tab选项
$(".tea_hd ul li").click(function(){
	$(this).addClass("cur").siblings().removeClass("cur");
	$(".tea_con .tea_txt").eq($(this).index()).addClass("tea_txt_cur").siblings().removeClass("tea_txt_cur");
	$("img").lazyload({effect: "fadeIn"});
})

//课程大纲视频弹出
var win_h=$(document).height();
$(".zhe_bg").css("height",win_h+"px");
$(".lay_video ul li").click(function(){
	$(".zhe_bg").show();
	$(".videobox ul li").eq($(this).index()).show();
	$(".videobox ul li .myvideo").eq($(this).index()).trigger('play')
})
$(".zhe_bg").click(function(){
	$(".zhe_bg").hide();
	$(".videobox ul li").hide();
	$(".videobox ul li .myvideo").trigger('pause');
})

//升级历史页面视频弹出
$(".zhezhao a").click(function(){
	$(".zhezhao").hide();
})				
$(".video ul li").click(function(){
	var h = $(document).height();
	$(".zhezhao").css({"visibility":"visible","height":h+"px"});
	$(".zhezhao").fadeIn();
	$(".zhezhao").children().children().eq($(this).index()).show().siblings("li").hide();
})

