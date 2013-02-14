var xxx = ['$scope', 'galleryApi', function ($scope, galleryApi) {

	describe("jamsmine run in angular controller ", function () {
		it("aaa", function (){
			console.log("xxxxxxxxxxk")
			galleryApi.aaa({}, function (data){

				console.log("", data.images)
			}, function (data){
				console.error(data)
			})

		})
	})

}];

