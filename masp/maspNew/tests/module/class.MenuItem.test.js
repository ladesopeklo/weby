/*global describe, it, expect, MenuItem, module, beforeEach*/
describe("api wrapper tests", function () {

	beforeEach(module('appConfigModule', function ($provide) {


	}));

	it("childrenItemsLinks", function () {
		var children = [
				new MenuItem("txt", "link1"),
				new MenuItem("txt", "gallery/link2"),
				new MenuItem("txt", "content/link3"),
				new MenuItem("txt", "gallery/link4"),
				new MenuItem("txt", "")
			],
			item = new MenuItem("text", "link", "title", children),
			links = item.childrenItemsLinks();

		expect(links.length).toBe(4);
		expect(links[0]).toBe("link1");
		expect(links[1]).toBe("link2");
		expect(links[2]).toBe("link3");
		expect(links[3]).toBe("link4");
		expect(links instanceof Array).toBeTruthy();
	});

	it("childrenItemsLinks - specify type", function () {
		var children = [
				new MenuItem("txt", "gallery/link1"),
				new MenuItem("txt", "content/link2"),
				new MenuItem("txt", "link3"),
				new MenuItem("txt", "gallery/link4")
			],
			item = new MenuItem("text", "link", "title", children),
			links = item.childrenItemsLinks(MenuItem.ItemTypes.Gallery);

		expect(links.length).toBe(2);
		expect(links[0]).toBe("link1");
		expect(links[1]).toBe("link4");
		expect(links instanceof Array).toBeTruthy();
	});

	it("try childrenItemsLinks with no children ", function () {
		var children,
			item = new MenuItem("text", "link", "title", children),
			links = item.childrenItemsLinks();

		expect(links.length).toBe(0);
		expect(links instanceof Array).toBeTruthy();


		console.log(links)
	});

	it("try childrenItemsLinks with no children ", function () {
	});

});