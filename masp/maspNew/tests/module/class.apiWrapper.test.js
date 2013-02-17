describe("api wrapper tests", function () {
	var converter= new RawDataConverter();

	beforeEach(module('appConfigModule', function ($provide) {
	}));

	it('convert server data to gallery object', inject(function () {
		var gallery = converter.rawDataToGallery(data);
		expect(gallery.images[0].thumb()).toBe("http://localhost:88/weby/masp/maspNew/Content/dalov/thumbs/Dalov1.jpg");
		expect(gallery.images[0].large()).toBe("http://localhost:88/weby/masp/maspNew/Content/dalov/slides/Dalov1.jpg");
	}));

	it('convert to menu object', inject(function () {
		var menu = converter.rawDataToMenu(menuData);
		expect(menu.length).toBe(5);
		expect(menu[0].text.cs).toBeDefined();
		expect(menu[0].text.en).toBeDefined();
		expect(menu[0].items.length).toBeGreaterThan(0)
	}));

	it('convert to menu object - try convert empty obejct', inject(function () {
		var menu = converter.rawDataToMenu();
		expect(menu.length).toBe(0)
	}));


	var data =
	{"images":[{"name":"Dalov1.jpg","title":""},{"name":"dalov2.jpg","title":""},{"name":"dalov3.jpg","title":""},{"name":"Dalov4.jpg","title":""},{"name":"dalov5.jpg","title":""},{"name":"Dalov6.jpg","title":""},{"name":"dalov7.jpg","title":""}],"vizualizace":["http:\/\/localhost:88\/weby\/masp\/maspNew\/Content\/dalov\/3d\/kuchynepanorama.html"],"full":"http:\/\/localhost:88\/weby\/masp\/maspNew\/Content\/dalov\/slides\/","thumb":"http:\/\/localhost:88\/weby\/masp\/maspNew\/Content\/dalov\/thumbs\/","location":"dalov"};

	var menuData = {"items":[
		{
			"text":{"cs":"REALIZACE","en":"REALIZATIONS"},
			"href":"content/realizace",
			"title":{"cs":"Realizace","en":"Realizace"},
			"items":[
				{
					"text":{"cs":"[2011] dům na Vyhlídce","en":"[2011] Family house at Vyhlídka"},
					"href":"gallery/vyhlidka",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2010] dům v Radzewicích","en":"[2010] House in Radzewice"},
					"href":"gallery/radzewice",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2009] chata u jezera","en":"[2009] summer house by a lake "},
					"href":"gallery/dalov",
					"title":{"cs":"Realizace","en":"Realizace"}
				},
				{
					"text":{"cs":"[2007] úprava vrcholu Bradlo","en":"[2007] viewing platform at the Bradlo Peak "},
					"href":"gallery/bradlo",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2006] Bergen wood festival","en":"[2006] Bergen wood festival"},
					"href":"gallery/bergen",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2006] ekologické WC na ostrově","en":"[2006] outhouse on Tamo"},
					"href":"gallery/tamo",
					"title":{"cs":"Kontakt","en":"Contact"}
				}
			]

		},

		{
			"text":{"cs":"PROJEKTY","en":"PROJECTS"},
			"href":"gallery/exalt",
			"title":{"cs":"Projekty","en":"Projects"},
			"items":[

				{
					"text":{"cs":"[2011] územní studie Chelčického","en":"[2011] urban study Chelčického"},
					"href":"gallery/chelcickeho",
					"title":{"cs":"Realizace","en":"Realizace"}
				},
				{
					"text":{"cs":"[2011] úpravy rodinného domu","en":"[2011] family house adaptation"},
					"href":"gallery/sadova",
					"title":{"cs":"Realizace","en":"Realizace"}
				},
				{
					"text":{"cs":"[2011] areál firmy Exalt a.s.","en":"[2011] Exalt company headquarters"},
					"href":"gallery/exalt",
					"title":{"cs":"Realizace","en":"Realizace"}
				},
				{
					"text":{"cs":"[2011] rekonstrukce domu v Hodolanech","en":"[2011] reconstruction of a family house"},"href":"gallery/praslavska","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{
						"cs":"[2011] úprava podkroví činžovního domu",
						"en":"[2011] attic conversion"},"href":"gallery/kozinova","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{
						"cs":"[2011] rodinný dům Olomouc",
						"en":"[2011] family house in Olomouc"},"href":"gallery/repcin","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{
						"cs":"[2010] gynekologická ordinace",
						"en":"[2010] gynecologist´s office "},"href":"gallery/topic","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{
						"cs":"[2010] rozšíření typového domu",
						"en":"[2010] type-house extension"},"href":"gallery/klosovi","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{
						"cs":"[2009] renovace domu a podkroví",
						"en":"[2009] house renovation and attic conversion"},"href":"gallery/novakovi","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2008] přístavba bazénu k RD, Poznań","en":"[2008] swimming pool, Poznań"},"href":"gallery/poznan","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2008] škola Srebrna Gora","en":"[2008] school in Srebrna Gora"},"href":"gallery/tamo","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2008] polyfunkční dům, Olomouc","en":"[2008] polyfunctional house Olomouc"},"href":"gallery/diplomka","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2007] multifunkční objekt, Dědinka","en":"[2007] multifunctional structure, Dědinka"},"href":"gallery/dedinka","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2007] plavecký bazén, Sczeczin","en":"[2007] swimming pool, Sczeczin"},"href":"gallery/bazen","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2005] administrativní dům Zlín","en":"[2005] administrative house in Zlín"},"href":"gallery/bakalarka","title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2005] minimální podzemní dům","en":"[2005] minimal subterranean housing"},"href":"gallery/podzemni","title":{"cs":"Kontakt","en":"Contact"}
				}
			]
		},

		{
			"text":{"cs":"DESIGN","en":"DESIGN"},
			"href":"content/design",
			"title":{"cs":"Kontakt","en":"Contact"},
			"items":[
				{
					"text":{"cs":"[2011] pf 2012","en":"[2011] pf 2012"},
					"href":"gallery/pf2012",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2011] ci Matouš Pelikán, Advokát ","en":"[2011] CI Matouš Pelikán, Advocate "},
					"href":"gallery/matouspelikan",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"[2011] ci Masparti ","en":"[2011] CI Masparti"},
					"href":"gallery/masparti",
					"title":{"cs":"Realizace","en":"Realizace"}
				},
				{
					"text":{"cs":"[2009] gril","en":"[2009] grill"},
					"href":"gallery/grill",
					"title":{"cs":"Realizace","en":"Realizace"}
				},
				{
					"text":{"cs":"[2009] veletržní prezentace","en":"[2009] fair stands"},
					"href":"gallery/stands",
					"title":{"cs":"Realizace","en":"Realizace"}
				}
			]
		},

		{
			"text":{"cs":"VIZUALIZACE","en":"VIZUALIZATIONS"},
			"href":"content/vizualizace",
			"title":{"cs":"Kontakt","en":"Contact"},
			"items":[
				{
					"text":{"cs":"exteriér","en":"exterier"},
					"href":"gallery/exterier",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"interér","en":"interior"},
					"href":"gallery/interier",
					"title":{"cs":"Kontakt","en":"Contact"}
				}
			]
		},

		{
			"text":{"cs":"KANCELÁŘ","en":"THE OFFICE"},
			"title":{"cs":"Kontakt","en":"Contact"},
			"items":[
				{
					"text":{"cs":"profil","en":"profile"},
					"href":"content/profil",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"ocenění","en":"awards"},
					"href":"content/profil",
					"title":{"cs":"Kontakt","en":"Contact"}
				},
				{
					"text":{"cs":"kontakt","en":"contact"},
					"href":"content/kontakt",
					"title":{"cs":"Kontakt","en":"Contact"}
				}
			]
		}

	]}

});
