/*global ApiWrapper, MaspartiData, Usages*/
var galleryList;
function homeController($scope, galleryApi, menuApi) {
	var maspartiData = new MaspartiData(new ApiWrapper(galleryApi, menuApi)),
		usages,
		usagesSettings;

	usagesSettings = {
		containerOffset: -360,
		randoms: {
			boxOffsetWidth: 200,
			boxOffsetHeight: 200,
			lineOffsetTop: 10,
			lineOffsetStart: 10
		}
	};

	usages = new Usages(usagesSettings);

	$scope.widthOffset = 3;
	$scope.heightOffset = 3;
	$scope.newLineOffset = 30;
	$scope.newLineOffsetTop = 40;
	$scope.width = 900;


	$.when(maspartiData.menuAsync(), maspartiData.galleryListAsync()).done(function (menu, galleries) {
		$scope.menu = menu;
		$scope.galleryList = galleries;
		$scope.galleryThumbs = usages.generate(galleries.galleryThumbs(), 1900);

		console.log($scope.menu)
		console.log($scope.galleryList)
		console.log($scope.galleryThumbs)

		setTimeout(function () {
			usages.setRandom($scope.widthOffset, $scope.heightOffset,$scope.newLineOffset, $scope.newLineOffsetTop);
			usages.settings.containerOffset = 0;

			$scope.galleryThumbs = usages.generate(galleries.galleryThumbs(), $scope.width);
			$scope.$apply();
		},  100);

	});

	/**
	 *
	 * @param {MenuItem} menuItem
	 */
	$scope.galleryThumbUrl = function(menuItem) {
		var galleryList = $scope.galleryList;

		if (!galleryList.get(menuItem.linkValue())){
			return "xxx"
		}
		return  galleryList.get(menuItem.linkValue()).galleryThumb();
	};


}