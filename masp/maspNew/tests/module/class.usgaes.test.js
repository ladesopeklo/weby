/*global expect*/

var UsagesBuilder = (function () {

	function UsagesBuilder() {
		this.usages = new Usages(100)
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
})();

var anUsage = function () {
	return new UsagesBuilder();
};

describe("Usages tests", function () {
	beforeEach(module('appConfigModule', function () {
	}));


	it("Default tests", function () {
		var usages = anUsage().build();

		expect(usages.isEmpty()).toBe(true);
		//new SquareItem()
		usages.addUsagePixo(new Position(0, 0, 1, 1));
		expect(usages.isEmpty()).toBe(false);
	});

	it("childrenItemsLinks", function () {
		var a = anUsage().build();

		a.addUsagePixo(new Position(0, 0, 10, 10));
		a.addUsagePixo(new Position(10, 0, 20, 10));
		a.addUsagePixo(new Position(20, 0, 30, 15));

		var last = new Position(10, 10, 20, 20);
		a.addUsagePixo(last);

		var found = a.getLastItemPosition();
		expect(found.toString()).toBe("10,10,20,20");
		console.log(found.toString())
	});

	it("last from half line ", function () {
		var a = anUsage();
		a.widthLineFiveItems();
		var found = a.build().getLastItemPosition();
		console.log("1 line", found.toString());
		expect(found.toString()).toBe("40,0,50,10");
	});

	it("last item of two 5 item lines ", function () {
		var a = anUsage();

		a.widthTwoFiveItemLines();
		var found = a.build().getLastItemPosition();
		console.log("2 lines", found.toString());
		expect(found.toString()).toBe("40,10,50,20");
	});


	it("last from left L ", function () {
		var b = anUsage();
		b.widthLeftL();
		var usage = b.build();

		var found = usage.getLastItemPosition();
		console.log('L ', found.toString());
		expect(found.toString()).toBe("0,10,10,20");

		var s = new SquareItem(10, 10);
		var square = usage.addSquare(s);
		expect(usage.getLastItemPosition().toString()).toBe(square.position.toString());


	});

});
