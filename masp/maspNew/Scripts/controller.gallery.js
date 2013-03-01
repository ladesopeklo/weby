function galleryController($scope, galleryApi, menuApi, $routeParams) {
	var galleryId = $routeParams.galleryId,
		maspartiData = new MaspartiData(new ApiWrapper(galleryApi, menuApi));

	$.when(maspartiData.menuAsync(), maspartiData.gallery(galleryId)).done(function (menu, gallery) {
		$scope.menu = menu;
		$scope.gallery = gallery;
		console.log($scope.menu)
		console.log($scope.gallery)

	});


}