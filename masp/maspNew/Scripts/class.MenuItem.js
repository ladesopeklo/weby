var MenuItem = (function () {
	"use strict";

	function MenuItem(text, link, title, children) {
		this.link = link || "";
		this.text = text || {};
		this.title = title || {};
		this.items = children || [];
	}

	/**
	 *
	 * @private
	 * @param link
	 */
	MenuItem.prototype.parseLink = function (link) {
		return link ? link.split("/") : [];
	};

	MenuItem.prototype.linkValue = function () {
		var split = this.parseLink(this.link);
		return split.length > 1 ? split[1] : split[0];
	};

	MenuItem.prototype.linkType = function () {
		var split = this.parseLink(this.link);
		return split.length > 1 ? split[0] : null;
	};


	MenuItem.prototype.childrenItemsLinks = function (type) {

		var links = JSLINQ(this.items).Select(function (menuItem) {
			if (type) {
				return type === menuItem.linkType() ? menuItem.linkValue() : null;
			} else {
				return menuItem.linkValue();
			}


		});
		return links.items;
	};

	MenuItem.ItemTypes = {
		Gallery: "gallery",
		Content: "content"
	};

	return MenuItem;
}());
