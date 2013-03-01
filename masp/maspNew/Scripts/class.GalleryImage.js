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

		this.galleryId = "xxx";
	}

	GalleryImage.prototype.thumb = function () {
		return this.thumbUrl + this.name;
	};

	GalleryImage.prototype.large = function () {
		return this.largeUrl + this.name;
	};

	GalleryImage.prototype.setGalleryId = function (id) {
		return this.galleryId = id;
	};

	return GalleryImage;
}());
