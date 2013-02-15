function test($scope, $q, galleryApi) {


	function ddd(name, $q) {
		var deferred = $q.defer();

		galleryApi.gallery({xxsa: name}, function (data) {
			return deferred.resolve(data);
		});

		return deferred.promise;
	}
	var x = ddd("ljkasbdjkas", $q);

	console.log(x.then);
	console.log(x);

	x.then(function (data) {
		console.log(data)
	});

}