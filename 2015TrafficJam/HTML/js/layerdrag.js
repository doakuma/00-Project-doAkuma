/**
* @description
* 	LayerWindow 기능 정의
*/
;(function( $ ) {
	'use strict';

	var LayerWindow = {
		_winIdx : 1,
		_winMax : 20,
		_markUp	: 'win_markup.html',
		setEvents : function() {
			var _this;

			// 이벤트 초기화
			$( 'div[data-win] .btn_mini' ).unbind( 'click' );
			$( 'div[data-win] .btn_close' ).unbind( 'click' );
			$( 'div[data-role="taskbar"] li' ).unbind( 'click' );

			// window - 최소화버튼
			$( 'div[data-win] .btn_mini' ).bind( 'click', function(event) {
				$( 'div[data-role="taskbar"] li' ).removeClass( 'on' );
				$(this).parents( '.layer_com' ).css( 'z-index', 0 );
				$(this).parents( '.layer_com' ).hide();

				var maxIdx = 0,
					win = null;
				$.each($( 'div[data-win]' ), function(index, val) {
					if( $(this).css( 'display' ) == 'block' && $(this).css( 'z-index' ) >= maxIdx ) {
						maxIdx = $(this).css( 'z-index' );
						win = $(this).data( 'win' );
					}
				});

				if( win && maxIdx != 0 ) {
					$( 'div[data-role="taskbar"] li[data-win="' + win + '"]' ).addClass( 'on' );
				}
				return false;
			});

			// window - 닫기 버튼
			$( 'div[data-win] .btn_close, div[data-win] a[data-role="win_close"]' ).bind( 'click', function(event) {
				$( 'div[data-role="taskbar"] li' ).removeClass( 'on' );
				$( 'div[data-role="taskbar"] li[data-win="' + $(this).parents( '.layer_com' ).data( 'win' ) + '"]' ).remove();
				$(this).parents( '.layer_com' ).remove();

				var maxIdx = 0,
					win = null;
				$.each($( 'div[data-win]' ), function(index, val) {
					if( $(this).css( 'display' ) == 'block' && $(this).css( 'z-index' ) >= maxIdx ) {
						maxIdx = $(this).css( 'z-index' );
						win = $(this).data( 'win' );
					}
				});

				if( win && maxIdx != 0 ) {
					$( 'div[data-role="taskbar"] li[data-win="' + win + '"]' ).addClass( 'on' );
				}
				return false;
			});

			// window - taskbar
			$( 'div[data-role="taskbar"] li a' ).bind( 'click', function(event) {
				event.preventDefault();

				var type = $(this).attr( 'class' ),
					win = $(this).parent().data( 'win' );

				switch( type ) {
					case 'btn_big':
						$( 'div[data-role="taskbar"] li' ).removeClass( 'on' );
						$( 'div[data-role="taskbar"] li[data-win="' + win + '"]' ).addClass( 'on' );

						$( 'div.layer_com[data-win]' ).css( 'z-index', '10' );

						$( 'div.layer_com[data-win="' + win + '"]' ).css( 'z-index', '20' );
						$( 'div.layer_com[data-win="' + win + '"]' ).show();
						break;
					case 'btn_close':
						$( 'div.layer_com[data-win="' + win + '"]' ).remove();
						$(this).parent().remove();

						var maxIdx = 0,
							win = null;
						$.each($( 'div[data-win]' ), function(index, val) {
							if( $(this).css( 'display' ) == 'block' && $(this).css( 'z-index' ) >= maxIdx ) {
								maxIdx = $(this).css( 'z-index' );
								win = $(this).data( 'win' );
							}
						});
						if( win && maxIdx != 0 ) {
							$( 'div[data-win="' + win + '"]' ).show();
							$( 'div[data-role="taskbar"] li' ).removeClass( 'on' );
							$( 'div[data-role="taskbar"] li[data-win="' + win + '"]' ).addClass( 'on' );
						};
						break;
				}
			});
			
			// window - drag
			$( 'div[data-win]' ).draggable({
				cursor: 'move',
				stack: '.layer_com',
				opacity: 1,
				containment: 'parent',
				start: function() {
					$( 'div[data-role="taskbar"] li' ).removeClass( 'on' );
					$( 'div[data-role="taskbar"] li[data-win="' + $(this).data( 'win' ) + '"]' ).addClass( 'on' );
					$( 'div.layer_lock' ).show();
				},
				drag: function() {
				},
				stop: function() {
					$( 'div.layer_lock' ).hide();
				},
				handle : $(".layer_com h1")
			});
		},
		addWindow : function() {
			var _this = this;

			this._winIdx++;

			$.ajax({
				url: this._markUp,
				type: 'GET',
				dataType: 'html'
			})
			.done(function( res ) {
				res = res.replace( '{DATA-WIN-IDX}', _this._winIdx );
				res = res.replace( '{DATA-WIN-ZIDX}', 999 );
				
				$( 'div[data-role="window"]' ).append( res );

				if( !$( 'div[data-role="taskbar"] ul' ).length ) {
					$( 'div[data-role="taskbar"]' ).html( '<ul></ul>' );
				};

				$( 'div[data-role="taskbar"] li' ).removeClass( 'on' );

				var winTaskHtml = '';
				winTaskHtml += '<li class="tab1 on" data-win="win_' + _this._winIdx + '">';
				winTaskHtml += '	<a href="#" class="btn_big">등록</a>';
				winTaskHtml += '	<a href="#" class="btn_close">닫기</a>';
				winTaskHtml += '</li>';

				$( 'div[data-role="taskbar"] ul' ).append( winTaskHtml );

				_this.setEvents();
			});
		},
		init : function() {
			var _this = this;

			this.setEvents();

			// 임시 window 추가 버튼
			$( 'div[data-win="win_1"] button.btn' ).click(function(event) {
				//alert( 'add' + $( 'div[data-win]' ).length );
				if( $( 'div[data-win]' ).length >= _this._winMax ) {
					alert('20개로 제한' );
					return;
				};
				_this.addWindow();
			});
		}
	};

	$(document).ready(function() {
		LayerWindow.init();
	});
})( jQuery );