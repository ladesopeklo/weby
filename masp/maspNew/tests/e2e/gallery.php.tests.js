/*global apiWrapper, expect, it, describe, waitsFor, ApiWrapper, Gallery, MenuItemList*/
var xxx = ['$scope', 'galleryApi', 'menuApi', function ($scope, galleryApi, menuApi) {
	"use strict";

	var api = new ApiWrapper(galleryApi, menuApi),

		waitsForJqPromise = function (promise) {
			waitsFor(function () {
				return promise.state() === "resolved" || promise.state() === "rejected";
			});
		};

	describe("jasmine run in angular controller ", function () {
		it('gallery.php - gallery ', function () {
			var promise = api.gallery("dalov");

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data.images.length).toBeGreaterThan(5);
				console.log(data)
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

		it('gallerylist', function () {
			var promise = api.galleryList(["exalt", "dalov", "chuj"]);

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data instanceof Array).toBeTruthy();
				expect(data.length).toBeGreaterThan(0);

				console.log("gallerylist", data);
			});

			waitsForJqPromise(promise);
		});
		it('wrong params - gallerylist, gallerymap', function () {
			var list,
				promise = api.galleryList();

			promise.done(function (data) {
				expect(data).toBeDefined();
				expect(data instanceof Array).toBeTruthy();

				console.log("gallerylist empty", data);
			});

			list = api.galleryMap();

			list.done(function (data) {
				expect(data).toBeDefined();
				console.log("gallerymap empty", data);
			});

			waitsForJqPromise(promise);
		});

		it('get MenuItemsList', function () {

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



	});


}];

