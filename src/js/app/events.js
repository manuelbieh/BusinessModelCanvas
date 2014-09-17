define(["jquery", "app/callback", "app/ui", "app/settings", "app/router", "app/config"], function($, Callback, UI, Settings, Router, Config) {

	$(function() {

		$('body').fadeIn(function() {
			$('body').removeClass('loading');
		});

	});

	$(document).on('click', 'a', function() {
		UI.loading.show();
	});

	$(document).find('[name="canvas-scale"]').on('input', function(e) {
		var scale = $(this).val();
		self.setSize(scale);
	});

	$(document).find('[contenteditable]').each(function(i, el) {

		el = $(el);

		el.html(self.getValueForElement(el));

		el.on('input', function(e) {

			var target = $(this);
			self.setValueForElement(el, target.html());

		}).on('focus', function(e) {

			var target = $(this);
			if(target.html().replace(/\s*/g,'') === self.placeholder) {
				target.html('');
			}

			$('body').addClass('is-editing');

		}).on('blur', function() {

			var target = $(this);

			if(target.html().replace(/\s*/g,'') === '') {
				target.html(self.placeholder);
			}

			$('body').removeClass('is-editing');

		});

	});

	$(document).find('header').find('[contenteditable]').on('input', function(e) {
		$(this).html($(this).html().replace(/(\n|\<br\>)/,''));
	});

	$(document).find('#menu').find('.hamburger').on('click', function(e) {
		UI.menu.toggle();
	});

	$(document).on('click', '#create-canvas', function() {
		Router.go('/canvas/' + $('[name="model-name"]').val());
	});


	Callback.on('pageload', function() {
		UI.menu.hide();
		UI.loading.hide();
	});

});