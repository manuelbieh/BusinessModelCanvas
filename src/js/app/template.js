define(['jquery', 'handlebars', 'app/config', 'app/callback'], function($, hbs, cfg, callback) {

	hbs.registerHelper('breaklines', function(text) {
		text = hbs.Utils.escapeExpression(text);
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return new hbs.SafeString(text);
	});

	hbs.registerHelper('toupper', function(text) {
		text = hbs.Utils.escapeExpression(text);
		text = text.toUpperCase();
		return new hbs.SafeString(text);
	});

	hbs.registerHelper('chain', function () {
		var helpers = [], value;
		$.each(arguments, function (i, arg) {
			if (hbs.helpers[arg]) {
				helpers.push(hbs.helpers[arg]);
			} else {
				value = arg;
				$.each(helpers, function (j, helper) {
					value = helper(value, arguments[i + 1]);
				});
				return false;
			}
		});
		return value;
	});

	return {

		render: function(tplName, tplData) {

			tplName = tplName.replace(/\.html$/,'');

			var loadTpl = $.ajax(cfg.baseUrl + '/templates/' + tplName + '.html');

			var params = {
				template: tplName,
			};

			loadTpl.always(function() {

				callback.trigger('pageload', params);

			}).done(function(rawTpl) {

				$('#main').html(hbs.compile(rawTpl)(tplData));

				callback.trigger('pageload.success', params);

			}).fail(function() {

				callback.trigger('pageload.error', params);

			});

			return loadTpl;

		}

	};

});