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

	var images = [
		"Content/intro/1.jpg",
		"Content/intro/2.jpg",
		"Content/intro/3.jpg",
		"Content/intro/4.jpg",
		"Content/intro/5.jpg",
		"Content/intro/6.jpg",
		"Content/intro/7.jpg",
		"Content/intro/8.jpg",
	];

	var x = new Slider(images);

	function timer() {
		$("#TestImg").ImageSwitch({
			Type: "FadeIn",
			Speed: 2500,
			NewImage: x.next()
		});
		setTimeout("timer()", 6000);
	}
	
	$(document).ready(function () {
		$("#TestImg").attr("src", images[0]);
		setTimeout("timer()", 5000);
		
	});  
