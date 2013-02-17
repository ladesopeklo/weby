var GalleryImage = (function () {

	var thumbUrl;
	var smallUrl;
	var mediumUrl;
	var largeUrl;

	function GalleryImage (name, title, thumbsUrl, small, medium, large) {
		this.name = name || "";
		this.title = title || "";
		thumbUrl = thumbsUrl || null;
		smallUrl = small || null;
		mediumUrl = medium || null;
		largeUrl = large || null;
	}

	GalleryImage.prototype.thumb = function () {
		return thumbUrl + this.name;
	};

	GalleryImage.prototype.large = function () {
		return largeUrl + this.name;
	};

	return GalleryImage;
})();
