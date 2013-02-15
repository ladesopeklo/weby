var ApiWrapper = (function (){

	function ApiWrapper (apiModule) {
		this.api = apiModule;
	}

	ApiWrapper.prototype.gallery = function (name) {
		var deferred = $.Deferred();

		this.api.gallery({location:name, culture: "en"} , function (data) {
			deferred.resolve(data);
		});

		return deferred;
	};

	return ApiWrapper;
})();