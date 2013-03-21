/*global MenuItemList, RawDataConverter, GalleryList*/
var ApiWrapper = (function () {

	function ApiWrapper(galleryApi, resourcesApi, cache) {
		this.galleryApi = galleryApi;
		this.resourcesApi = resourcesApi;
		this.cache = cache;
		this.converter = new RawDataConverter();
	}

	ApiWrapper.prototype.getFromCache = function (key) {
		return this.cache ? this.cache.get(key) : null;
	};
	ApiWrapper.prototype.putCache = function (key, value) {
		if (this.cache) {
			this.cache.put(key, value);
		}
	};

	/**
	 *
	 * @param name
	 * @returns {*}
	 * @obsolete
	 */
	ApiWrapper.prototype.gallery = function (name) {
		var self = this,
			deferred = $.Deferred();

		this.galleryApi.gallery({service: "gallery.php"}, {location: name, culture: "cz"}, function (data) {
			deferred.resolve(self.converter.rawDataToGallery(data));
		});
		return deferred;
	};

	ApiWrapper.prototype.gDataGallery = function (name) {
		var self = this,
			key = "gdataGalley" + name,
			cached = this.getFromCache(key),
			deferred = $.Deferred();

		if (cached) {
			deferred.resolve(cached);
			return deferred;
		}

		this.galleryApi.gDataGallery({service: "GDataGallery.php"}, {location: name, culture: "cz"}, function (data) {
				console.log(data);
				var rs = self.converter.rawDataToGDataGallery(data);
				self.putCache(key, rs);
				deferred.resolve(rs);
			},
			function (status) {
				console.log(status);
			});
		return deferred;
	};

	ApiWrapper.prototype.galleryList = function (galleryNames) {
		var self = this,
			deferred = $.Deferred();

		this.galleryApi.galleryList({service: "gallerylist.php"}, {location: galleryNames, culture: "cz"}, function (data) {
			var galleryList = new GalleryList(self.converter.rawDataToGalleryMap(data));
			deferred.resolve(galleryList);
		});
		return deferred;
	};

	ApiWrapper.prototype.galleryMap = function (gallerynames) {
		var self = this,
			deferred = $.Deferred();

		this.galleryApi.galleryList({service: "gallerylist.php"}, {location: gallerynames, culture: "cz"}, function (data) {
			deferred.resolve(self.converter.rawDataToGalleryMap(data));
		});
		return deferred;
	};

	ApiWrapper.prototype.menu = function () {
		var self = this,
			menuList,
			deferred = $.Deferred();

		this.resourcesApi.getAll({resourceName: "menu" }, function (data) {
			menuList = new MenuItemList(self.converter.rawDataToMenu(data));
			deferred.resolve(menuList);
		});
		return deferred;
	};

	ApiWrapper.prototype.locales = function (culture) {
		var deferred = $.Deferred();

		this.resourcesApi.getAllLocales({resourceName: culture }, function (data) {
			deferred.resolve(new Locales(data, culture));
		});
		return deferred;
	};

	return ApiWrapper;
}());