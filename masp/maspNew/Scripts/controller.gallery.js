function galleryController($scope, galleryApi, resourcesApi, $routeParams) {
	var maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi));


	$scope.galleryId = $routeParams.galleryId;

	maspartiData.galleryWithInfo($scope.galleryId).done(function (data) {
		$scope.gallery = data;
		console.log(data)
	})

//	$.when(
//		maspartiData.menuAsync(), maspartiData.gallery(galleryId)).done(function (menu, gallery) {
//		$scope.menu = menu;
//		$scope.gallery = gallery;
//		console.log($scope.menu)
//		console.log($scope.gallery)
//
//	});


}