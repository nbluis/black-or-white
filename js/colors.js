$(function() {
	var colorPanel = $('.tiles'),
		black = [0, 0, 0],
		white = [255, 255, 255];

	function translateRgb(rgb) {
		return 'rgb(' + rgb.join(',') + ')';
	}

	function chooseColorTo(color) {
		var distanceToBlack = colorDistanceRgb(color, black);
		var distanceToWhite = colorDistanceRgb(color, white);

		if (distanceToBlack * 0.75 < distanceToWhite) 
			return translateRgb(white);

		return translateRgb(black);
	}

	function colorDistanceRgb(rgb1, rgb2) {
		var r = Math.pow(rgb2[0]-rgb1[0], 2);
		var g = Math.pow(rgb2[1]-rgb1[1], 2);
		var b = Math.pow(rgb2[2]-rgb1[2], 2);
		return Math.sqrt(r + g + b);
	}

	function colorDistanceHsl(hsl1, hsl2) {
		var avghue = (hsl1[0] + hsl2[0]) / 2;
		var distance = Math.abs(hsl1[0] - avghue);
		return distance;
	}

	function hslToRgb(h, s, l){
	    var r, g, b;

	    if(s == 0) {
	        r = g = b = l; // achromatic
	    } else {
	        function hue2rgb(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}

	function rgbToHsl(r, g, b){
	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if (max == min) {
	        h = s = 0; // achromatic
	    } else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    return [h, s, l];
	}

	function createTile(rgb) {
		var tile = $('<div class="tile fa fa-github-alt"></div>').css({
			background: translateRgb(rgb),
			color: chooseColorTo(rgb)
		});
		colorPanel.append(tile);
	}

	function eachColorVariance(callback) {
		for (var i = 0; i <= 255; i++)
			if (i % 20 == 0)
				callback(i);
	}

	eachColorVariance(function(r) {
		eachColorVariance(function(g) {
			eachColorVariance(function(b) {
				createTile([r, g, b]);
			});
		});
	});

});
