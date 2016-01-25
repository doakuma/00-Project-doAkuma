$(function(){
    init();
});

function init() {
	scrollPara();
}

function scrollPara() {
	$('.menu_para .btn_gnb').each(function(){
		$(this).click(function(){
			var _target = $(this).attr('href'),
				_scrollTop = $(_target).offset().top - 46;
			$('html,body').animate({scrollTop: _scrollTop},350);
			$('.menu_para').addClass('fadeInDown');
			$('.box_parallax').removeClass('active');
			$(_target).find('.cont_back').addClass('active');
		})
	});
	$(window).scroll(function(){
		if($(window).scrollTop() > 10) {
			$('.menu_para').addClass('fadeInDown')
		} else if($(window).scrollTop() < 10){
			$('.menu_para').removeClass('fadeInDown')
		};
		var paraScroll;
		$('.box_parallax').each(function(){
			paraScroll = $(this).offset().top -46;
			if($(window).scrollTop() >= paraScroll){
				$('.box_parallax').removeClass('active');
				$(this).find('.cont_back').addClass('active');
			} else if($(window).scrollTop() <= paraScroll){
				$(this).find('.cont_back').removeClass('active');
			}
		});
	});
};