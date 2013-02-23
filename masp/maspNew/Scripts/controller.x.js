/*global Usages*/
function xController($scope, galleryApi, menuApi) {

	var boxes = [
		new SquareItem(100, 100),
		new SquareItem(100, 100),
		new SquareItem(100, 100),
		new SquareItem(200, 200),
		new SquareItem(200, 200),
		new SquareItem(200, 200),
		new SquareItem(200, 200),
		new SquareItem(100, 100)
	];

	var x = new Usages(900);

	$scope.data = x.generate(boxes);

	$scope.getWidth = function (item) {
		return item.position.x2 - item.position.x1;
	};
	$scope.getHeight = function (item) {
		return item.position.y2 - item.position.y1;
	};

	console.log($scope.data);
}