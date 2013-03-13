/*galobal Position*/
var GalleryImage = (function () {

	function GalleryImage(name, title, thumbsUrl, small, medium, large) {
		this.name = name || "";
		this.title = title || "";
		this.thumbUrl = thumbsUrl || null;
		this.smallUrl = small || null;
		this.mediumUrl = medium || null;
		this.largeUrl = large || null;
		this.position = new Position();

		var random =  Math.random()*2.5;
		this.width = Math.floor( random * 90) + 45;
		this.height = Math.floor( random * 50) + 25;

		this.galleryId = undefined;
	}

	GalleryImage.prototype.thumb = function () {
		return this.thumbUrl + this.name;
	};

	GalleryImage.prototype.large = function () {
		return this.largeUrl + this.name;
	};

	GalleryImage.prototype.setGalleryId = function (id) {
		this.galleryId = id;
		return id;
	};

	return GalleryImage;
}());

var WebImage = (function () {
	function WebImage(url, width, height) {
		this.url = url;
		this.width = width;
		this.height = height;
	}
	return WebImage;
}());


var GDataImage = (function () {

	function GDataImage() {
		this.id;
		this.albumId;
		this.version;
		this.title;
		this.keywords;

		this.small;
		this.medium;
		this.large;
		this.xlarge;
		this.fullsize;

		this.position = new Position();
	}

	return GDataImage;
}());

