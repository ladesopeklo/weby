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

	var Loader = function (cache) {
		var c = new Cache();

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

		var jsonData = function (action, url) {
			try {
				var ret = $.ajax({
					type: "POST",
					data: { location: action, culture: settings.culture() },
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
				$("#contentMain").html(m);
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
				$("#contentMain").html(t);
				$("#contentThumbs").html("");
				$("#contentFigures").html("");
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

	var Settings = function (options) {
		var defaults = {
			controller: 'home',
			action: 'index',
			culture: 'cs',
			activeMenuDefault: -1
		};
		var settings = $.extend({}, defaults, options);

		var get = function () {
			return amplify.store("snapshot") || {};
		};
		var save = function (value) {
			return amplify.store("snapshot", value);
		};


		return {
			activeMenu: function (c) {
				if (c != null) {
					var a = get();
					a.activeMenuvalue = c;
					save(a);
					return;
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
					return;
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
					return;
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
						return;
					}
				}
				return get().culture || settings.culture;
			}

		};
	};
	

	var Core = function (cache) {
		var loader = new Loader(cache);
		var currentController,
		currentAction,
		currenthash;

		function refreshPage() {
			loader.menu();
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

			if (ccc == settings.controller() && aaa == settings.action()) {
				currenthash = $.address.path();
				return;
			}
			load(settings.controller(), settings.action());
			ccc = settings.controller();
			aaa = settings.action();

		};

		return {
			Init: function () {

				loader.menu();

				loader.culture();
				$.address.change(function (event) {

					//console.log(settings.controller() + "/" + settings.action() + "/" + settings.culture());
					loadContent();


				});

			}
		};

	};
