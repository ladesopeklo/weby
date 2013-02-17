var RawDataConverter = (function () {

	function RawDataConverter() {
	}

	/**
	 *
	 * @param data
	 * @returns {Gallery}
	 */
	RawDataConverter.prototype.rawDataToGallery = function (data) {
		var x = JSLINQ(data.images).Select(function (item) {
			return new GalleryImage(item.name, item.title, data.thumb, null, null, data.full);
		});
		return new Gallery(x.items);
	};

	/**
	 *
	 * @param data
	 * @returns {Array.<MenuItem>}
	 */
	RawDataConverter.prototype.rawDataToMenu = function (data) {
		var self = this;
		if (!data){
			return  [];
		}
		var x = JSLINQ(data.items).Select(function (item) {
			var children = item && item.items ? self.rawDataToMenu(item) : [];
			return new MenuItem(item.text, item.href, item.title, children)
		});
		return x.items;
	};


	return RawDataConverter;
})();