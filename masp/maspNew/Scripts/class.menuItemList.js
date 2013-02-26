var MenuItemList = (function () {
	"use strict";

	function MenuItemList(menuItems) {
		this.items = menuItems || [];
	}


	MenuItemList.prototype.xxx = function (type) {

	};

	/**
	 *
	 * @param {MenuItem.ItemTypes} type
	 * @constructor
	 */
	MenuItemList.prototype.links = function (type) {
		console.log(this.items)
	};

	return MenuItemList;
}());
