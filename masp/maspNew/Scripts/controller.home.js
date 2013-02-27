/*global ApiWrapper, MaspartiData*/
function homeController($scope, galleryApi, menuApi) {
	var api = new ApiWrapper(galleryApi, menuApi),
		maspartiData = new MaspartiData(api);

	$scope.galleryList = maspartiData.galleryListAsync();
	$scope.menu = maspartiData.menuAsync();
}