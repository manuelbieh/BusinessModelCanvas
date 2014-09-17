define(["app/config"], function(cfg) {

    var method;
    var noop = function () {};

    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];

    var length = methods.length;
    var debug = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!debug[method] || cfg.debug == false) {
            debug[method] = noop;
        }
    }

	return debug;

});