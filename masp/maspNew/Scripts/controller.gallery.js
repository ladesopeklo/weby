function galleryController($scope, galleryApi, resourcesApi, $routeParams) {
	var galleryId = $routeParams.galleryId,
		maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi));

	maspartiData.galleryWithInfo(galleryId).done(function (data) {
		$scope.gallery = data;
		console.log(data)
	})

//	$.when(
//			maspartiData.menuAsync(), maspartiData.gallery(galleryId)).done(function (menu, gallery) {
//		$scope.menu = menu;
//		$scope.gallery = gallery;
//		console.log($scope.menu)
//		console.log($scope.gallery)
//
//	});


}