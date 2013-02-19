function test($scope, galleryApi, menuApi) {
	var api = new ApiWrapper(galleryApi, menuApi);
	$scope.menu = [];

	var loadGalleries = function (menuItemIndex, links) {
		api.galleryMap(links.items).then(function (data) {
			$scope.menu[menuItemIndex].galleries = data;
		});
	};

	api.menu().then(function (data) {
		$scope.menu = data;

		for (var i = 0; i < $scope.menu.length; i++) {
			if ($scope.menu[i]) {
				var links = $scope.menu[i].childrenItemsLinks();
				loadGalleries(i, links)
			}
		}
		console.log($scope.menu);

	});


}