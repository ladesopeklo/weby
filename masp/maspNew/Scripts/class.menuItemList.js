var MenuItemList = (function () {
	"use strict";

	/**
	 *
	 * @param menuItems
	 * @constructor
	 */
	function MenuItemList(menuItems) {
		this.items = menuItems || [];
	}

	MenuItemList.prototype.xxx = function (type) {

	};

	/**
	 *
	 * @public
	 */
	MenuItemList.prototype.allGalleryLinks = function () {
		var links = [];

		for (var i = 0; i < this.items.length; i++) {
			links = links.concat(this.items[i].childrenItemsLinks(MenuItem.ItemTypes.Gallery));
		}
		return links;
	};

	return MenuItemList;
}());
