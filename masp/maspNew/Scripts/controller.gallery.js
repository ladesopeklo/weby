function galleryController($scope, galleryApi, resourcesApi, $routeParams, cache) {
	var api = new ApiWrapper(galleryApi, resourcesApi, cache),
		maspartiData = new MaspartiData(api);

	$scope.galleryId = $routeParams.galleryId;

	api.gDataGallery($scope.galleryId).done(function (gDataGallery) {
		$scope.gallery = gDataGallery;
		console.log(gDataGallery);
	});
}