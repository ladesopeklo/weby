/*global MaspartiData, ApiWrapper*/
function galleryImageController($scope, galleryApi, resourcesApi, $routeParams, cache) {
	var galleryId = $routeParams.galleryId,
		imageIndex = $routeParams.imageIndex,
		api = new ApiWrapper(galleryApi, resourcesApi, cache),
		maspartiData = new MaspartiData(api);

//	maspartiData.galleryWithInfo(galleryId).done(function (data) {
//		$scope.gallery = data;
//		$scope.image = data.images[imageIndex];
//		$scope.ready = true;
//	});

	api.gDataGallery($scope.galleryId).done(function (gDataGallery) {
		$scope.gallery = gDataGallery;
		$scope.image = gDataGallery.images[imageIndex];
		$scope.ready = true;
	});


	$scope.imageUrl = function () {
		var x = "";
		if ($scope.ready){
			x = $scope.image.fullsize.url;
		}
		return x;
	};

	$scope.close = function () {
		location.hash = "#/g/" + galleryId;
	};

	$scope.next = function () {
		var length = $scope.gallery.images.length;

		imageIndex ++;
		if (imageIndex >= length){
			imageIndex = 0;
		}

		location.hash = "#/g/" + galleryId +"/" + imageIndex;
	};

	$scope.prev = function () {
		var length = $scope.gallery.images.length;

		imageIndex--;
		if (imageIndex <= 0){
			imageIndex = length - 1;
		}

		location.hash = "#/g/" + galleryId +"/" + imageIndex;
	};
}



