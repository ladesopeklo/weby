/*global ApiWrapper, MaspartiData, Usages*/
var galleryList;
function homeController($scope, galleryApi, resourcesApi) {
	var maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi)),
		usages,
		usagesSettings;

	usagesSettings = {
		containerOffset: -360,
		width: 1300,
		randoms: {
			boxOffsetWidth: 00,
			boxOffsetHeight: 00,
			lineOffsetTop: 0,
			lineOffsetStart: 0
		}
	};

	usages = new Usages(usagesSettings);

	$scope.widthOffset = 3;
	$scope.heightOffset = 3;
	$scope.newLineOffset = 0;
	$scope.newLineOffsetTop = 10;
	$scope.width = 900;


	$.when(
			maspartiData.galleryListLocalizedAsync()
		).done(function (galleries) {

			$scope.galleryList = galleries;
			$scope.galleryThumbs = usages.generate(galleries.galleryThumbs(), 1900);

			console.log($scope.galleryList)
			console.log($scope.galleryThumbs)

			setTimeout(function () {
				usages.setRandom($scope.widthOffset, $scope.heightOffset, $scope.newLineOffset, $scope.newLineOffsetTop);
				usages.settings.containerOffset = 0;
				usages.settings.width = $scope.width;
				usages.refreshUsages();
				$scope.$apply();
			}, 100);

		});


	$scope.currentGallery = {ref: null, value: null, index: 0};

	$scope.showGallery = function (item, index) {
		if ($scope.currentGallery.value) {
			var x = $scope.galleryThumbs[$scope.currentGallery.index];
			var zaloha = $scope.currentGallery.value;
			x.width = zaloha.width;
			x.height = zaloha.height;
			x.chuj = false;
		}

		item.chuj = true;
		$scope.currentGallery.value = $.extend(true, {}, item);
		$scope.currentGallery.data = item;
		$scope.currentGallery.index = index;

		///item.position.x1 = 0;
		item.width = 400;
		item.height = 400;
		usages.refreshUsages();
		console.log($scope.currentGallery);

	};

}