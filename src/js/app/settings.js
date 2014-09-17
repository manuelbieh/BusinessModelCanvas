define(["jquery", "app/callback"], function($, Callback) {

	var settings = {

		getAll: function() {
			return JSON.parse(
				localStorage.getItem('settings')
			) || {};
		},

		get: function(key) {

			return this.getAll()[key] || null;

		},

		set: function(key, value) {

			var settings = this.getAll();
			settings[key] = value;

			localStorage.setItem('settings',
				JSON.stringify(settings)
			);

		}

	}

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