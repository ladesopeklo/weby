var Gallery = (function () {
	/**
	 *
	 * @param {Array.<GalleryImage>} galleryImages
	 * @constructor
	 */
	function Gallery (galleryImages) {
		this.images = galleryImages || [];
	}

	return Gallery;
})();
