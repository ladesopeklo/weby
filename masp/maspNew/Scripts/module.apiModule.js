angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('galleryApi', ['$resource', 'appConfig', function ($resource, appConfig) {
		var x = $resource(appConfig.baseUrl + '/service/:service',
			{  },
			{
				gallery: { method: 'POST' },
				galleryList: { method: 'POST' }
			});

		return x;
	}])

	.factory('menuApi', ['$resource', 'appConfig', function ($resource, appConfig) {
		return $resource(appConfig.baseUrl + '/Content/menu.json',
			{  },
			{
				getAll: { method: 'GET', isArray: false }
			});

	}]);
