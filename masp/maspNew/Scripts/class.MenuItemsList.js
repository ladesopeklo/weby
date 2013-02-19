var MenuItemsList = (function () {

	function MenuItemsList() {
	}

	/**
	 *
	 * @param data
	 * @returns {Gallery}
	 */
	MenuItemsList.prototype.rawDataToGallery = function (data) {
		var x = JSLINQ(data.images).Select(function (item) {
			return new GalleryImage(item.name, item.title, data.thumb, null, null, data.full);
		});
		return new Gallery(x.items);
	};


	return MenuItemsList;
})();