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

			scope.$watch("item.position", function (newposition, oldposition) {
				var pos = newposition;

				iElement.css("-webkit-transform", "translate3d(" + pos.x1 + "px, " + pos.y1 + "px, 0px)");
				iElement.css("width", item.width + "px");
				iElement.css("height", item.height + "px");

			})
		}
	};
});