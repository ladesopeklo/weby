/*global MenuItem */
var Locales = (function () {
	"use strict";

	/**
	 *
	 * @constructor
 * @param cultureCode
	 */
	function Locales(items, cultureCode) {
		this.culture = cultureCode || "XXXXX";
		this.items = items || {};
	}

	Locales.prototype.allGalleryLinks = function () {
		var galleryIds = [];

		for (var property in this.items.gallery) {
			if (this.items.gallery.hasOwnProperty(property)){
				galleryIds.push(property);
			}
		}
		return galleryIds;
	};
	/**
	 *
	 * @param {string} key
	 */
	Locales.prototype.t = function (key) {
		var split = key.split("."),
			source = this.items;

		for (var i= 0; i < split.length; i++) {
			var x = source[split[i]];

			if (x === undefined){
				x = "";
				break;
			}
			source = x;
		}
		return x;

	};

	return Locales;
}());
