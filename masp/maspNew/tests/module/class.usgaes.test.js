/*global expect, it, describe, Usages, module, Position, SquareItem, UsagesBuilder, beforeEach */
var anUsage = function () {
	return new UsagesBuilder();
};

describe("Usages tests", function () {
	"use strict";

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
		var a = anUsage().build(),
			found,
			last;


		a.addUsagePixo(new Position(0, 0, 10, 10));
		a.addUsagePixo(new Position(10, 0, 20, 10));
		a.addUsagePixo(new Position(20, 0, 30, 15));

		last = new Position(10, 10, 20, 20);
		a.addUsagePixo(last);

		found = a.getLastItemPosition();
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
		var a = anUsage(),
			found;

		a.widthTwoFiveItemLines();
		found = a.build().getLastItemPosition();
		console.log("2 lines", found.toString());
		expect(found.toString()).toBe("40,10,50,20");
	});


	it("last from left L ", function () {
		var b = anUsage(),
			usage,
			found;

		b.widthLeftL();
		usage = b.build();

		found = usage.getLastItemPosition();
		console.log('L ', found.toString());
		expect(found.toString()).toBe("0,10,10,20");

		var s = new SquareItem(10, 10),
			square = usage.addSquare(s);

		expect(usage.getLastItemPosition().toString()).toBe(square.position.toString());
		expect(square.position.toString()).toBe("10,10,20,20");
	});


	it("widthLineFull  - create new line ", function () {
		var b = anUsage(),
			usage,
			squareUsage,
			found;

		b.widthLineFull();
		usage = b.build();

		found = usage.getLastItemPosition();
		expect(found.toString()).toBe("90,0,100,10");

		squareUsage = usage.addSquare(new SquareItem(10, 10));

		expect(usage.getLastItemPosition().toString()).toBe(squareUsage.position.toString());
		expect(squareUsage.position.toString()).toBe("0,10,10,20");

	});

	it("find items in interval - horizontal", function () {
		var usage = anUsage()
			.widthLeftL()
			.build();

		expect(usage.itemsInInterval(0, 15).length).toBe(3);
		expect(usage.itemsInInterval(0, 10).length).toBe(2);
		expect(usage.itemsInInterval(0, 9).length).toBe(2);
	});

	it("find most bottom items in interval - horizontal", function () {
		var usage = anUsage()
			.widthLeftL()
			.build();

		var a = usage.findMostBottom(0, 10);

		expect(usage.findMostBottom(0, 10).position.y2).toBe(20);
		expect(usage.findMostBottom(10, 20).position.y2).toBe(10);
		expect(usage.findMostBottom(12, 18).position.y2).toBe(10);
	});

});
