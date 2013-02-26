var MenuItem = (function () {
	"use strict";

	function MenuItem(text, link, title, children) {
		this.link = link || "";
		this.text = text || {};
		this.title = title || {};
		this.items = children || [];
	}

	MenuItem.prototype.childrenItemsLinks = function (type) {

		var links = JSLINQ(this.items).Select(function (menuItem) {
			var split = menuItem.link ? menuItem.link.split("/") : [];
			var value = split.length > 1 ? split[1] : split[0];
			var itemLinkType = split.length > 1 ? split[0] : null;

			if (type) {
				return type === itemLinkType ? value : null;
			} else {
				return value;
			}

		});
		return links.items;
	};

	MenuItem.itemTypes = {
		Gallery: "gallery",
		Content: "content"
	};

	return MenuItem;
}());
