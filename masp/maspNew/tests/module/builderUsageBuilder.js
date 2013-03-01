/*global Usages, Position*/
var UsagesBuilder = (function () {
	"use strict";

	function UsagesBuilder() {
		this.usages = new Usages({}, 100);
	}

	// |xxxxx.....|
	UsagesBuilder.prototype.widthLineFiveItems = function () {
		this.usages.addUsagePixo(new Position(0, 0, 10, 10));
		this.usages.addUsagePixo(new Position(10, 0, 20, 10));
		this.usages.addUsagePixo(new Position(20, 0, 30, 10));
		this.usages.addUsagePixo(new Position(30, 0, 40, 10));
		this.usages.addUsagePixo(new Position(40, 0, 50, 10));
		return this;
	};
	// |xxxxx.....|
	// |xxxxx.....|
	UsagesBuilder.prototype.widthTwoFiveItemLines = function () {
		this.widthLineFiveItems();

		this.usages.addUsagePixo(new Position(0, 10, 10, 20));
		this.usages.addUsagePixo(new Position(10, 10, 20, 20));
		this.usages.addUsagePixo(new Position(20, 10, 30, 20));
		this.usages.addUsagePixo(new Position(30, 10, 40, 20));
		this.usages.addUsagePixo(new Position(40, 10, 50, 20));
		return this;
	};
	// |xxxxxxxxxx|
	UsagesBuilder.prototype.widthLineFull = function () {
		this.widthLineFiveItems();

		this.usages.addUsagePixo(new Position(50, 0, 60, 10));
		this.usages.addUsagePixo(new Position(60, 0, 70, 10));
		this.usages.addUsagePixo(new Position(70, 0, 80, 10));
		this.usages.addUsagePixo(new Position(80, 0, 90, 10));
		this.usages.addUsagePixo(new Position(90, 0, 100, 10));

		return this;
	};

	// |xxxxx.....|
	// |x.........|
	UsagesBuilder.prototype.widthLeftL = function () {
		this.widthLineFiveItems();
		this.usages.addUsagePixo(new Position(0, 10, 10, 20));
		return this;
	};

	UsagesBuilder.prototype.build = function () {
		return this.usages;
	};

	return UsagesBuilder;
}());
