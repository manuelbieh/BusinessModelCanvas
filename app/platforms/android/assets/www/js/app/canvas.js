define(["app/config"], function(Config) {

	var _getName = function(canvasName) {
		return decodeURIComponent(canvasName);
	};

	var _write = function(canvasData) {
		// TODO: check if canvasData is already a string
		localStorage.setItem(Config.storageKey,
			JSON.stringify(canvasData)
		);
	};

	var _sanitize = function(value) {
		// return value.replace(/\<\/?div\>/g,'').replace(/^\s*/,'').replace(/\*s$/,'');
		return value.replace(/^\s*/,'').replace(/\*s$/,'');
	};

	var canvas = {

		getAllCanvases: function() {
			return JSON.parse(
				localStorage.getItem(Config.storageKey)
			) || undefined;
		},

		getCanvas: function(canvasName) {

			var canvas = this.getAllCanvases();
			if(typeof canvas !== 'undefined') {
				return canvas[_getName(canvasName)];
			}

		},

		getField: function(canvasName, fieldName) {

			var canvas = this.getCanvas(
				_getName(canvasName)
			);

			if(typeof canvas !== 'undefined') {
				return canvas[fieldName];
			}

		},

		set: function(canvasName, fieldName, value) {

			var canvas = this.getAllCanvases();
			canvasName = _getName(canvasName);

			if(typeof canvas !== 'undefined' && typeof canvas[canvasName] === "undefined") {
				canvas[canvasName] = {};
			}

			canvas[canvasName][fieldName] = _sanitize(value);

			_write(canvas);

		},

		save: function(canvasName, overwrite) {

			var canvas = this.getAllCanvases() || {};
			var overwrite = !!overwrite;

			if(typeof canvas !== "undefined" && typeof canvas[_getName(canvasName)] === "undefined" || overwrite === true ) {

				canvas[_getName(canvasName)] = {
					name: canvasName,
					created: +new Date()
				};

				_write(canvas);

				return true;

			} else {

				return false;

			}

		},

		remove: function(canvasName) {

			var canvas = this.getAllCanvases();
			delete canvas[canvasName];
			_write(canvas);

		},

		rename: function(oldName, newName) {

			var canvas = this.getAllCanvases();

			canvas[newName] = canvas[oldName];
			delete canvas[oldName];

			_write(canvas);

		}

	};

	return canvas;

});