$(document).ready(function(){

	$(".gnb > li").on("mouseenter focusin",function(){
		jQuery(this).delay(300);
		
		$(this).find(".subWrap").show(0);
		$(this).find(".subWrap").addClass("on");
		$(this).children().addClass("current");
		$(".subBg").show();

		menuHeight = $(".on").height();
		//console.log(menuHeight);

		$("#header-area").stop().animate({
			height: 270+menuHeight //80은 헤더영역의 기본 높이값
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

});