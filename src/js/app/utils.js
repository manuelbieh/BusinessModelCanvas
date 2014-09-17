define(["jquery"], function($) {

	return {

		isInternalURL: function(url) {

			if(url.match(/^[a-zA-Z]*:\/\//i)) {
				// external link
				return false;
			} else if(url.match(/^[\w|-]*:(.*)/i)) {
				// protocol handler
				return false;
			} else {
				// seems to be internal link
				return true;
			}


		}

	};

});