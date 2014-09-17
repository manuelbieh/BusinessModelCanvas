requirejs.config({
    baseUrl: '/js/libs',
    paths: {
        app: '../app',
        handlebars: 'handlebars-v2.0.0',
        FastClick: 'fastclick'
    },
    urlArgs: "nocache=" + (+new Date()),
    shim: {
		'handlebars': {
			'exports': 'Handlebars'
		}
    }
});


require(["jquery", "handlebars", "FastClick", "jquery.locationObserver", "app/callback", "app/template", "app/events", "app/router", "app/config", "app/canvas"],
	function($, hbs, FastClick) {

	var Callback = require('app/callback');
	var Template = require('app/template');
	var Events = require('app/events');
	var Router = require('app/router');
	var Config = require('app/config');
	var Canvas = require('app/canvas');

	Router.set({
		baseUrl: Config.baseUrl
	});

	setTimeout(function() {
		$.locationObserver.start();
	}, 150);

	$(location).on('change', function() {
		Router.run();
	});

	FastClick.attach(document.body);

	Router.add('/(index.html)?', function() {

		var models = Canvas.getAllCanvases();

		Template.render('home', {
			models: models
		});

	});

	Router.add('/create', function() {
		Template.render('create');
	});

	Router.add('/settings', function() {
		Template.render('settings');
	});

	Router.add('/canvas', function() {
		Template.render('canvas');
	});

	Router.add('/canvas/(.*)', function(canvasName) {

		var canvasData = Canvas.getCanvas(canvasName);

		Template.render('canvas', {
			canvas: canvasData,
			canvasName: canvasName
		}).done(function() {

			$('[contenteditable]').each(function(i, el) {

				el = $(el);

				// get value from localStorage
				// el.html(
				// 	Canvas.getField(canvasName, el.attr('id'))
				// );

				// write new content to localStorage
				el.on('input', function(e) {

					Canvas.set(
						canvasName,
						el.attr('id'),
						el.html()
					);

				});

			});

		});

	});

	Router.run();

});