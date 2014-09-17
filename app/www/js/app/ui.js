define(["jquery"], function($) {

	return {
		loading: {
			show: function() {
				$('body').addClass('is-loading');
			},
			hide: function() {
				$('body').removeClass('is-loading');
			}
		},
		menu: {
			toggle: function() {
				$('#menu').toggleClass('is-visible');
			},
			show: function() {
				$('#menu').addClass('is-visible');
			},
			hide: function() {
				$('#menu').removeClass('is-visible');
			}
		}
	};

});