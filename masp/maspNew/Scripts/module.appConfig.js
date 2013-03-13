angular.module('appConfigModule', [])
	.value("appConfig", {
		debug: true,
		baseUrl: "/weby/masp/maspnew"
		//baseUrl: "/maspNew"
	})
	.factory("chujFactory", function () {
		return "laskndalksd" + $(window).width();
	})
;
