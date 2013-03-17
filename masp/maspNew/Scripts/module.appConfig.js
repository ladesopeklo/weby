angular.module('appConfigModule', [])
	.value("appConfig", {
		debug: true,
		baseUrl: "/masp/maspnew"
		//baseUrl: "/maspNew"
	})
	.factory("chujFactory", function () {
		return "laskndalksd" + $(window).width();
	})
;
