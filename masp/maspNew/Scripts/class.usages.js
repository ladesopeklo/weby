var Usages = (function () {

	function Usages(width, height) {
		this.usages = [];
		this.maxWidth = width || 0;
		this.maxHeight = height;
	}

	Usages.prototype.findFirstEmptyVertical = function (x, squareItemToPut) {
		return new Position();
	};

	Usages.prototype.findFirstEmptyHorizontal = function (squareItemToPut) {
		return new Position();
	};

	Usages.prototype.generate = function (items) {
		var i = 0,
			len = items.length;

		for (i; i < len; i++) {
			this.addSquare(items[i]);
		}
		return this.usages;
	};


	Usages.prototype.isEmpty = function () {
		return this.usages.length === 0;
	};

	Usages.prototype.getLastItemPosition = function () {
		var maxBottommost = new Position(),
			i = 0,
			item,
			len = this.usages.length;

		for (i; i < len; i++) {
			item = this.usages[i];
			if (item.position.x2 >= maxBottommost.x2 || item.position.y2 >= maxBottommost.y2) {
				maxBottommost = item.position;
			}
		}
		return maxBottommost;
	};

	Usages.prototype.addUsage = function (position) {
		if (position instanceof SquareItem) {
			this.usages.push(position);
		}
	};
	Usages.prototype.addUsagePixo = function (position) {
		if (position instanceof Position) {
			var item = new SquareItem();
			item.position = position;
			this.usages.push(item);
		}
	};

	Usages.prototype.addSquare = function (squareItem) {
		var last = this.getLastItemPosition(),
			newPosition = new Position();

		if (last.x2 + squareItem.width > this.maxWidth) {
			newPosition.x1 = 0;
			newPosition.x2 = squareItem.width;
			newPosition.y1 = 50;
			newPosition.y2 = squareItem.height + 50;
		} else {
			newPosition = new Position(last.x2, last.y1, last.x2 + squareItem.width, last.y1 + squareItem.height);
		}
		squareItem.position = newPosition;

		this.addUsage(squareItem);
		return squareItem;
	};

	return Usages;
})();

var SquareItem = (function () {

	function SquareItem(width, height) {
		this.position = new Position();
		this.width = width;
		this.height = height;
	}

	return SquareItem;
})();

var Point = (function () {
	function Point(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	Point.prototype.toString = function () {
		return this.x + "," + this.y;
	};
	return Point;
})();

var Position = (function () {

	function Position(x1, y1, x2, y2) {
		this.x1 = x1 || 0;
		this.y1 = y1 || 0;
		this.x2 = x2 || 0;
		this.y2 = y2 || 0;
	}

	Position.prototype.toString = function () {
		return this.x1 + "," + this.y1 + "," + this.x2 + "," + this.y2;
	};

	return Position;
})();