var module = angular.module("masparti", ['apiModule']);

module.config(['$routeProvider', '$provide', function ($routeProvider) {
	$routeProvider
		.when('/gallery/:galleryId', {controller: galleryController, templateUrl: 'gallery.html'})
		.when('/home', {controller: homeController, templateUrl: 'home.html'})
		.when('/x', {controller: xController, templateUrl: 'x.html'})

		.otherwise({redirectTo: '/home'});
}]);

module.directive("ngcGalleryItem", function () {
	return {
		galleryItem: "=",
		link: function (scope, iElement, tAttrs, controller) {
			var item = scope.item;
			var pos = scope.item.position;

			console.log(scope)
			scope.$watch("item.position.x1", function (a, b) {
				console.log("chuj", a, b, item.position);

				iElement.css("-webkit-transform", "translate3d(" + a + "px, " + pos.y1 + "px, 0px)");
				iElement.css("width", item.width + "px");
				iElement.css("height", item.height + "px");

			})
		}
	};
});