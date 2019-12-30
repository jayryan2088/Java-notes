//by gyn
//全局页面  头尾部  js
//切换校区选项卡
$(".city").mouseenter(function(){
	$(this).find(".city_con").fadeIn();
})
$(".city").mouseleave(function(){
	$(this).find(".city_con").stop().hide();
})	

//导航处下拉列表
$(".head_nav .a_js").mouseenter(function(){
	$(".fdnav").slideDown();
})
$(".header .a2_js").mouseenter(function(){
	$(".fdnav").stop().slideUp("fast");
})
$(".header").mouseleave(function(){
	$(".fdnav").stop().slideUp("fast");
})

//lay通用板块tab选项卡
$(".sec .hd_rr li").mouseenter(function(){
	$(this).addClass("cur").siblings().removeClass("cur").parent().parent().parent().siblings(".lay_con").children("ul").eq($(this).index()).show().siblings().hide();
})

$(".lay_js .hd_rr li").mouseenter(function(){
	$(this).addClass("cur").siblings().removeClass("cur").parent().parent().parent().siblings(".lay_con").children(".lay_con_list").eq($(this).index()).show().siblings().hide();
})

//banner新特效
var banli = $(".slideban .bd ul li");
var banli = parseInt(banli.length) - 1;
var ban_html = "";
for(i=0;i<banli;i++){
	ban_html += "<li></li>";
}
var boxli=$(".slideban .hd ul").html();
$(".slideban .hd ul").html(boxli+ban_html);


//底部社交二维码
$(".ewmbox").mouseenter(function(){
	$(this).children(".ewm").show().parent().siblings().children(".ewm").hide();
})
$(".ewmbox").mouseleave(function(){
	$(".ewmbox").children(".ewm").hide();
})
//资源调用
function ku_html(data){
   var html = "";
   $.each(data, function(index, n){
	   html += '<li><a class="casem" target="_blank" href="'+n.hrefurl+'"><div class="caset"><div><img alt="'+n.title+'" src="'+n.imgurl+'" width="232" height="152" /></div></div></a><div class="casef a_gd"><span class="hsp"><a class="castx a_default" target="_blank" href="'+n.hrefurl+'">'+n.title+'</a></span><span class="course-num">已有'+n.lookcount+'人观看</span><a class="a_gd a_default a_btn" target="_blank" href="'+n.hrefurl+'">观看教程</a></div></li>';
   });
   $(".ku_html").html(html);
		}
function open_html(data){
		   var html = "";
   $.each(data, function(index, n){
	   html += '<li><a class="casem" target="_blank" href="'+n.hrefurl+'"><div class="caset"><div><img alt="'+n.title+'" src="'+n.imgurl+'" width="232" height="152" /></div></div></a><div class="casef a_gd"><span class="hsp"><a class="castx a_default" title="'+n.title+'" target="_blank" href="'+n.hrefurl+'">'+n.title+'</a></span><span class="course-num">'+n.startdate+'开课</span></div></li>'; 
   });
   $(".open_html").html(html);
}

// 学院页面
$(".boxvid_cen").click(function(){
	$(this).find("video").show();
	playVid();
});
var myVid=document.getElementById("boxv");//触发的视频
function playVid(){
	myVid.play();
}
