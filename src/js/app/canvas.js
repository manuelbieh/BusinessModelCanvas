define(["app/config"], function(Config) {

	var canvas = {

		getAllCanvases: function() {
			return JSON.parse(
				localStorage.getItem(Config.storageKey)
			) || {};
		},

		getCanvas: function(canvasName) {

			canvasName = decodeURIComponent(canvasName);
			return this.getAllCanvases()[canvasName] || {};

		},

		getField: function(canvasName, fieldName) {

			canvasName = decodeURIComponent(canvasName);
			return this.getCanvas(canvasName)[fieldName] || null;

		},

		set: function(canvasName, fieldName, value) {

			var canvas = this.getAllCanvases();
			canvasName = decodeURIComponent(canvasName);

			if(typeof canvas[canvasName] === "undefined") {
				canvas[canvasName] = {};
			}

			canvas[canvasName][fieldName] = value;

			localStorage.setItem(Config.storageKey,
				JSON.stringify(canvas)
			);

		}

	};

	return canvas;

});