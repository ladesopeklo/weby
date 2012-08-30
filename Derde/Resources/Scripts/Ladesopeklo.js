
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
			/*if ($.address.pathNames().length < 2) {
				return settings.controller;
			}*/
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

var Cache = function () {
	var c = new Array();

	var contains = function (key) {
		if (!c) return false;
		return c[key] != null;
	};

	return {
		reset: function () {
			$.clean(c);
		},
		get: function (key) {
			if (contains(key)) {
				return c[key];
			}
		},

		set: function (key, value) {
			c[key] = value;
		},

		has: function (key) {
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

	selected: function (path, reset) {
		function handleselect(s, p) {
			$(s).removeClass("selected");
			$("a[href='#!" + p + "']").addClass("selected");
			//console.log($("a[href='#!" + p + "']"));
		}

		var str = path;
		if (str == undefined || str == null) {
			str = $.address.path();
		}
		var x = str.split("/");

		// link /a
		if (x.length > 1 || reset) {
			handleselect(".a .selected", x[1]);
		}
		// link /a/b
		if (x.length > 2 || reset) {
			handleselect(".ab .selected", x[1] + "/" + x[2]);
		}
		// link /a/b/c
		if (x.length > 3 || reset) {
			handleselect(".abc .selected", x[1] + "/" + x[2] + "/" + x[3]);
		}


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
			//cache: cache,
			contentType: "application/xml",
			//setRequestHeader("Content-Type", "application/xml"),
			success: function (data, x, h) {
				if (cache) c.set(url, data);

			}
		});
		//ret.header("content-type:application/xml;charset=utf-8");
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

	var displayContent = function (t) {
		contentMain.html(t);
	};

	//getne "count" novinek, veme vsechny pro count =0 
	var getNovinkyList = function (count) {
		var list = jsonData(null, "Novinky", "Service/listCulture.php");
		var len = list.length > count ? count : list.length;
		var ret = new Array();
		for (var i = 0; i < len; i++) {
			var item = getnovinka(list[i]);
			item.linkname = list[i];
			ret.push(item);
		}

		return ret;

	};

	var loading = function (elem) {
		if (!elem) {
			elem = contentMain;
		}
		elem.html("<p>loading..</p>");
	};
	var getnovinka = function (name) {
		var nka = template("Content/Novinky/" + name + "." + settings.culture() + ".html");

		var ret = {
			date: $(nka).find("date").text(),
			header: $(nka).find("header").text(),
			contentheader: $(nka).find("contentheader").html(),
			contentmain: $(nka).find("contentmain").html()
		};

		return ret;
	};

	return {
		resetCache: function () {
			c.reset();
		},
		culture: function () {
			var a = "#" + settings.culture();
			$(a).closest(".language").find(".selected").removeClass("selected");
			$(a).addClass("selected");
		},
		home: function () {
			loading();
			var t = $.tmpl($("#template_home"), { data: getNovinkyList(3) });
			displayContent(t);
			callbacks.homeCallback(
			//handler pro reseni prepinani novinek v intru 
				function (name) {
					var context = $(".introboxcontent");
					var nov = getnovinka(name);

					context.find(".intrheader").stop(false, true).fadeOut(100, function () {
						$(this).html(nov.header).fadeIn("slow");
					});
					context.find(".intrcontent").stop(false, true).fadeOut(100, function () {
						$(this).html(nov.contentheader).fadeIn(1000);
					});
					return false;
				}
			);

			url.selected(null, true);
		},
		content: function (action) {
			loading();
			var t = template("Content/" + action + "." + settings.culture() + ".html");
			displayContent(t);
			if (action == "kontakt") {
				callbacks.kontaktCallback();
			}
			url.selected();
		},
		novinky: function () {
			loading();
			var t = template("Content/template_novinkylistItem.html");
			var list = jsonData(null, "Novinky", "Service/listCulture.php");

			contentMain.html("");
			$.each(list, function (i, value) {
				$.tmpl(t, getnovinka(value)).appendTo(contentMain);
			});


			url.selected(null, true);
		},

		novinkyThumbs: function () {
			return getNovinkyList(4);
		},

		novinka: function (name) {
			loading();
			var t = template("Content/template_novinky.html");
			var xxx = $.tmpl(t, getnovinka(name));
			displayContent(xxx);
			url.selected(null);

			$(document).scrollTop(0);

		}


	};

};

var Core = function (settings, loader) {

	var currentController,
		currentAction,
		currenthash;

	function refreshPage() {
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
			case "novinka":
				loader.novinka(a);
				saveState(c, a);
				break;
			case "novinky":
				loader.novinky(a);
				saveState(c, a);
				break;
			case "intronovinka":
				loader.intronovinka(a);
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
			case "novinkyThumbs":
				return loader.novinkyThumbs(a);
			case "reset":
				loader.resetCache();
				break;
			default:
				loader.home(a);
				saveState(c, a);
				;
		}

	}

	var ccc;
	var aaa;
	function loadContent() {
		//console.log(settings.controller(), settings.action());
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
		},
		Load: function (controller, action) {
			load(controller, action);
		},
		LoadTo: function (controller, action, destination, template) {

			destination.html("<p>Loading...</p>");
			var c = load(controller, action);

			if ($(template).length > 0) {
				var jqTemplate = $(template).template('jqTemplate');
				var html = $.tmpl(jqTemplate, { data: c });
				destination.html(html);

				return;
			}
			destination.html(c);
		}
	};

};
