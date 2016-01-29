$(function(){
    init();
});

function init() {
    btnControl();
    tabControl();
    gnbControl();
    progControl();
    ipTxtControl();
    iptFilecontrol();
    timeLineControl();
    panelControl();
}

function panelControl() {
	$('.list_panel').each(function(){
		$(this).click(function(){
			$(this).toggleClass('active');
		})
	})
}

function timeLineControl() {
	var _containerTime = $('.wrap_time'),
		_contentTime = _containerTime.find('.inner_time'),
		_navTime = _containerTime.find('.nav_time > a'),
		_boxTime = _containerTime.find('.box_timeline'),
		_boxTimeSize = _boxTime.size(),
		_boxTimeWidth = _boxTime.width(),
		_contentTimeWidth = _boxTimeWidth * _boxTimeSize;

	_contentTime.width(_contentTimeWidth);
	_navTime.first().addClass('active');

	
	_navTime.each(function(){
		$(this).on('click', function(){
			var chkInd = $(this).index(),
				_moveTime = -(_boxTimeWidth * chkInd) + 'px';
			_navTime.removeClass('active');
			$(this).addClass('active');

			$(this).parent().next('.inner_time').css({
				'-webkit-transform': 'translateX('+_moveTime+')',
				'-ms-transform': 'translateX('+_moveTime+')',
				'-o-transform': 'translateX('+_moveTime+')',
				transform: 'translateX('+_moveTime+')'
			})
			return false;
		})
	})
	
}

function iptFilecontrol() {
	$('.file').each(function(){
		$(this).on('change', function(){
			var fileName = $(this).prop('value').split('\\')[2];
			console.log(fileName)
			$(this).next().find('span').html(fileName)
		})
	})
}

function ipTxtControl() {
	$('.text').each(function(){
		$(this).on('focusout', function(){
			if($(this).val() !== '') {
				$(this).addClass('active')
			}
			console.log($(this).val())
		})
	})
}
function gnbControl() {
	$('.btn_gnb_ctrl').bind('click', function(){
		$(this).parents('body').toggleClass('gnb_on');
	})
}


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

