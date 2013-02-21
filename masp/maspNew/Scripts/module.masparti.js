var module = angular.module("masparti", ['apiModule']);

module.config(['$routeProvider', '$provide', function ($routeProvider, $provide) {
	$routeProvider
		.when('/gallery', {
			controller: galleryController,
			templateUrl: 'gallery.html'}
		)
		.when('', {
			controller: homeController,
			templateUrl: 'home.html'}
		)
		.otherwise({redirectTo: ''});
}]);