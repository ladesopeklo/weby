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

	MenuItemList.prototype.convert = function (data, culture) {
		var x,
			self = this;

		if (!data) {
			return  [];
		}

		x = new JSLINQ(data).Select(function (item) {
			item && item.items ? self.convert(item.items, culture) : [];

			var linkType = item.linkType(),
				linkValue = item.linkValue();

			if (linkType && linkValue){
				self.temp[linkType][linkValue] = {};
				self.temp[linkType][linkValue].title = item.title[culture];
				self.temp[linkType][linkValue].text = item.text[culture];
			}
		});
		return x.items;

	};


	MenuItemList.prototype.toLocales = function (culture) {
		this.temp = {
			gallery : {},
			content: {}
		};

		this.convert(this.items, culture);
		return this.temp;
	};

	return MenuItemList;
}());
