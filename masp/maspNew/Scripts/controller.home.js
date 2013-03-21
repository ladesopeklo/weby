/*global ApiWrapper, MaspartiData, Usages*/
var galleryList;
function homeController($scope, galleryApi, resourcesApi, cache) {
	var maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi, cache)),
		usages,
		usagesSettings,
		container = $(".container");

	usagesSettings = {
		containerOffset: -360,
		width: container.width() * 3,
		randoms: {
			boxOffsetWidth: 100,
			boxOffsetHeight: 100,
			lineOffsetTop: 150,
			lineOffsetStart: 100
		}
	};

	usages = new Usages(usagesSettings);

	$scope.boxOffsetWidth = 10;
	$scope.boxOffsetHeight = 10;
	$scope.lineOffsetStart = 0;
	$scope.lineOffsetTop = -50;
	$scope.width = container.width();


	function refreshScreen() {
		usages.settings.width = $scope.width;
		usages.refreshUsages();
		$scope.$apply();
	}

	$.when(
			maspartiData.gDataGallery("home")
		).done(function (data) {
			console.log(data);
			$scope.galleryThumbs = usages.generateFromSmall(data.images);

			setTimeout(function () {
				usages.setRandom($scope.boxOffsetWidth, $scope.boxOffsetHeight, $scope.lineOffsetStart, $scope.lineOffsetTop);
				usages.settings.containerOffset = 0;
				refreshScreen();
			}, 100);

		});

	$scope.currentGallery = {ref: null, value: null, index: 0};

	$scope.showGallery = function (item, index) {
		return;

		if ($scope.currentGallery.value) {
			var x = $scope.galleryThumbs.images[$scope.currentGallery.index];
			var zaloha = $scope.currentGallery.value;
			x.width = zaloha.width;
			x.height = zaloha.height;
			x.chuj = false;
		}

		item.chuj = true;
		$scope.currentGallery.value = $.extend(true, {}, item);
		$scope.currentGallery.data = item;
		$scope.currentGallery.index = index;

		item.width = 400;
		item.height = 400;
		console.log($scope.currentGallery);
		location.hash = "#/gallery/" + $scope.currentGallery.data.galleryId;

		usages.refreshUsages();
	};


	var timeOut;
	$(window).resize(function () {
		clearTimeout(timeOut);
		var self = this;
		timeOut = setTimeout(function () {
			$scope.width = container.width();
			$scope.$root.$broadcast("windowChanged", {width: $(self).width(), height: $(self).height()});
			refreshScreen();
		}, 500);

	});


}