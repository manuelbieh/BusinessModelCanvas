define([], function() {

	return {

		baseUrl: location.host == 'dev.wiremore.de' ? '/bmc' : '',

		storageKey: 'business-models',

		debug: true

	};

});