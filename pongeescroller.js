(function ( $ ) {
	var $pages, $picker, currentPage, isAnimating, tops, scrollBinded;
    $.fn.pongeeScroller = function(options) {
    	$pages = this;
    	$picker = options.picker;
    	initPongeeScroller();
    };
    $.removePongeeScroller = function() {
    	$picker.removeClass('selected');
    	unbindScrollEvent();
    }
    function initPongeeScroller() {
		isAnimating = false;
		scrollBinded = false;
		$picker.on( 'click', function() {
			onClickShowPage($(this));
		});
		normalize();
		bindScrollEvent();		
    }
    function bindScrollEvent() {
    	$(document).bind('scroll', function(ev) {
			if (!isAnimating) normalize();
		});
		scrollBinded = true;
    }
    function unbindScrollEvent() {
    	scrollBinded = false;
    	$(document).unbind('scroll');
    }
    function onClickShowPage($this) {
    	page = $this.attr('page');
    	pagesCount = $pages.size();
		if( isAnimating || (currentPage == page) || ( page >= pagesCount ) || ( page < 0 )) {
			return false;
		}
		showPage(page);
    }
	function showPage(page) {
		$('.png-page-picker').removeClass('selected');
		$('.png-page-picker[page="' + page + '"]').addClass('selected');
		isAnimating = true;
		var tops = calculateTop();
		$page = $(".png-page-" + page);
		var top;
		var diff = Math.abs(currentPage - page);
		top = tops[page];
		$('html,body').animate({
		        scrollTop: Math.abs(top) + "px"
		    }, 200 * diff, function() {
		    	currentPage = page;
		    	isAnimating = false;
		});		
	}
	function normalize() {
		var tops = calculateTop();
		currentPage = calculateCurrentPage(tops);
		$('.png-page-picker').removeClass('selected');
		$('.png-page-picker[page="' + currentPage + '"]').addClass('selected');
	}
	function calculateTop() {
		var tops = [];
		$pages.each(function(index) {
			tops[index] = $(this).offset().top;
		});

		return tops;
	}
	function calculateCurrentPage(tops) {
		var scrollTop = $('body').scrollTop();
		if (scrollTop == 0) scrollTop = $('html').scrollTop();
		if (scrollTop == 0) return 0;

		var page = -1;
		var minValue = 99999999;
		$(tops).each(function(index) {
			var top = this;
			var diff = Math.abs(scrollTop - top);
			if (diff < minValue) {
				minValue = diff;
				page = index;
			}
		});

		return page;
	} 
}( jQuery ));