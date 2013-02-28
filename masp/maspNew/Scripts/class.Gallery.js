var Gallery = (function () {
	/**
	 *
	 * @param {Array.<GalleryImage>} galleryImages
	 * @constructor
	 */
	function Gallery(galleryImages) {
		this.images = galleryImages || [];
	}

	Gallery.prototype.galleryThumb = function () {
		return this.images[0];
	};

	return Gallery;
}());
