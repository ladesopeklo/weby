var GalleryList = (function () {
	"use strict";

	/**
	 *
	 * @constructor
	 * @param {Object.<Gallery>} galleriesMap
	 */
	function GalleryList(galleriesMap) {
		this.galleriesMap = galleriesMap || {};
		this.length = this.length();
		this.galleriesArray = this.toArray();
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

	GalleryList.prototype.toArray = function () {
		var property,
			result = [];

		for (property in this.galleriesMap) {
			if (this.galleriesMap.hasOwnProperty(property)) {
				result.push(this.galleriesMap[property]);
			}
		}
		return result;
	};

	GalleryList.prototype.get = function (name) {
		return this.galleriesMap[name];
	};

	GalleryList.prototype.galleryThumbs = function () {
		var property,
			result = [];

		for (property in this.galleriesMap) {
			if (this.galleriesMap.hasOwnProperty(property)) {
				result.push(this.galleriesMap[property].galleryThumb(property));
			}
		}
		return result;
	};

	return GalleryList;
}());
