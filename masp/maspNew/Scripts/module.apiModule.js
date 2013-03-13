angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('galleryApi', ['$resource', 'appConfig', function ($resource, appConfig, $cacheFactory) {
		var x = $resource(appConfig.baseUrl + '/Service/:service',
			{  },
			{
				gallery: { method: 'POST' },
				gDataGallery: { method: 'POST', isArray: true },
				galleryList: { method: 'POST' }
			});

		return x;
	}])

	.factory('resourcesApi', ['$resource', 'appConfig', function ($resource, appConfig) {
		return $resource(appConfig.baseUrl + '/Resources/:resourceName.json',
			{  },
			{
				getAll: { method: 'GET', isArray: false },
				getAllLocales: { method: 'GET', isArray: false }
			});

	}]);
