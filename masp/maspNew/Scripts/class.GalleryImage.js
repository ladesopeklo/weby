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
		this.url = url || "";
		this.width = Number(width, 10) || -1;
		this.height = Number(height, 10) || -1;
	}
	return WebImage;
}());


var GDataImage = (function () {

	function GDataImage() {
		this.id;
		this.albumId = null;
		this.version = -1;
		this.title = null;
		this.keywords = "";

		this.small;
		this.medium;
		this.large;
		this.xlarge;
		this.fullsize;

		this.position = new Position();
	}

	GDataImage.prototype.fromRawGData = function (i) {
		this.id = i.id;
		this.albumId = i.albumId;
		this.version = Number(i.version, 10) || -1;
		this.title = i.title;
		this.keywords = i.keywords !== undefined ? i.keywords.split(",") : [];
		this.description = i.description;

		this.small = i.small !== undefined ? new WebImage(i.small.url, i.small.width, i.small.height) : null;
		this.medium = i.medium !== undefined ? new WebImage(i.medium.url, i.medium.width, i.medium.height) : null;
		this.large = i.large !== undefined ? new WebImage(i.large.url, i.large.width, i.large.height) : null;
		this.xlarge = i.xlarge !== undefined ? new WebImage(i.xlarge.url, i.xlarge.width, i.xlarge.height) : null;
		this.fullsize = i.fullsize !== undefined ? new WebImage(i.fullsize.url, i.fullsize.width, i.fullsize.height) : null;

		this.width = this.small.width;
		this.height = this.small.height;

		return this;

	};

	GDataImage.prototype.getSmall = function () {
		return this.small.url;
	};

	GDataImage.prototype.getLarge = function () {
		return this.fullsize.url;
	};


	return GDataImage;
}());

