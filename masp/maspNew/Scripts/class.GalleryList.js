var MenuItem = (function () {

	function MenuItem (text, link, title, children) {
		this.link = link || "";
		this.text = text || {};
		this.title = title || {};
		this.items = children || [];
	}

	return MenuItem;
})();
