/*global apiWrapper*/
var xxx = ['$scope', 'galleryApi', '$http', function ($scope, galleryApi, $http) {
	var api = new ApiWrapper(galleryApi);

//	$.ajax({
//		method: "POST",
//		url: "/weby/masp/maspnew/service/gallery.php",
//		data: {location: "dalov"}
//	}).then(function(response) {
//		console.log(response)
//		});


	var waitsForJqPromise = function (promise) {
		waitsFor(function () {
			return promise.state() == "resolved" || promise.state() === "rejected";
		})
	};

	describe("jasmine run in angular controller ", function () {
		it('promise ', function () {
			var promise = api.gallery("dalov");

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data.images.length).toBeGreaterThan(5);
				console.log(data);
			});

			waitsForJqPromise(promise);
		});
	})

}];

