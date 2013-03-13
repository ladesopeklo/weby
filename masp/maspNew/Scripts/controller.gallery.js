function galleryController($scope, galleryApi, resourcesApi, $routeParams, $cacheFactory) {
	var maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi));

	$scope.galleryId = $routeParams.galleryId;

	maspartiData.galleryWithInfo($scope.galleryId).done(function (data) {
		$scope.gallery = data;
		console.log(data)
	});
}

function gController($scope, galleryApi, resourcesApi, $routeParams, cache) {
	var api = new ApiWrapper(galleryApi, resourcesApi, cache),
		maspartiData = new MaspartiData(api);

	$scope.galleryId = $routeParams.galleryId;

	api.gDataGallery($scope.galleryId).done(function (gDataGallery) {
		$scope.gallery = gDataGallery;
		console.log(gDataGallery);
	});
}