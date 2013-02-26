/*global MenuItemList, RawDataConverter*/
var ApiWrapper = (function () {

	function ApiWrapper(galleryApi, menuApi) {
		this.galleryApi = galleryApi;
		this.menuApi = menuApi;
		this.converter = new RawDataConverter();
	}

	ApiWrapper.prototype.gallery = function (name) {
		var self = this,
			deferred = $.Deferred();

		this.galleryApi.gallery({service: "gallery.php"}, {location: name, culture: "cz"}, function (data) {
			deferred.resolve(self.converter.rawDataToGallery(data));
		});
		return deferred;
	};

	ApiWrapper.prototype.galleryList = function (gallerynames) {
		var self = this,
			deferred = $.Deferred();

		this.galleryApi.galleryList({service: "gallerylist.php"}, {location: gallerynames, culture: "cz"} , function (data) {
			deferred.resolve(self.converter.rawDataToGalleryList(data));
		});
		return deferred;
	};

	ApiWrapper.prototype.galleryMap = function (gallerynames) {
		var self = this,
			deferred = $.Deferred();

		this.galleryApi.galleryList({service: "gallerylist.php"}, {location: gallerynames, culture: "cz"} , function (data) {
			deferred.resolve(self.converter.rawDataToGalleryMap(data));
		});
		return deferred;
	};

	ApiWrapper.prototype.menu = function () {
		var self = this,
			menuList,
			deferred = $.Deferred();

		this.menuApi.getAll(function (data) {
			menuList = new MenuItemList(self.converter.rawDataToMenu(data));
			deferred.resolve(menuList);
		});
		return deferred;
	};

	return ApiWrapper;
}());