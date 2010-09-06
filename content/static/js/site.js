/* 
 * Put it all inside of a function, so global variables become scoped, which
 * means the Clojure Compiler can obfuscate these, too!
 */

function nviecom() {

var MAIN_WIDTH = 600;
var RESTORE_WIDTH = 520;
var RSS_LOGO_LEFT = 905;
var RSS_LOGO_WIDTH = 32;

$(document).ready(function () {
	$('.reldate').relatizeDate();

	// Have them expand when necessary
	$('pre').hover(
		function(event) {
			$('code', this).stop(true, false).animate({'max-width': "1000px"}, 'fast');
		},
		function(event) {
			$('code', this).stop(true, false).delay(500).animate({'max-width': RESTORE_WIDTH + "px"}, 'fast');
		}
	);

	$('a').each(function (index) {
		var external = $(this).attr('href').indexOf('/') != 0;
		//alert(index + ": " + $(this).attr('href') + ' => ' + external);
		if (external) {
			$(this).attr('target', '_blank');
		}
	});

	$('#footer img').hover(
		function () { $(this).attr('src', '/img/' + $(this).attr('id').substr(1) + '1.png'); },
		function () { $(this).attr('src', '/img/' + $(this).attr('id').substr(1) + '0.png'); }
	);

	function showhide_rss(id, show) {
		var pixels_string = (RSS_LOGO_WIDTH / 2) + "px";
		$(id).stop(true, true)
			.css({'left': RSS_LOGO_LEFT, 'z-index': (show) ? 1 : 3})
			.animate({ 'left': '+=' + pixels_string }, 150, function() { $(id).css({'z-index': (show) ? 3 : 1 }); })
			.animate({ 'left': '-=' + pixels_string }, 150);
	}

	var func_timer = null;
	$('#rss').hover(
		function () {
			if (func_timer != null) {
				clearTimeout(func_timer);
				func_timer = null;
			} else {
				showhide_rss('#rss', true);
			}
		}
		,
		function () {
			func_timer = setTimeout(function () {
				showhide_rss('#rss', false);
				func_timer = null;
			}, 2000);
		}
	);
});

// Once all image's are loaded
$(window).load(function () {
	$('p.autoalign').each(function () {
		var sum = 0;
		$('img', this).each(function () {
			//console.log('this image\'s width is: ' + $(this).width());
			sum = sum + $(this).width();
		});
		var l = (MAIN_WIDTH - sum) / 2;
		//console.log('setting width to ' + sum + ', left to ' + l);
		$(this).css({'width': sum, 'left': l});
	});
});

}

/*
 * Load the whole body of the JavaScript
 */
nviecom();
