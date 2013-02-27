var GalleryList = (function () {
	"use strict";

	/**
	 *
	 * @constructor
	 * @param galleriesMap
	 */
	function GalleryList(galleriesMap) {
		this.galleriesMap = galleriesMap || {};
		this.length = this.length();
	}

	GalleryList.prototype.length = function () {
		var property,
			count = 0;

		for (property in this.galleriesMap) {
			if (this.galleriesMap.hasOwnProperty(property)) {
				count++;
			}
		}
		return count;
	};

	GalleryList.prototype.get = function (name) {
		console.log(this.galleriesMap)
		return this.galleriesMap[name];
	};

	return GalleryList;
}());
