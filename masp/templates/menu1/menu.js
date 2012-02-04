var menu = {
	bindevents: function () {
		$.event.special.hoverintent = {
			setup: function () {
				//$(this).bind("mouseover", jQuery.event.special.hoverintent.handler);
			},
			teardown: function () {
				//$(this).unbind("mouseover", jQuery.event.special.hoverintent.handler);
			},
			handler: function (event) {
				//event.type = "hoverintent";
				if ($(this).hasClass("disabled")) {
					return;
				}

				var self = this,
					args = arguments,
					target = $(event.target),
					cX, cY, pX, pY;

				function track(event) {
					cX = event.pageX;
					cY = event.pageY;
				};
				pX = event.pageX;
				pY = event.pageY;
				function clear() {
					target
						.unbind("mousemove", track)
						.unbind("mouseout", arguments.callee);
					clearTimeout(timeout);
				}
				function handler() {
					if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
						clear();
						jQuery.event.handle.apply(self, args);
					} else {
						pX = cX;
						pY = cY;
						timeout = setTimeout(handler, cfg.interval);
					}
				}
				var timeout = setTimeout(handler, cfg.interval);
				target.mousemove(track).mouseout(clear);
				return true;
			}
		};



		$("#accordion").accordion({
			active: settings.activeMenu(),
			icons: false,
			autoHeight: false,
			collapsible: true
		});

		//polozky menu, ktery se nerozbalujou
		$(".disabled").click(function () {
			$.address.path($(this).find("a").attr("href"));
		});

		$("#accordion").accordion({
			change: function (event, ui) {
				settings.activeMenu(ui.options.active);
			}
		});

		var cfg = ($.hoverintent = {
			sensitivity: 700,
			interval: 300
		});



	}

}