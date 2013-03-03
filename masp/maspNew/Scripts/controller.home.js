/*global ApiWrapper, MaspartiData, Usages*/
var galleryList;
function homeController($scope, galleryApi, resourcesApi) {
	var maspartiData = new MaspartiData(new ApiWrapper(galleryApi, resourcesApi)),
		usages,
		usagesSettings;

	usagesSettings = {
		containerOffset: -0,
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
	$scope.newLineOffset = 30;
	$scope.newLineOffsetTop = 40;
	$scope.width = 900;


	$.when(
			maspartiData.galleryListLocalizedAsync()
		).done(function (galleries) {

			$scope.galleryList = galleries;
			$scope.galleryThumbs = usages.generate(galleries.galleryThumbs(), 1900);

			console.log($scope.menu)
			console.log($scope.galleryList)
			console.log($scope.galleryThumbs)

			setTimeout(function () {
				usages.setRandom($scope.widthOffset, $scope.heightOffset, $scope.newLineOffset, $scope.newLineOffsetTop);
				usages.settings.containerOffset = 0;
				usages.settings.width = 900;
				usages.refreshUsages();
				$scope.$apply();
			}, 100);

		});




	$scope.chujclick = function () {
		//usages.setRandom(2, 2, 0, 0);
		console.log(usages.usages[4].position)
		usages.usages[4].position.x1 = 0
		usages.usages[4].width = 900;
		usages.usages[4].height = 400;

		console.log(usages.usages[4].position)

		usages.settings.containerOffset = 0;
		usages.refreshUsages();
	};

	$scope.showGallery= function (item) {
		item.position.x1 = 0;
		item.width = 900;
		item.height = 400;
		usages.refreshUsages();
	};

	/**
	 *
	 * @param {MenuItem} menuItem
	 */
	$scope.galleryThumbUrl = function (menuItem) {
		var galleryList = $scope.galleryList;

		if (!galleryList.get(menuItem.linkValue())) {
			return "xxx"
		}
		return  galleryList.get(menuItem.linkValue()).galleryThumb();
	};


}