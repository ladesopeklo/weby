var module = angular.module("masparti", ['apiModule']);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("masparti");
}]);

module.config(['$routeProvider', '$provide', function ($routeProvider) {
	$routeProvider
		.when('/g/:galleryId', {controller: gController, templateUrl: 'g.html'})
		.when('/gallery/:galleryId', {controller: galleryController, templateUrl: 'gallery.html'})
		.when('/g/:galleryId/:imageIndex', {controller: galleryImageController, templateUrl: 'galleryImage.html'})
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

				var translate = "translate3d(" + pos.x1 + "px, " + pos.y1 + "px, 0px)";
				iElement.css("-webkit-transform", translate);
				iElement.css("-moz-transform", translate);
				iElement.css("transform", translate);

				iElement.css("-ms-transform", "translate(" + pos.x1 + "px, " + pos.y1 + "px)");

				iElement.css("width", item.width + "px");
				iElement.css("height", item.height + "px");
			})
		}
	};
});

module.directive("ngcResponsiveImg", function () {
	var getWidth = function (scope) {
		return scope.windowWidth;
	};

	var imageByWindowSize = function (windowWidth, galleryImage) {
		console.log(galleryImage)
		var imageUrl = galleryImage.getLarge();

		if (windowWidth >= 768 && windowWidth < 1200) {
			imageUrl = galleryImage.getLarge();
		}
		if (windowWidth >= 480 && windowWidth < 768) {
			imageUrl = galleryImage.getLarge();
		}

		if (windowWidth < 480) {
			imageUrl = galleryImage.getSmall();
		}

		return imageUrl;
	};

	var getImage = function (url, scope) {
		var image = new Image(),
			x;

		image.src = url;
		x = $.Deferred();

		$(image).load(function () {
			x.resolve(this);
		});

		return x.promise();
	};

	var renderImage = function (scope) {
		var imageOverFlows = getWidth(scope) < scope.imageWidth;

		if (imageOverFlows) {
			scope.containerWidth = null;
		} else {
			scope.containerWidth = scope.imageWidth;
		}
	};

	var renderImageFullSize = function (scope) {
		scope.containerWidth = scope.imageWidth;
	};

	var refreshImage = function (scope, galleryImage) {
		var windowWidth = getWidth(scope),
			url = imageByWindowSize(windowWidth, galleryImage);

		getImage(url, scope).then(function (image) {
			scope.imageWidth = image.width;
			renderImage(scope);
			scope.source = url;
			scope.$apply();
		});
	};

	return {
		scope: {
			galleryImage: "="
		},
		controller: function ($scope) {
			$scope.containerWidth = "55";
			$scope.windowWidth = $(window).width();
			$scope.isFullSize = function () {
				return $scope.imageWidth <= $scope.containerWidth;
			};

			$scope.isFullSizeCssClass = function () {
				if ($scope.isFullSize() && $scope.windowWidth < $scope.imageWidth ){
					return "show low";
				}
				if (!$scope.isFullSize()){
					return "show full";
				}
				return "hide";
			};

			$scope.showFullSize = function () {
				if ($scope.isFullSize()) {
					renderImage($scope);
				}
				else {
					renderImageFullSize($scope);
				}
			};
			$scope.getCssWidth = function (width) {
				return width === null ? "auto" : width + "px";
			};
		},
		restrict: "E",
		templateUrl: "imageGalleryTemplate.html",

		link: function (scope, iElement, iAttrs) {
			scope.$watch("galleryImage", function (galleryImage, oldValue) {
				if (galleryImage === undefined) {
					scope.source = "/loader.jpg";
					return;
				}
				refreshImage(scope, galleryImage)
			});

			scope.$on("windowChanged", function (x, data) {
				scope.windowWidth = data.width;
				refreshImage(scope, scope.galleryImage)
			});

		}
	};
});