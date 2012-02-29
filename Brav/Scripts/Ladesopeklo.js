
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

	// http://axx/ #controler/action/param1 
	p1: function () {
		return $.address.pathNames().length > 2 ? $.address.pathNames()[2] : null;
	},
	p2: function () {
		return $.address.pathNames().length > 3 ? $.address.pathNames()[3] : null;
	},

	selected: function (path) {
		function handleselect(s, p) {
			$(s).removeClass("selected");
			$("a[href='#!" + p + "']").addClass("selected");
			//console.log($("a[href='#!" + p + "']"));
		}

		var str = path;
		if (str == undefined) {
			str = $.address.path();
		}
		var x = str.split("/");

		// link /a/b
		if (x.length > 2) {
			handleselect(".ab .selected", x[1] + "/" + x[2]);
		}
		// link /a/b/c
		if (x.length > 3) {
			handleselect(".abc .selected", x[1] + "/" + x[2] + "/" + x[3]);
		}


	}



};

var bravenecHelpers = {
	opacity: function (selector,opacity) {
		if (opacity == null)
			opacity = 0.37;
		if (selector == null)
			selector = '.opacityrollover';
		$(selector).opacityrollover({
			mouseOutOpacity: opacity,
			mouseOverOpacity: 1.0,
			fadeSpeed: 'fast',
			exemptionSelector: '.selected'
		});
	}
};

var galerycontentHelper = {
	
	

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
			url.selected();
		},
		//#!/galerycontent/<galerySection>/<gallery>/<image>
		galerycontent: function (action) {
			var navR = $(".thumbswrap .naviright"),
			    navL = $(".thumbswrap .navleft"),
			    thbList = $(".thumslist");

			function renderThumnsNavi(thumbsList) {
				var current = thbList.find(".selected"),
				    parent = current.closest(".thumbsitem");

				//rotace
				//var next = parent.next().find("a").length > 0 ? parent.next().find("a").attr("href") : thbList.find("a").attr("href");
				var next = parent.next().find("a").length > 0 ? parent.next().find("a").attr("href") : current.attr("href");
				var prev = parent.prev().find("a").length > 0 ? parent.prev().find("a").attr("href") : current.attr("href");

				navL.html($.tmpl("<a href='${href}' title=''><<</a>", { "href": prev }));
				navR.html($.tmpl("<a href='${href}' title=''>>></a>", { "href": next }));

			}

			function renderThumbs(thumbsList) {

				if (thumbsList['galleries']) {
					var len = thumbsList['galleries'].length;
					var x = 8, i = 0;
					while (i < x - len) {
						thumbsList['galleries'].push({ name: null });
						i++;
					}
				}

				var templatelist = template("Content/galerycontent/thumbslist.html");

				thbList.html($.tmpl(templatelist, thumbsList));
				url.selected("/galerycontent/" + action + "/" + galerySection + "/" + image);

				renderThumnsNavi(thumbsList);
			}

			contentMain.html("<p>loading...</p>");

			var galerySection = url.p1();
			var image = url.p2() != null ? url.p2() : 1;
			//vsechny galerie 
			var galerylist = jsonData("galerycontent", action, "Service/gallerylist.php");

			if (!galerySection) {
				galerySection = galerylist.galleries[0].name;
			}

			//data ke konkretni galerii
			var gallerydata = jsonData("galerycontent/" + action, galerySection, "Service/gallery.php");
			renderThumbs(galerylist);



			var img = $.tmpl($("#templateGalleryContent"), gallerydata);
			contentMain.html(img);
			callbacks.gallerycontentCallback();

			bravenecHelpers.opacity();
			bravenecHelpers.opacity(".opacityrollover_min", 0.8);


		},
		gallery: function (action) {
			require(["templates/gallery/gallery.js"], function () {
				$("#contentFigures").html("");
				var cont = template("templates/gallery/content.html");
				var th = template("templates/gallery/thumbs.html");

				var data = jsonData(action, "Service/gallery.php");
				if (!data) return;
				data.culture = settings.culture();

				var xxx = $.tmpl(th, data);
				$("#contentMain").html(cont);
				$("#contentThumbs").html(xxx);
				$("#contentFigures").html(data.figure);

				var x = "a[href='#!" + $.address.path() + "']";

				$("#accordion").find("a.selected").removeClass("selected");
				$(x).addClass("selected");

				bindevents();
			});

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
