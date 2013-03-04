/*global describe, it, expect, MenuItem, module, beforeEach, Locales*/
describe("Locales tests", function () {
	var loc,
		res = {
		gallery: {
			exalt: {
				title: "chuj",
				text: "ljandlkanslkdnasd TEXT"
			}
		}
	};

	beforeEach(function () {
		loc = new Locales(res);
	});

	it("simple - first level", function () {
		expect(loc.t("gallery")).toBeDefined();
		expect(loc.t("gallery").exalt.title).toBe("chuj");
	});

	it("get deep resource", function () {
		expect(loc.t("gallery.exalt.title")).toBe("chuj");
	});

	it("get non existing ", function () {
		expect(loc.t("gallery.XXX.XXX")).toBe("");
	});



});
