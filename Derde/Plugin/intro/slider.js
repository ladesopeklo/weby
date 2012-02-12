	var Slider = function (data) {
		var d = data || [];
		var index = 1;
		return {
			next: function () {
				var r = d[index++];
				if (index >= d.length) {
					index = 0;
				}
				return r;
			}
		};
	};

	function timer(selector, slider) {
		$(selector).ImageSwitch({
			Type: "FadeIn",
			Speed: 2500,
			NewImage: slider.next()
		});
		setTimeout(function () {
			timer(selector, slider);
		}, 6000);
	}

	function Intro(selector, images) {
		var slider;
		
		slider = new Slider(images);
		
		$(selector).attr("src", images[0]);
		setTimeout(function () {
			timer(selector, slider);
		}, 2000);

	};  
