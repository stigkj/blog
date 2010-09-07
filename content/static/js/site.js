/* 
 * Put it all inside of a function, so global variables become scoped, which
 * means the Clojure Compiler can obfuscate these, too!
 */

(function () {

var MAIN_WIDTH = 600;
var RESTORE_WIDTH = 520;
var RSS_LOGO_LEFT = 905;
var RSS_LOGO_WIDTH = 32;

function relatize_dates() {
	$('.reldate').relatizeDate();
}

function expand_pre_boxes() {
	// Have them expand when necessary
	$('pre').hover(
		function(event) {
			$('code', this).stop(true, false).animate({'max-width': "1000px"}, 'fast');
		},
		function(event) {
			$('code', this).stop(true, false).delay(500).animate({'max-width': RESTORE_WIDTH + "px"}, 'fast');
		}
	);
}

function open_external_links_in_new_window() {
	$('a').each(function (index) {
		var external = $(this).attr('href').indexOf('http') == 0;
		//alert(index + ": " + $(this).attr('href') + ' => ' + external);
		if (external) {
			$(this).attr('target', '_blank');
		}
	});
}

function hover_browser_icons() {
	$('#footer img').hover(
		function () { $(this).attr('src', '/img/' + $(this).attr('id').substr(1) + '1.png'); },
		function () { $(this).attr('src', '/img/' + $(this).attr('id').substr(1) + '0.png'); }
	);
}

function showhide_ricon(id, show) {
   	var pixels_string = (RSS_LOGO_WIDTH / 2) + "px";
   	$('#' + id).stop(true, true)
   		.css({'left': RSS_LOGO_LEFT, 'z-index': (show) ? 1 : 3})
   		.animate({ 'left': '+=' + pixels_string }, 150, function() { $('#' + id).css({'z-index': (show) ? 3 : 1 }); })
   		.animate({ 'left': '-=' + pixels_string }, 150);
}

function hover_rightbar_icons() {
	var func_timers = {};
	$('.ricon').hover(
		function () {
			var id = $(this).attr('id');
			if (func_timers[id] != null) {
				clearTimeout(func_timers[id]);
				delete func_timers[id];
				console.log('Removed key ' + id + 'from func_timers');
			} else {
				showhide_ricon(id, true);
			}
		}
		,
		function () {
			var id = $(this).attr('id');
			func_timers[id] = setTimeout(function () {
				showhide_ricon(id, false);
				delete func_timers[id];
				console.log('Removed key ' + id + 'from func_timers');
			}, 2000);
			console.log('Added key ' + id + 'to func_timers');
		}
	);
}

function auto_align_images() {
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
}

// Once the DOM is fully loaded
$(document).ready(function () {
	relatize_dates();
	expand_pre_boxes();
	open_external_links_in_new_window();
	hover_browser_icons();
	hover_rightbar_icons();
});

// Once all image's are loaded
$(window).load(function () {
	auto_align_images();
});

})();
