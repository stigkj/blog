//
// Defeat the FOUT
// http://paulirish.com/2009/fighting-the-font-face-fout/#defeatthefout
//
(function () {
	// If FireFox 3.5+, hide content till load (or 3 seconds) to prevent FOUT
	var d = document;
	var e = d.documentElement;
	var s = d.createElement('style');
	if (e.style.MozTransform === ''){ // gecko 1.9.1 inference
		s.textContent = 'body{visibility:hidden}';
		e.firstChild.appendChild(s);
		function f() { s.parentNode && s.parentNode.removeChild(s); }
		addEventListener('load', f, false);
		setTimeout(f, 3000); 
	}
})();
