describe("App Config module Tests", function () {

	beforeEach(module('appConfigModule', function ($provide) {
		$provide.value('$window', function () {
			alert:  console.log("akhdbvkasjb")
		})
	}));

	it('api config module init', inject(function (appConfig) {
		expect(appConfig.baseUrl).toBeDefined();
		expect(appConfig.debug).toBeDefined();
	}));

});
