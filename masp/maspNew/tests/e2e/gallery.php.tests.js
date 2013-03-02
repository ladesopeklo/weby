/*global runs, apiWrapper, expect, it, describe, waitsFor, ApiWrapper, Gallery, MenuItemList, GalleryList, Locales*/
var xxx = ['$scope', 'galleryApi', 'resourcesApi', function ($scope, galleryApi, resourcesApi) {
	"use strict";

	var api = new ApiWrapper(galleryApi, resourcesApi),

		waitsForJqPromise = function (promise) {
			waitsFor(function () {
				return promise.state() === "resolved" || promise.state() === "rejected";
			});
		};

	describe("Gallery List tests ", function () {

		it('gallerylist', function () {
			var promise = api.galleryList(["exalt", "dalov", "chuj"]);

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data instanceof GalleryList).toBeTruthy();
				expect(data.length).toBeGreaterThan(0);
				console.log("gallerylist", data);
			});

			waitsForJqPromise(promise);
		});

		it('gallerylist', function () {
			var promise = api.galleryList(["exalt", "dalov", "chuj"]),
				galleryList = {};

			promise.done(function (data) {
				galleryList = data;
				return data;
			});

			waitsForJqPromise(promise);

			runs(function () {
				expect(galleryList.length).toBe(2);

				var exalt = galleryList.get("exalt");
				expect(exalt).toBeDefined();
				expect(exalt.images.length).toBeGreaterThan(0);
			});

		});
	});

	describe("jasmine run in angular controller ", function () {
		it('gallery.php - gallery ', function () {
			var promise = api.gallery("dalov");

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data.images.length).toBeGreaterThan(5);
				console.log(data);
			});

			waitsForJqPromise(promise);
		});

		it('gallerymap', function () {
			var promise = api.galleryMap(["exalt", "dalov"]);

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data["exalt"] instanceof Gallery).toBeTruthy();
				expect(data["dalov"] instanceof Gallery).toBeTruthy();
				expect(data["xxx"]).toBeUndefined();

				console.log("gallerymap", data);
			});

			waitsForJqPromise(promise);
		});

		it('wrong params - gallerylist, gallerymap', function () {
			var list,
				promise = api.galleryList();

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data instanceof GalleryList).toBeTruthy();

				console.log("gallerylist empty", data);
			});

			list = api.galleryMap();

			list.done(function (data) {
				expect(data).toBeDefined();
				console.log("gallerymap empty", data);
			});

			waitsForJqPromise(promise);
		});
	});

	describe("menu api tests ", function () {

		it('check instance of menu', function () {
			var promise = api.menu();
			promise.done(function (data) {
				expect(data instanceof MenuItemList).toBeTruthy();
				expect(data.items.length).toBeGreaterThan(0);
				console.log(data);
			});
			waitsForJqPromise(promise);
		});

		it('check instance of menu', function () {
			var promise = api.menu();
			promise.done(function (data) {

				console.log(data.items[0]);
			});
			waitsForJqPromise(promise);
		});

		it('all links', function () {
			var promise = api.menu();
			promise.done(function (data) {
				console.log(data.allGalleryLinks());
			});
			waitsForJqPromise(promise);
		});
		it('TEMP - convert menuItemsList to locales', function () {
			var promise = api.menu();
			promise.done(function (data) {
				console.log(JSON.stringify(data.toLocales("cs")));
				console.log(JSON.stringify(data.toLocales("en")));
			});
			waitsForJqPromise(promise);
		});
	});

	describe("Resources api ", function () {
		it('check instance of locales', function () {
			var promise = api.locales("en-us");
			promise.done(function (data) {
				expect(data instanceof Locales).toBeTruthy();
				expect(data.items).toBeDefined();
				console.log(data);
			});
			waitsForJqPromise(promise);
		});
	});

}];

