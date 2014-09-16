var BusinessModelCanvas = {

	canvas: $('.outer'),

	minScale: 0.5,

	storageKey: 'business-canvas',

	placeholder: '...',

	init: function() {

		var self = this;

		$('[name="canvas-scale"]').on('input', function(e) {
			var scale = $(this).val();
			self.setSize(scale);
		});

		$('[contenteditable]').each(function(i, el) {

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

			}).on('blur', function() {

				var target = $(this);

				if(target.html().replace(/\s*/g,'') === '') {
					target.html(self.placeholder);
				}

			});

		});

		$('header').find('[contenteditable]').on('input', function(e) {
			$(this).html($(this).html().replace(/(\n|\<br\>)/,''));
		});

	},

	getValueForElement: function(el) {

		el = $(el);

		var data = JSON.parse(localStorage.getItem(this.storageKey)) || {content: {}};

		if(typeof el.attr('id') !== "undefined") {

			// get content by element's ID
			return data.content[el.attr('id')];
		} else {
			// if no ID is present try to get content for element's index
			return this.getValueForContentIndex($('[contenteditable]').index(el));
		}

		return data.content[index];

	},

	setValueForElement: function(el, content) {

		var data = JSON.parse(localStorage.getItem(this.storageKey)) || {content: {}};

		if(typeof el.attr('id') !== "undefined") {
			// set content for element's ID
			data.content[el.attr('id')] = content;
			localStorage.setItem('business-canvas', JSON.stringify(data));
		} else {
			// if no ID is present set content for element's index
			this.setValueForContentIndex($('[contenteditable]').index(el), content);
		}

		return this;

	},

	getValueForContentIndex: function(index) {

		var data = JSON.parse(localStorage.getItem(this.storageKey)) || {content: {}};

		return data.content[index];

	},

	setValueForContentIndex: function(index, content) {

		var data = JSON.parse(localStorage.getItem(this.storageKey)) || {content: {}};

		data.content[index] = content;

		localStorage.setItem('business-canvas', JSON.stringify(data));

		return this;

	},

	getCanvasScale: function() {

		var canvasMatrix = this.canvas.css('transform').match('matrix[\(](.*), (.*), (.*), (.*), (.*), (.*)[\)]');

		return {
			x: parseFloat(canvasMatrix[1]) || 1,
			y: parseFloat(canvasMatrix[4]) || 1
		};

	},

	findMaxSize: function() {

		var max = this.minScale + 0.1;
	
		while(true) {

			if(this.validateScale(max) === true) {
				max = (Math.round(max * 10)+1)/10
			} else {
				return max -= 0.1;
			}

		}

	},

	getSizes: function() {

		return {
			canvasWidth: this.canvas.outerWidth(),
			canvasHeight: this.canvas.outerHeight(),
			windowWidth: $(window).innerWidth(),
			windowHeight: $(window).innerHeight(),
			currentScale: this.getCanvasScale()
		};

	},

	increaseSize: function() {

		var sizes = this.getSizes();

		var possibleNewScale = (parseFloat(sizes.currentScale.x) + 0.1);

		this.setSize(possibleNewScale);

	},

	decreaseSize: function() {

		var sizes = this.getSizes();

		this.setSize(sizes.currentScale.x - 0.1);

	},

	resetSize: function() {
		this.canvas.css('transform', 'scale(1)');
	},

	setSize: function(scale) {

		scale = parseFloat(scale);

		if(this.validateScale(scale) === true) {
			this.canvas.css('transform', 'scale('+ scale +')');
		}

	},

	validateScale: function(scale) {

		var sizes = this.getSizes();
		scale = parseFloat(scale);

		if(((sizes.canvasWidth * scale < sizes.windowWidth) 
		&& (sizes.canvasHeight * scale < sizes.windowHeight)
		&& scale > this.minScale)
		|| scale <= 1.0 ) {
			return true;
		} else {
			return false;
		}

	}

}

BusinessModelCanvas.init();