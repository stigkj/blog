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
	$('img.hoverc, img.browser, img.misfit').hover(
		function () { $(this).attr('src', '/img/' + $(this).attr('id').substr(1) + '1.png'); },
		function () { $(this).attr('src', '/img/' + $(this).attr('id').substr(1) + '0.png'); }
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

function resolve_anti_spam_link() {
	$('a.email').each(function(i) {
		var text = $(this).text();
		var address = text.replace(" at ", "@").replace("this domain", "nvie.com");
		$(this).attr('href', 'mailto:' + address);
		$(this).text(address);
	});
}

function toggle_edits() {
	$('a#toggle-edits').toggle(
		function() {
			$('ins,div.ins').css({ 'text-decoration': 'underline', color: 'green' });
			$('del,div.del').css({ 'text-decoration': 'line-through', color: 'red' });
			$('div.del').css({ display: 'block' });
			$('del').css({ display: 'inline' });
			$(this).html('(hide updates)');
			var $target = $('ins,del,div.ins,div.del').first();
			var offset = $target.offset().top - 40;
			$('html,body').animate({ scrollTop: offset }, 800);
		},
		function() {
			$('ins,div.ins').css({ 'text-decoration': 'none', color: 'inherit' });
			$('del,div.del').css({ 'text-decoration': 'none', color: 'inherit', display: 'none' });
			$(this).html('(highlight updates)');
		}
	);
}

function reposition_actionbox() {
	var d = $(window);
	var m = $('#main');
	var pos = m.position();
	var t = pos.top + 32;
	var l = Math.max(0, (d.width() - m.outerWidth())) / 2 + 600 + 48;
	$('#actionbox').css({top: t, left: l})
}

function show_actionbox() {
    reposition_actionbox();
    $('#actionbox').show();
}

// Once the DOM is fully loaded
$(document).ready(function () {
	relatize_dates();
	show_actionbox();
	expand_pre_boxes();
	open_external_links_in_new_window();
	hover_browser_icons();
	resolve_anti_spam_link();
	toggle_edits();
	$(window).resize(reposition_actionbox);
});

// Once all image's are loaded
$(window).load(function () {
	auto_align_images();
});

})();
