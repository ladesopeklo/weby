/*global Usages*/
function xController($scope, galleryApi, menuApi) {

	var boxes = [],
		usages = new Usages($scope.width);
		usages.setRandom(1000, 500, 60, 50);

	$scope.width = 900;

	$scope.widthOffset = 10;
	$scope.newLineOffset = 30;
	$scope.heightOffset = 10;
	$scope.newLineOffsetTop = 40;

	for (var i =0 ; i< 50; i++){
		var x = Math.floor((Math.random()*100)+30);
		boxes.push( new SquareItem(x,x));
	}

	$scope.data = usages.generate(boxes, $scope.width);

	setTimeout(function () {
		usages.setRandom($scope.widthOffset, $scope.newLineOffset, $scope.heightOffset, $scope.newLineOffsetTop);
		$scope.data = usages.generate(boxes, $scope.width);
		$scope.$apply();
	},  100);

	$scope.aaa = function (newWidth){
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