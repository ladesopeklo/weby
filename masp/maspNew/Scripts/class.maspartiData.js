var MaspartiData = (function (){
	"use strict";

	/**
	 *
	 * @param {ApiWrapper} api
	 * @constructor
	 */
	function MaspartiData (api) {
		this.api = api;
	}

	MaspartiData.prototype.galleryListAsync = function () {
		var self = this;

		return this.menuAsync().then(function(menuList) {
			var links = menuList.allGalleryLinks();

			return self.api.galleryMap(links).then(function (data) {
				console.log(data);
				return data;
			});

		});
	};

	MaspartiData.prototype.menuAsync = function () {
		return this.api.menu().then(function (data) {
			return data;
		});
	};

	return MaspartiData;
}());