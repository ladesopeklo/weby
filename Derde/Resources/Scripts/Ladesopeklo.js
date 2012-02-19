
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
			console.log($("a[href='#!" + p + "']"));
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

var galerycontentHelper = {
	
	

};

var Loader = function (cache, settings) {
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
	var contentIntro = $("#contentIntro");
	return {
		culture: function () {
			var a = "#" + settings.culture();
			$(a).closest(".language").find(".selected").removeClass("selected");
			$(a).addClass("selected");
		},
		home: function () {
			contentMain.hide();
			contentIntro.fadeIn();
			url.selected();
		},
		content: function (action) {
			contentIntro.hide();
			contentMain.show();
			var t = template("Content/" + action + "." + settings.culture() + ".html");
			contentMain.html(t);
			url.selected();
		}
	};

};

var Core = function (cache, settings) {
	var loader = new Loader(cache, settings);
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
