function test($scope, $q, galleryApi) {
	var api = new ApiWrapper(galleryApi);


	api.test().then(function (data) {
		console.log(data)
	});

}