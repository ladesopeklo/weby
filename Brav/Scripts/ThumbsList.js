
var ThumbsList = function (template) {
	var navR = $(".thumbswrap .naviright"),
			    navL = $(".thumbswrap .navleft"),
			    thbList = $(".thumslist");

	function renderThumnsNavi() {
		var current = thbList.find(".selected"),
		parent = current.closest(".thumbsitem");

		//var next = parent.next().find("a").length > 0 ? parent.next().find("a").attr("href") : thbList.find("a").attr("href");
		var next = parent.next().find("a").length > 0 ? parent.next().find("a").attr("href") : current.attr("href");
		var prev = parent.prev().find("a").length > 0 ? parent.prev().find("a").attr("href") : current.attr("href");

		navL.html($.tmpl("<a href='${href}' title=''><<</a>", { "href": prev }));
		navR.html($.tmpl("<a href='${href}' title=''>>></a>", { "href": next }));
	}

	return {
		renderThumbs: function (thumbsList, action, gallery) {
			if (thumbsList['galleries']) {
				var len = thumbsList['galleries'].length;
				var x = 10, i = 0;
				while (i < x - len) {
					thumbsList['galleries'].push({ name: null });
					i++;
				}
			}
			thbList.html($.tmpl(template, thumbsList));

			url.selected( action + "/" + gallery );

			renderThumnsNavi(thumbsList);
			bravenecHelpers.opacity();
		}

	};
}