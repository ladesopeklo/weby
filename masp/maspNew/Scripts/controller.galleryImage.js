/*global MaspartiData, ApiWrapper*/
function galleryImageController($scope, galleryApi, resourcesApi, $routeParams, $route) {
	var galleryId = $routeParams.galleryId,
		imageIndex = $routeParams.imageIndex,
		maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi));

	maspartiData.galleryWithInfo(galleryId).done(function (data) {
		$scope.gallery = data;
		$scope.image = data.images[imageIndex];
		$scope.ready = true;
	});

	var timeOut;
	$scope.windowWidth = $(window).width();

	$(window).resize(function() {
		var self = this;
		clearTimeout(timeOut);
		timeOut = setTimeout( function () {
			$scope.windowWidth = $(self).width();
		}, 500);
	});


	$scope.imageUrl = function () {
		var x = "";
		if ($scope.ready){
			x = $scope.image.large();
		}
		return x;
	};

	$scope.close = function () {
		location.hash = "#/gallery/" + galleryId;
	};

	$scope.next = function () {
		var length = $scope.gallery.images.length;

		imageIndex ++;
		if (imageIndex >= length){
			imageIndex = 0;
		}

		location.hash = "#/gallery/" + galleryId +"/" + imageIndex;
	};

	$scope.prev = function () {
		var length = $scope.gallery.images.length;

		imageIndex--;
		if (imageIndex <= 0){
			imageIndex = length - 1;
		}

		location.hash = "#/gallery/" + galleryId +"/" + imageIndex;
	};
}



