$(function(){
    init();
});

function init() {
    btnControl();
    tabControl();
    gnbControl();
    // controlLayer();
    progControl();
    btnPosAware();
}

function gnbControl() {
	$('.btn_gnb_ctrl').bind('click', function(){
		$(this).parents('body').toggleClass('gnb_on');
	})
}

// function gnbControl() {
// 	// 1Depth
// 	var btnGnb = $('.btn_gnb');
// 	var subGnb = $(this).next('ul');

// 	btnGnb.each(function(){
// 		$(this).on('mouseenter focusin',function(){
// 			btnGnb.next('ul').removeClass('active')
// 			$(this).next('ul').addClass('active');
// 		});
// 		subGnb.on('mouseleave focusout', function(){
// 			 $(this).removeClass('active');
// 		});
// 	});

// 	// 2Depth
// 	var btnGnb2dpt = $('.list_gnb_2dpt > li > a');
// 	var subGnb2dpt = $(this).next('ul');

// 	btnGnb2dpt.each(function(){
// 		$(this).on('mouseenter focusin',function(){
// 			btnGnb2dpt.next('ul').removeClass('active')
// 			$(this).next('ul').addClass('active');
// 		});
// 		subGnb2dpt.on('mouseleave focusout', function(){
// 			 $(this).removeClass('active');
// 		});
// 	});

// 	// 3Depth
// 	var btnGnb3dpt = $('.list_gnb_3dpt a');
// 	var subGnb3dpt = $(this).next('ul');

// 	btnGnb3dpt.each(function(){
// 		$(this).on('mouseenter focusin',function(){
// 			btnGnb3dpt.next('ul').removeClass('active')
// 			$(this).next('ul').addClass('active');
// 		});
// 		subGnb3dpt.on('mouseleave focusout', function(){
// 			 $(this).removeClass('active');
// 		});
// 	});

// }

function btnControl() {
    $('*[role=button').on('click', function(){
        $(this).addClass('active');
    });
}

function tabControl() {
	$('.role_tab *[role=tabpanel]').addClass('deactive');
	$('*[role=tab]').each(function(){
		if ($(this).hasClass('active')){
			$($(this).attr('href')).removeClass('deactive')
		}
		$(this).on('click',function () {
			var $target = $(this).attr('href');
			var $targetAll = $(this).parents('.role_tab').find('.box_tab_area');
			$(this).parents('.role_tab').find('*[role=tab]').removeClass('active');
			$(this).addClass('active');
			$($targetAll).addClass('deactive');
			$($target).removeClass('deactive');
			return false;
		});
	});
}

var layerId, frPos, toPos = '';
function callLayer(layerId,frPos,toPos) {
	$('#'+layerId).addClass('active').removeClass(frPos).addClass(toPos).siblings('#wrapMask').addClass('active');

	// Close
	var closeBtn = $('*[aria-label=close]');
	closeBtn.each(function(){
		$(this).on('click',function(){
			var layerTarget = $(this).parents('.wrap_layer');
			$(layerTarget).removeClass('active').siblings('#wrapMask').removeClass('active');
			setTimeout(function(){
				layerTarget.removeClass(toPos).addClass(frPos);
			},500)
		});
		
	})
}
function progControl() {
	$('.bar_prog').each(function(){
		var progBar = $(this),
			max = progBar.attr('max'),
			minVal = parseInt(progBar.attr('min')),
			time = (1000/max)*2,
			value = progBar.val();

		var loading = function(){
			// value += 1;
			minVal +=1;
			addVal = progBar.val(minVal);
			progBar.next('.txt_progress').text(minVal + '%');
			if(minVal == value) {
				clearInterval(animate);
			}		
		};
		loading();
		var animate = setInterval(function(){
			 loading();
		}, time);
	});
}

function btnPosAware() {
	$('.positionAware').each(function(){
		$(this).on('mouseenter',function(e){
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});

		$(this).on('mouseleave',function(e){
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		})
	})
}

function slideControl2(targetSlide) { // 2016-01-04
	$('.'+targetSlide).each(function(){

		// slider name
		var typeSlide = targetSlide.slice(-1);
		// 1 : Basic Slider
		// 2 : Horizontal Infinite Slider
		// 3 :
		// 4 : 

		// slider Initialize
		var slide = $('.'+targetSlide).find('ul'),
			slideElem = slide.find('li'),
			slideParts = slideElem.eq(0),
			slideSize = slideElem.size(),
			slideHeight = slideElem.outerHeight(),
			slideWidth = slideElem.outerWidth() * slideSize,
			slideElWidth = slideElem.innerWidth(),
			slideMove = 0;
		$(this).children('.list_slide').css({width: slideWidth});

		// slider Button
		var btnSlide = $(this).find('.btn_slide'),
			clickCount = 0;

		btnSlide.each(function(){
			$(this).click(function(){
				var btnIndex = $(this).index();
				switch(btnIndex) {
					case 1 :
						if (typeSlide == 1) {
							slideNext();
							// slideInit();	
						} else if (typeSlide == 2){
							slideNextInfinite();
							// slideInit()
						}
						break;
					default:
						if (typeSlide == 1) {
							slidePrev();
							// slideInit();
						} else if (typeSlide == 2){
							slidePrevInfinite();
							// slideInit();
						}

				}
			});
		});

		// indicator 
		function slideFlag() {
			// activate indicatior
			$('.'+targetSlide +' > .indicateSlide > span').removeClass('active').eq(clickCount).addClass('active');
		};

		// Initailize indicator
		function initFlag() {
			$('.'+targetSlide +' > .indicateSlide').each(function(){
				for(i=0; i<slideSize; i++) {
					var j = i+1;
					var indicatorElem = '<span>slide'+j+'</span>';
					$(this).append(indicatorElem);	
				}
				$(this).find('span:first-child').addClass('active')
			})
		}
		initFlag();


		// slide to next horizontal
		function slideNext() {
			clickCount++;
			if(clickCount > slideSize -1 ) {
				clickCount = slideSize -1;
			} else {
				slideMove = slideMove + slideElWidth;
				slide.css({marginLeft: -slideMove});
				slideFlag();
			}
		}

		// slide to prev horizontal
		function slidePrev() {
			clickCount--;
			if(clickCount < 0) {
				clickCount = 0;
			} else {
				slideMove = slideMove - slideElWidth;
				slide.css({marginLeft: -slideMove});
				slideFlag();
			}
		}

		// Infinite slide to next horizontal
		function slideNextInfinite() {
			clickCount++;
			if(clickCount > slideSize - 1 ) {
				clickCount = 0;
			}
			slideMove = slideElWidth;
			slide.css({marginLeft: -slideMove});
			slideFlag();
			slideInitNext();
			
		}

		// Infinite slide to prev horizontal
		function slidePrevInfinite() {
			clickCount--;
			if(clickCount < 0) {
				clickCount = slideSize - 1;
			}

			slideMove = slideElWidth;
			slide.css({marginLeft: -slideMove});
			slideFlag();
			slideInitPrev();
		}

		function slideInitNext() {
			setTimeout(function(){
				var cutSlide = slideElem.eq(clickCount-1).clone();
				slide.append(cutSlide).delay(1500).queue(function(){
					slide.removeAttr('style')
					slideElem.eq(clickCount-1).remove();
				});
			},500);
		}
		function slideInitPrev() {
			setTimeout(function(){
			console.log(clickCount)
				var cutSlide = slideElem.eq(clickCount).clone();
				slide.removeAttr('style').append(cutSlide);
			},500);
		}

	})
}
