/// <reference path="ThumbsList.js" />
/// <reference path="require.js" />
 


var Settings = function (options) {
	var defaults = {
		controller: 'home',
		action: 'index',
		culture: 'cs',
		activeMenuDefault: -1
	};
	var settings = $.extend({}, defaults, options);

	var get = function () {
		return amplify.store("brav") || {};
	};
	var save = function (value) {
		return amplify.store("brav", value);
	};

	return {
		activeMenu: function (c) {
			if (c != null) {
				var a = get();
				a.activeMenuvalue = c;
				save(a);
				return 0;
			}
			if ($.address.pathNames() < 2) {
				return settings.activeMenuDefault;
			}
			var x = get().activeMenuvalue != null ? get().activeMenuvalue : settings.activeMenuDefault;
			return x;
		},
		controller: function (c) {
			if (c) {
				var a = get();
				a.controller = c;
				save(a);
				return 0;
			}
			if ($.address.pathNames().length < 2) {
				return settings.controller;
			}
			return $.address.pathNames()[0];

		},
		action: function (c) {
			if (c) {
				var a = get();
				a.action = c;
				save(a);
				return 0;
			}
			if ($.address.pathNames().length < 2) {
				return settings.action;
			}
			return $.address.pathNames()[1];
		},
		culture: function (c) {
			if (c) {
				if (c == "cs" || c == "en") {
					var a = get();
					a.culture = c;
					save(a);
					return 0;
				}
			}
			return get().culture || settings.culture;
		}

	};
};
	
var Cache = function() {
		var c = new Array();

		var contains = function(key) {
			if (!c) return false;
			return c[key] != null;
		};

		return {
			get: function(key) {
				if (contains(key)) {
					return c[key];
				}
			},

			set: function(key, value) {
				c[key] = value;
			},

			has: function(key) {
				return contains(key);
			}

		};
};

var url = {

	// http://axx/ #controler/action - > [controler, action]
	pathnames: function () {
		return $.address.pathNames();
	},

	// http://axx/ #controler/action/p1 
	p1: function () {
		return $.address.pathNames().length > 2 ? $.address.pathNames()[2] : null;
	},
	p2: function () {
		return $.address.pathNames().length > 3 ? $.address.pathNames()[3] : null;
	},

	selected: function (path) {
		function handleselected(s, p) {
			$(s).removeClass("selected");
			$("a[href='#!" + p + "']").addClass("selected");
			//console.log($("a[href='#!" + p + "']"));
		}

		var str = path;
		if (str == undefined) {
			str = $.address.path();
		}
		var urlPath = str.split("/");

		// link /a/b
		if (urlPath.length > 2) {
			handleselected(".ab .selected", urlPath[1] + "/" + urlPath[2]);
		}
		// link /a/b/c
		if (urlPath.length > 3) {
			handleselected(".abc .selected", urlPath[1] + "/" + urlPath[2] + "/" + urlPath[3]);
		}
	}
};

var bravenecHelpers = {

    opacity: function (selector, opacity) {
		if (opacity == null)
			opacity = 0.37;
		if (selector == null)
			selector = '.opacityrollover';
		$(selector).opacityrollover({
			mouseOutOpacity: opacity,
			mouseOverOpacity: 1.0,
			fadeSpeed: '100',
			exemptionSelector: '.selected'
		});
	},
	lazyload: function () {
        var x = $(".lazy[src^='Res']");
        x.lazyload({
			skip_invisible: false
		});
	}
};


var Loader = function (cache, settings, callbacks) {
	var c = new Cache();
	var self = this;

	var template = function (url) {
		if (cache)
			if (c.has(url)) {
				return c.get(url);
			}

		var ret = $.ajax({
			url: url,
			async: false,
			cache: cache,
			success: function (data) {
				if (cache) c.set(url, data);
			}
		});
		return ret.responseText;
	};

	var jsonData = function (controller, action, url) {
		try {
			var ret = $.ajax({
				type: "POST",
				data: { action: action, controller: controller, culture: settings.culture() },
				url: url,
				async: false,
				success: function (data) {
				}
			});

			return $.parseJSON(ret.responseText);
		}
		catch (ex) {
			alert("Chyba - nelze načíst, omlouváme se");
			console.log(ex);
		}
		return null;
	};
	var contentMain = $("#contentMain");
	//var contentMainDolni = $("#contentMainDolni");
	var getCurrenGallery = function (galleryList) {
		var current = url.p1();
		if (!current) {
			current = galleryList.galleries[0].name;
		}
		return current;
	};
    var xxx;

	return {
		culture: function () {
			var a = "#" + settings.culture();
			$(a).closest(".language").find(".selected").removeClass("selected");
			$(a).addClass("selected");
		},
		home: function () {
			var t = template("templates/intro/contentThumbs.html");
			var m = template("templates/intro/contentMain.html");
			$("#contentThumbs").html(t);
			contentMain.html(m);
			$("#contentFigures").html("");

			require(["templates/intro/slider.js"]);
		},
		menu: function () {
			require(["templates/menu1/menu.js"], function () {
				var t = template("templates/menu1/menu.html");
				var data = jsonData(null, "Content/menu.json");

				data.culture = settings.culture();

				var xxx = $.tmpl(t, data);
				$("#menu").html(xxx);

				menu.bindevents();
			});
		},
		content: function (action) {
			var t = template("Content/" + action + "." + settings.culture() + ".html");
			$("#contentMain").html('<div class="right">' + t + '</div>');

			var galerylist = jsonData("galerycontent", "ocenenestavby", "Service/gallerylist.php");

			new ThumbsList(template("Content/galerycontent/thumbslist.html")).renderThumbs(galerylist, "/galerycontent/ocenenestavby", null);

			url.selected();
		},
		//#!/galerycontent/<galerySection>/<gallery>/<image>
		galerycontent: function (action) {
			contentMain.html("<p>loading...</p>");


            //vsechny galerie
			var galerylist = jsonData("galerycontent", action, "Service/gallerylist.php");
            var currentGallery = getCurrenGallery(galerylist);
            var galleryParentPath = "/galerycontent/" + action;

            new ThumbsList(template("Content/galerycontent/thumbslist.html"))
                .renderThumbs(galerylist, galleryParentPath, currentGallery);


			//data ke konkretni galerii
			var gallerydata = jsonData(galleryParentPath, currentGallery, "Service/gallery.php");
			var img = $.tmpl($("#templateGalleryContent"), gallerydata);

			contentMain.html(img);
			callbacks.gallerycontentCallback();
			bravenecHelpers.opacity(".opacityrollover_min", 0.8);
		}

	};

};

var Core = function (settings, loader) {

	var currentController,
		currentAction,
		currenthash;

	function refreshPage() {
		//	loader.menu();
		$.address.path(currenthash);
		load(currentController, currentAction);
	}
	function saveState(c, a) {
		currentController = c; currentAction = a;
		currenthash = $.address.path();

		settings.action(a);
		settings.controller(c);
	}

	function load(c, a) {
		switch (c) {
			case "home":
				loader.home(a);
				saveState(c, a);
				break;
			case "gallery":
				loader.gallery(a);
				saveState(c, a);
				break;
			case "content":
				loader.content(a);
				saveState(c, a);
				break;
			case "galerycontent":
				loader.galerycontent(a, url.pathnames());
				saveState(c, a);
				break;
			case "culture":
				settings.culture(a);
				loader.culture(a);
				refreshPage();
				break;
			default: refreshPage();
		}
	}

	var ccc;
	var aaa;
	function loadContent() {
		load(settings.controller(), settings.action());
		ccc = settings.controller();
		aaa = settings.action();
		bravenecHelpers.lazyload();
	};

	return {
		Init: function () {
			loader.culture();
			$.address.change(function (e) {
				loadContent();
			});
		}
	};

};
