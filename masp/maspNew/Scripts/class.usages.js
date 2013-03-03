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

	function Usages(settings) {
		this.usages = [];
		//defaults
		this.settings = $.extend({
			containerOffset: 0,
			width: 900,
			height: null,
			randoms: {
				boxOffsetWidth: 0,
				boxOffsetHeight: 0,
				lineOffsetTop: 0,
				lineOffsetStart: 0
			}
		}, settings || {});
	}

	Usages.prototype.setRandom = function (widthOffset, heightOffset, newLineOffset, newLineOffsetTop) {
		this.settings.randoms.boxOffsetWidth = widthOffset;
		this.settings.randoms.boxOffsetHeight = heightOffset;
		this.settings.randoms.lineOffsetStart = newLineOffset;
		this.settings.randoms.lineOffsetTop = newLineOffsetTop;
		return this;
	};


	Usages.prototype.refreshUsages = function () {
		var i = 0,
			items = this.usages,
			len = items.length,
			last = this.getLastItemPosition(),
			square;

		this.usages = [];

		for (i; i < len; i++) {
			square = this.calculateSquareAfter(items[i], last);
			this.addUsage(square);
			last = square.position;
		}
		return this.usages;
	};

	Usages.prototype.generate = function (items, newWidth) {
		var i = 0,
			len = items.length,
			last = null, //this.getLastItemPosition(),
			square;

		if (newWidth) {
			this.settings.width = newWidth;
		}
		this.usages = [];

		for (i; i < len; i++) {
			square = this.calculateSquare(items[i], last);
			this.addUsage(square);
			last = square.position;
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
		this.usages.push(position);
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

	Usages.prototype.getRandomFromProperty = function (property) {
		return  property ? Math.floor((Math.random() * property) + 1) : 0;
	};

	Usages.prototype.calculateSquareAfter = function (squareItem, last) {
		var newLineOffsetRandom,
			newLineOffsetTopRandom,
			heightOffsetRandom,
			widthOffsetRandom,
			containerOffset = this.settings.containerOffset,
			settingsRandoms = this.settings.randoms,
			newPosition = new Position();

		newLineOffsetRandom = this.getRandomFromProperty(settingsRandoms.lineOffsetStart);
		newLineOffsetTopRandom = this.getRandomFromProperty(settingsRandoms.lineOffsetTop);
		widthOffsetRandom = this.getRandomFromProperty(settingsRandoms.boxOffsetWidth);
		heightOffsetRandom = this.getRandomFromProperty(settingsRandoms.boxOffsetHeight);


		newPosition.x1 = last.x2 + squareItem.width > this.settings.width + containerOffset ? containerOffset : last.x2 + widthOffsetRandom;
		if (newPosition.x1 === containerOffset || last.x2 === 0) {
			newPosition.x1 += newLineOffsetRandom;
		}

		newPosition.x2 = newPosition.x1 + squareItem.width;
		newPosition.y1 = this.findMostBottom(newPosition.x1, newPosition.x2).position.y2 + heightOffsetRandom;
		if (newPosition.y1 - heightOffsetRandom === 0) {
			newPosition.y1 += newLineOffsetTopRandom;
		}
		newPosition.y2 = squareItem.height + newPosition.y1;
		squareItem.position = newPosition;
		return squareItem;

	};

	Usages.prototype.calculateSquare = function (squareItem) {
		var last = this.getLastItemPosition();
		return this.calculateSquareAfter(squareItem, last);
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

