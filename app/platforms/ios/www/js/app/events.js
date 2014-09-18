define(["jquery", "app/callback", "app/ui", "app/settings", "app/router", "app/config", "app/canvas"], function($, Callback, UI, Settings, Router, Config, Canvas) {

	$(function() {

		$('body').fadeIn(function() {
			$('body').removeClass('loading');
		});

	});

	$(document).on('click', 'a', function() {
		UI.loading.show();
	});

	$(document).on('click', '.go-back', function() {
		history.back();
	});

	$(document).find('[name="canvas-scale"]').on('input', function(e) {
		var scale = $(this).val();
		self.setSize(scale);
	});

	$(document).on('click', '#canvas-help', function(e) {
		$('#canvas').toggleClass('show-description');
	});

	$(document).find('header').find('[contenteditable]').on('input', function(e) {
		$(this).html($(this).html().replace(/(\n|\<br\>)/,''));
	});

	$(document).find('#menu').find('.hamburger').on('click', function(e) {
		UI.menu.toggle();
	});

	$(document).on('submit', '#create', function(e) {

		var canvasName = $('[name="model-name"]').val();

		if(canvasName.length === 0) {
			$('.errors').html('<p>Please enter a name.</p>').addClass('is-visible');
			return false;
		}

		if(typeof Canvas.getCanvas(canvasName) !== "undefined") {
			$('.errors').html('<p>Name already exists. Please choose another one.</p>').addClass('is-visible');
			return false;
		}

		Canvas.save(canvasName);

		Router.go('/canvas/' + canvasName);

		e.preventDefault();
		return false;

	});

	// $(document).on('click', '#create-canvas', function() {
	// 	$('#create').trigger('submit');
	// });


	Callback.on('pageload', function() {
		UI.menu.hide();
		UI.loading.hide();
	});

});