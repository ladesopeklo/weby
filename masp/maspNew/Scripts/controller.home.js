/*global ApiWrapper, MaspartiData*/
var galleryList;
function homeController($scope, galleryApi, menuApi) {
	var api = new ApiWrapper(galleryApi, menuApi),
		maspartiData = new MaspartiData(api);

	$.when(maspartiData.menuAsync(), maspartiData.galleryListAsync()).done(function (menu, galleries) {
		$scope.menu = menu;
		$scope.galleryList = galleries;
		console.log(galleries.galleriesArray)
	});

	/**
	 *
	 * @param {MenuItem} menuItem
	 */
	$scope.galleryThumbUrl = function(menuItem) {
		var galleryList = $scope.galleryList;

		if (!galleryList.get(menuItem.linkValue())){
			return "kjbadkjbas"
		}
		return  galleryList.get(menuItem.linkValue()).galleryThumb();
	};

	$scope.galleryThumb = function(gallery) {

		if (!galleryList.get(menuItem.linkValue())){
			return "kjbadkjbas"
		}
		return  galleryList.get(menuItem.linkValue()).galleryThumb();
	};

//	$scope.galleryList = maspartiData.galleryListAsync();

}