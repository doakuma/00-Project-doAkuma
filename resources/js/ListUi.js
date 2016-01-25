$(function(){
    init();
});

function init() {
    treeListControl();
    timeLineControl();
}

function treeListControl() {
	$('.list_tree .btn_tree').each(function(){
		$(this).on('click', function(){
			if($(this).next('ul').index() < -1) {
				return false;
			} else {
				$(this).toggleClass('active').next().toggleClass('active');	
			}
		})	
	})
}

function timeLineControl() {
	setupHorizontal()
	function setupHorizontal() {
		$('.timeHorWrap').each(function(){
			var contWidth;
			$(this).find('dt').each(function(){
				
			})
		})
	}
}