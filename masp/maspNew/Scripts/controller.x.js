/*global Usages*/
function xController($scope, galleryApi, menuApi) {

	var boxes = [],
		usages = new Usages($scope.width);

	$scope.width = 900;

	$scope.widthOffset = 0;
	$scope.newLineOffset = 0;
	$scope.heightOffset = 0;
	$scope.newLineOffsetTop = 0;

	for (var i =0 ; i< 50; i++){
		var x = Math.floor((Math.random()*100)+30);
		boxes.push( new SquareItem(x,x));
	}

	$scope.data = usages.generate(boxes, $scope.width);

	$scope.aaa = function (newWidth){
		//$scope.width = newWidth;
		$scope.data = usages.generate(boxes, newWidth);
	};

	$scope.setRandom = function (){
		usages.setRandom($scope.widthOffset, $scope.newLineOffset, $scope.heightOffset, $scope.newLineOffsetTop);
		usages.generate(boxes);
	};

	$scope.getWidth = function (item) {
		return item.position.x2 - item.position.x1;
	};

	$scope.getHeight = function (item) {
		return item.position.y2 - item.position.y1;
	};

}