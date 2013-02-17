/*global apiWrapper*/
var xxx = ['$scope', 'galleryApi', 'menuApi', function ($scope, galleryApi, menuApi) {
	var api = new ApiWrapper(galleryApi, menuApi);

	var waitsForJqPromise = function (promise) {
		waitsFor(function () {
			return promise.state() == "resolved" || promise.state() === "rejected";
		})
	};

	describe("jasmine run in angular controller ", function () {
		it('gallery.php - gallery ', function () {
			var promise = api.gallery("dalov");

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data.images.length).toBeGreaterThan(5);
				console.log(data)
			});

			waitsForJqPromise(promise);
		});
		it('get menu', function () {
			var promise = api.menu();

			promise.done(function (data) {
				console.log(data)
			});

			waitsForJqPromise(promise);
		});
	})

}];

