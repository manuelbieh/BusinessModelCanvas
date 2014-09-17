define(["jquery", "app/callback"], function($, Callback) {

	var _defaults = {
		autosave: true
	};

	var settings = {

		getAll: function() {
			return JSON.parse(
				localStorage.getItem('settings')
			) || undefined;
		},

		get: function(key) {

			var allSettings = this.getAll();

			if(typeof allSettings !== "undefined") {
				return this.getAll()[key];
			} else if(typeof _defaults[key] !== "undefined") {
				return _defaults[key];
			}

		},

		set: function(key, value) {

			var settings = this.getAll();

			if(typeof settings === "undefined" || settings === null) {
				settings = {};
			}

			settings[key] = value;

			localStorage.setItem('settings',
				JSON.stringify(settings)
			);

		}

	};

	$(document).on('change', '#settings input', function(e) {

		var el = $(e.target);

		switch(e.target.type) {

			case 'checkbox':

				settings.set(
					el.attr('name'),
					(el.is(':checked') ? true : false)
				);

				break;


			case 'radio':

				settings.set(
					el.attr('name'),
					el.val()
				);

				break;

		}

	});


	Callback.on('pageload.success', function(data) {

		if(data && data.template == 'settings') {

			var currentSettings = settings.getAll();

			if(typeof currentSettings === "undefined") {
				return;
			}

			$.each(currentSettings, function(key, value) {

				var el = $('[name="' + key + '"]');

				if(el.is(':checkbox')) {

					el.prop('checked', value);

				} else if(el.is(':radio')) {

					el.filter('[value="' + value + '"]').prop('checked', true);

				}

			});

		}

	});

	return settings;

});