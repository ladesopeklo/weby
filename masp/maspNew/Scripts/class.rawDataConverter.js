/*global MenuItem, GalleryImage*/
var RawDataConverter = (function () {
	"use strict";

	function RawDataConverter() {
	}

	/**
	 *
	 * @param data
	 * @returns {Gallery}
	 */
	RawDataConverter.prototype.rawDataToGallery = function (data) {
		var x ;

		if (!data.images) {
			return null;
		}
		x = JSLINQ(data.images).Select(function (item) {
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
		var x,
			self = this;

		if (!data) {
			return  [];
		}

		x = new JSLINQ(data.items).Select(function (item) {
			var children = item && item.items ? self.rawDataToMenu(item) : [];
			return new MenuItem(item.text, item.href, item.title, children)
		});
		return x.items;
	};

	/**
	 *
	 * @param data
	 */
	RawDataConverter.prototype.rawDataToGalleryMap = function (data) {
		var xx = {};

		if (!data) {
			return {};
		}

		for (var gallery in data) {
			if (data.hasOwnProperty(gallery) && data[gallery].images) {
				xx[gallery] = this.rawDataToGallery(data[gallery])
			}
		}

		return xx;
	};
	/**
	 *
	 * @param data
	 */
	RawDataConverter.prototype.rawDataToGalleryList = function (data) {
		if (!data) {
			return {};
		}
		var xx = [];

		for (var gallery in data) {
			if (data.hasOwnProperty(gallery) && data[gallery].images) {
				xx.push(this.rawDataToGallery(data[gallery]));
			}
		}

		return xx;
	};


	return RawDataConverter;
})();