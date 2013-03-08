var module = angular.module("masparti", ['apiModule']);

module.config(['$routeProvider', '$provide', function ($routeProvider) {
	$routeProvider
		.when('/gallery/:galleryId', {controller: galleryController, templateUrl: 'gallery.html'})
		.when('/gallery/:galleryId/:imageIndex', {controller: galleryImageController, templateUrl: 'galleryImage.html'})
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
				iElement.css("-webkit-transform", translate );
				iElement.css("-moz-transform", translate );
				iElement.css("transform", translate );

				iElement.css("-ms-transform", "translate(" + pos.x1 + "px, " + pos.y1 + "px)" );

				iElement.css("width", item.width + "px");
				iElement.css("height", item.height + "px");
			})
		}
	};
});

module.directive("ngcResponsiveImg", function () {
	var getWidth = function (scope) {
		console.log(scope.windowWidth)
		return scope.windowWidth;
	};

	var imageByWindowSize = function (windowWidth, galleryImage) {
		var imageUrl = galleryImage.large();


		if (windowWidth >= 768 && windowWidth < 1200){
			imageUrl = galleryImage.large();
		}
		if (windowWidth >= 480 && windowWidth < 768){
			imageUrl = galleryImage.large();
		}

		if (windowWidth < 480){
			imageUrl = galleryImage.thumb();
		}

		return imageUrl;
	};

	var renderImage = function (scope, galleryImage, element) {
		var image = new Image(),
			windowWidth = getWidth(scope.$parent);

		image.src = imageByWindowSize(windowWidth, galleryImage);
		$(image).load(function () {
			var imageWidth = this.width,
				zmenseno = false,
				imageHeight = this.height;

			if (windowWidth < imageWidth){
				zmenseno = true;
				imageWidth = windowWidth;
			}

			//$(element.children()[0]).width(imageWidth);

			if (zmenseno) {
				scope.containerWidth = "100%";
			} else {
				scope.containerWidth = imageWidth + "px";
			}

			scope.fullSize = zmenseno;
			scope.$apply();
		});
		return image.src;
	};

	return {
		scope: {
			galleryImage: "="
		},
		controller: function ($scope) {
			$scope.containerWidth = "55px";

			$scope.showFullSize = function (){

			};
		},
		restrict: "E",
		templateUrl : "imageGalleryTemplate.html",

		link: function postLink(scope, iElement, iAttrs) {
			scope.$watch("galleryImage", function(galleryImage , oldValue){
				if (galleryImage === undefined) {
					scope.source = "/loader.jpg";
					return;
				}

				scope.source = renderImage(scope, galleryImage, iElement);
			});
//			scope.$watch("containerWidth", function(containerWidth , oldValue){
//				console.log("laskbndklasndklas", containerWidth)
//				//scope.containerWidth = containerWidth;
//			});
		}
	};
});