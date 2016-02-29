



var 	$scroll,

/* 홍보 영역 */

//	promo = Math.floor((Math.random()*3)+1)
	promo = 1,
	$hotissueDivCloneHtml,
	sliderIntervalID_promo;
var timeoutId;
var menuChk = false;
var time = 300;

$(window).load(function(){
	promotion();
	gnbmenu() // 상단메뉴
})


function promotion(){
}


function gnbmenu(){
	$('.menu_arr .menu_prev').css('opacity',1)
	$('.menu_arr .menu_next').css('opacity',1)
	var menuOn = 1;
	 $.each($('#menu h2 a'), function() {
        $(this).parent().addClass('m' + (($(this).parent().index() / 2) + 1));

    });
	
	$('#menu').mouseleave(function() {
        menuChk = false;
        time = 300;
        window.clearTimeout(timeoutId);
        timeoutId = null;

    });
	$("#menu").hover(function() {
		
	}, function() {
		$('.menu_arr').hide();
        $('#wrap').attr('class', 'm' + menuOn);
        $('#header').stop().animate({
            height: "130px"
        }, 200, "linear", function() {
            $('#header').css({
                'background-image': ''
            })
        });
        $('.menu_back').stop().animate({
            height: 0
        }, 200, "linear");
       // $('.menu_back02').stop().animate({
        //    height: 0
      //  }, 200, "linear");
        $('#menu').stop().animate({
            height: "44px",
            background: '#0265cb'
        }, 200, "linear");
        $('#menu h2').css({
            opacity: 1
        });
        $('#menu h2 a').css({
            height: "37px",
            background: 'none'
        });

	});
    $('#menu h2 a').hover(function() {
        var obj = this;
        if (!timeoutId || menuChk) {

            timeoutId = window.setTimeout(function() {
                menuChk = true;
                time = 0;
                //	timeoutId = null; // EDIT: added this line
                $('.menu_arr').show();

                menuOn = (($(obj).parent().index() / 2) + 1);
                $('#menu h2').css({
                    opacity: 1
                });
                $(obj).parent().css({
                    opacity: 1
                });
                $('#wrap').attr('class', 'm' + menuOn);
                $('#header').css({
                    'background-image': 'none'
                })
                $('#header').stop().delay(300).animate({
                    height: "230px"
                }, 200, "linear");
                $('#menu ul.menu_' + menuOn + ' h5:eq(0) a').mouseover();
                $('.menu_back').stop().delay(300).animate({
                    height: "100px"
                }, 100, "linear");
              //  $('.menu_back02').stop().delay(300).animate({
              //     height: "230px"
              //  }, 100, "linear");
                $('#menu').stop().delay(300).animate({
                    height: "290px"
                }, 100, "linear");
                $('#menu h2 a').css({
                    height: "37px",
                    background: 'none'
                });
                $('#menu h2.m' + menuOn + ' a').css({
                    height: "44px",
                    background: '#0265cb'
                });
                $('#menu > ul').hide();
                $('#menu ul.menu_' + menuOn + '').show(400, function() {
                    $(this).not('#menu > ul').hide();

                });
            }, time);
        }

    }, function() {
    });
	
	$.each($('#menu > ul'),function(){
		$(this).addClass("menu_"+(($(this).index()+1)/2));
		$(this).find('h5 a').bind('hover focus',function(){
			$('#menu > ul > li > ul').hide();
			$('#menu').find('h5').removeClass('On');
			$(this).parent().next().show();
			$(this).parent().addClass('On');
		})
	})
	$.each($('#menu > ul > li'),function(){
		$(this).addClass("submenu_"+($(this).index()+1));
		if ($(this).parent().index() == 11){
			$(this).parent().css({width:($(this).index()+1)*74+"px",marginLeft:($(this).index()+1)*(-37)+"px"})
		} else {
			$(this).parent().css({width:($(this).index()+1)*130+"px",marginLeft:($(this).index()+1)*(-60)+"px"})
		}
	})
	
	$('.menu_arr .menu_prev').click(function(){
		$('#menu h2').css({opacity:0.5});
		$('#menu h2 a').css({height:"37px",background:'none'});
		if(menuOn == 1){
			menuOn = 6;
		} else {
			menuOn --;
		}
		$('#menu h2.m'+menuOn).css({opacity:1});
		$('#wrap').attr('class','m'+menuOn);
		$('#menu > ul.menu_'+menuOn+' h5:eq(0) a').mouseover();
		$('#menu h2.m'+menuOn+' a').css({height:"44px",background:'#0265cb'});
		return false;
	})
	$('.menu_arr .menu_next').click(function(){
		$('#menu h2').css({opacity:0.5});
		$('#menu h2 a').css({height:"37px",background:'none'});
		if(menuOn == 6){
			menuOn = 1;
		} else {
			menuOn ++;
		}
		$('#menu h2.m'+menuOn).css({opacity:1});
		$('#wrap').attr('class','m'+menuOn);
		$('#menu > ul.menu_'+menuOn+' h5:eq(0) a').mouseover();
		$('#menu h2.m'+menuOn+' a').css({height:"44px",background:'#0265cb'});
		return false;
	})
	$('.menu_arr .menu_prev').hover(function(){
		$(this).css('opacity',1)
	},function(){
		$(this).css('opacity',0.5)
	})
	$('.menu_arr .menu_next').hover(function(){
		$(this).css('opacity',1)
	},function(){
		$(this).css('opacity',0.5)
	})
	$('#searchCate, .foreign a').bind('hover focus',function(){
		$('.menu_arr').hide();
		$('#wrap').attr('class','m'+menuOn);
		$('#header').stop().animate({height:"130px"},200,"linear");
		$('.menu_back').stop().animate({height:0},200,"linear");
	//	$('.menu_back02').stop().animate({height:0},200,"linear");
		$('#menu').stop().animate({height:"44px",background:'#0265cb'},200,"linear");
		$('#menu h2').css({opacity:1});
		$('#menu h2 a').css({height:"37px",background:'none'});
		$('#menu ul').hide();
	})
}



