describe("Api module tests", function () {
	var scope, ctrl;

	beforeEach(module("apiModule"));
	beforeEach(inject(function ($httpBackend) {
		$httpBackend.whenGET('gallery.php').respond({aaa: "kjbasdkjasd"});
	}));


	it("asdasd", inject(function (galleryApi, $httpBackend) {
		var rs = galleryApi.aaa({
				//applicationId : "1111"
			}, function (data) {
				console.log(data, "aaa");
			}, function (err) {
				console.log(err, "error");
			}
		);
		$httpBackend.flush();
		//console.log("xxx", rs);
		//expect(true).toBe(false);
	}))
});