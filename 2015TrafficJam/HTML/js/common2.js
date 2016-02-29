$(document).ready(function(){

	$(".gnb > li").on("mouseenter focusin",function(){

		$(this).find(".subWrap").show();
		$(this).find(".subWrap").addClass("on");
		$(this).children().addClass("current");
		$(".subBg").show();

		menuHeight = $(".on").height();
		console.log(menuHeight);

		$("#header-area").stop().animate({
			height: 270 +menuHeight //80은 헤더영역의 기본 높이값
		}, 200, 'swing');
		$(".subBg").stop().animate({
			height:menuHeight
		},200,'swing');

	});

	$(".gnb > li").on("mouseleave blur",function(){
		$(this).find(".subWrap").hide();
		$(this).find(".subWrap").removeClass("on");
		$(this).children().removeClass("current");
		$(".subBg").hide();

		$("#header-area").stop().animate({
			height: 270
		}, 200, 'swing');
		$(".subBg").stop().animate({
			height:0
		},200,'swing');
	});


	//ie에서 li에 포커스 아웃됐을때 실행되는 부분
	$(".gnb > li > a").on("focusin",function(){
		$(".subWrap").hide();
		$(".gnb > li > a").removeClass("current");
		$(".subBg").hide();
		$("#header-area").stop().animate({
			height: 270
		}, 200, 'swing');
		$(".subBg").stop().animate({
			height:0
		},200,'swing');

	});

	$('*:not(".gnb *")').focus(function(){
		$(".subWrap").hide();
		$(".gnb > li > a").removeClass("current");
		$(".subBg").hide();

		$("#header-area").stop().animate({
			height: 270
		}, 200, 'swing');
		$(".subBg").stop().animate({
			height:0
		},200,'swing');
	});

	$(".gnb > li > a").hover(
  function () {
    $(this).css({'background':'#0066cc url(../images/admin/icon_gnb01_on.png) no-repeat center 30px','color':'#fff'});
	
  }, 
  function () {
    $(this).css({'width':'120px','height':'148px','font-size':'14px','color':'#333333','line-height':'120%','display':'block','color':'#0066cc','background':'#fff'});
  }
);

	/*
	if($('.subBg').css("display") == "block") {
			jQuery(".gnb > li.m02 > a").css({'background': '#0066cc url(../images/admin/icon_gnb02.png) no-repeat center 30px', 'color':'#fff', 'width':'120px','height':'148px','font-size':'14px','color':'#fff','line-height':'120%','display':'block'});
	
		} 
	*/
});