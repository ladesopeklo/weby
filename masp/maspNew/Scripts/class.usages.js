/*global JSLINQ*/
var Position = (function () {
	"use strict";

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
}());

var SquareItem = (function () {
	"use strict";

	function SquareItem(width, height) {
		this.position = new Position();
		this.width = width;
		this.height = height;
	}

	return SquareItem;
}());

var Usages = (function () {
	"use strict";

	function Usages(width, height) {
		this.usages = [];
		this.maxWidth = width || 0;
		this.maxHeight = height;
		this.widthOffset = 0;
		this.newLineOffset = 0;
		this.newLineOffsetTop = 0;
		this.heightOffset = 0;
	}

	Usages.prototype.setRandom = function (widthOffset, newLineOffset,heightOffset, newLineOffsetTop) {
		this.widthOffset = widthOffset;
		this.newLineOffset = newLineOffset;
		this.heightOffset = heightOffset;
		this.newLineOffsetTop = newLineOffsetTop;
	};


	Usages.prototype.generate = function (items, newwidth) {
		if (newwidth) {
			this.maxWidth = newwidth;
		}

		var i = 0,
			len = items.length;

		this.usages = [];

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

	Usages.prototype.findMostBottom = function (x1, x2) {
		var max = new SquareItem(),
			x = this.itemsInInterval(x1, x2);

		new JSLINQ(x).Where(function (item) {
			var pos = item.position,
				isMoreBellow = pos.y2 > max.position.y2;

			if (isMoreBellow) {
				max = item;
			}
			return isMoreBellow;
		});
		return max;
	};

	Usages.prototype.itemsInInterval = function (x1, x2) {
		var inInterval = new JSLINQ(this.usages).Where(function (item) {
			var pos = item.position;
			return (pos.x1 > x1 && pos.x1 < x2) || (pos.x1 <= x1 && pos.x2 >= x2) || (pos.x2 > x1 && pos.x2 < x2);
		});
		return inInterval.items;
	};

	Usages.prototype.addSquare = function (squareItem) {
		var last = this.getLastItemPosition(),
			newLineOffsetRandom,
			newLineOffsetTopRandom,
			heightOffsetRandom,
			widthOffsetRandom,
			newPosition = new Position();


		newLineOffsetRandom = this.newLineOffset ? Math.floor((Math.random()*this.newLineOffset) + 1) : 0;
		newLineOffsetTopRandom = this.newLineOffsetTop ? Math.floor((Math.random()*this.newLineOffsetTop) + 1) : 0;
		widthOffsetRandom = this.widthOffset ? Math.floor((Math.random()*this.widthOffset) + 1) : 0;
		heightOffsetRandom = this.heightOffset ? Math.floor((Math.random()*this.heightOffset) + 1) : 0;


		newPosition.x1 = last.x2 + squareItem.width > this.maxWidth ? 0  : last.x2 + widthOffsetRandom;
		if (newPosition.x1 === 0 || last.x2 === 0) {
			newPosition.x1 += newLineOffsetRandom;
		}

		newPosition.x2 = newPosition.x1 + squareItem.width;
		newPosition.y1 = this.findMostBottom(newPosition.x1, newPosition.x2).position.y2 + heightOffsetRandom;
		if (newPosition.y1 - heightOffsetRandom === 0) {
			newPosition.y1 += newLineOffsetTopRandom;
		}


		newPosition.y2 = squareItem.height + newPosition.y1;

		squareItem.position = newPosition;

		this.addUsage(squareItem);
		return squareItem;
	};

	Usages.prototype.addUsagePixo = function (position) {
		if (position instanceof Position) {
			var item = new SquareItem();
			item.position = position;
			this.usages.push(item);
		}
	};

	return Usages;
}());

