var xxx = ['$scope', 'galleryApi', function ($scope, galleryApi) {
	var resolved;

	function xxx(name) {
		return galleryApi.gallery({xxsa: name}, function (data) {
			//return data;
		});
	}

	function ddd(name, $q) {
		var deferred = $q.defer();

		galleryApi.gallery({xxsa: name}, function (data) {
			console.log("---", data);
			deferred.resolve(data);
		});

		return deferred.promise;
	}
	var uuu = function(fnc) {

	}

	beforeEach(function () {
		resolved = false;
	});

	describe("jamsmine run in angular controller ", function () {

		it("aaa", function () {
			//console.log(xxx("aaaaaaaaa").images);
		});

		it('should simulate promise', inject(function ($q, $rootScope) {
//			var a = ddd("kljasbdjkasd", $q);
//			var resolvedValue;
//
//			a.then(function(value) { resolvedValue = value; });
//
//			$rootScope.$apply();
//			console.log(resolvedValue)

		}));

		it('should simulate promise', inject(function ($q, $rootScope) {
			var a = ddd("xbjiasdjkas666", $q);

			waitsFor(function (x){
				console.log(x)
				return resolved;
			});

			uuu(ddd())

			runs(function () {
				console.log("-----", resolved)
			})
		}));
	})

}];

