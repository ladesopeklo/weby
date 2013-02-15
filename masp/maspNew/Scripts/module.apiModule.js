angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('galleryApi', ['$resource', 'appConfig', function ($resource, appConfig) {
		return $resource(appConfig.baseUrl + '/service/gallery.php',
			{  },
			{
				aaa: { method: 'GET', isArray: false, params: { action: "grids" } },
				grids: { method: 'GET', isArray: true, params: { action: "grids" } },
                gallery: { method: 'POST', params: { action: "GetGrid" } }
			}
		);
	}]);
