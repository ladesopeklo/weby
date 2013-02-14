angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('galleryApi', ['$resource', 'appConfig', function ($resource, appConfig) {
		console.log(appConfig)
		return $resource('/:baseUrl/service/gallery.php',
			{ baseUrl: appConfig.baseUrl },
			{
				aaa: { method: 'GET', isArray: false, params: { action: "grids" } },
				grids: { method: 'GET', isArray: true, params: { action: "grids" } },
				getGrid: { method: 'POST', params: { action: "GetGrid" } },
			}
		);
	}]);
