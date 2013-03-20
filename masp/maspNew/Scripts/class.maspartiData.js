var MaspartiData = (function () {
	"use strict";

	/**
	 *
	 * @param {ApiWrapper} api
	 * @constructor
	 */
	function MaspartiData(api) {
		this.api = api;
	}

	MaspartiData.prototype.galleryListLocalizedAsync = function () {
		var self = this,
			deferred = $.Deferred();

		$.when(
				this.api.locales("en-us")
			)
			.done(function (locales) {
				var links = locales.allGalleryLinks();

				self.api.galleryList(links).then(function (data) {
					data.loadLocalizations(locales);
					deferred.resolve(data);
				});
			});
		return deferred;
	};

	MaspartiData.prototype.menuAsync = function () {
		return this.api.menu().then(function (data) {
			return data;
		});
	};

	MaspartiData.prototype.gallery = function (galleryId) {
		return this.api.gallery(galleryId).then(function (data) {
			return data;
		});
	};

	MaspartiData.prototype.gDataGallery = function (galleryId) {
		return this.api.gDataGallery(galleryId).then(function (data) {
			return data;
		});
	};

	MaspartiData.prototype.galleryWithInfo = function (galleryId) {
		var deferred = $.Deferred();

		$.when(
				this.api.gallery(galleryId),
				this.api.locales("en-us")
			).done(function (gallery, locales) {
				gallery.locales = locales.t("gallery")[galleryId];
				deferred.resolve(gallery);
			});

		return deferred
	};

	return MaspartiData;
}());