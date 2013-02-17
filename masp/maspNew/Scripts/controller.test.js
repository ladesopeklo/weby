function test($scope, galleryApi, menuApi) {
	var api = new ApiWrapper(galleryApi, menuApi);
	$scope.menu = [];

	api.menu().then(function (data) {
		console.log(data);
		$scope.menu = data;
	});



}