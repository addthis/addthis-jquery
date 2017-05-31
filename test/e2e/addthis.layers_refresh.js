//var webdriverio = require('webdriverio');

describe('$.addthis().layers_refresh', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('test/fixtures');
        fixture.load('1no.explicit.configuration.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';

        document.head.appendChild(jqueryScript);
        var jqueryIntervalId = window.setInterval(function() {
            if (typeof window.jQuery !== 'undefined') {
                clearInterval(jqueryIntervalId);
                $ = window.jQuery;
                document.head.appendChild(addthisPluginScript);
                var addthisPluginIntervalId = window.setInterval(function() {
                    if (typeof $.addthis !== 'undefined') {
                        clearInterval(addthisPluginIntervalId);
                        done();
                    }
                }, 50);
            }
        }, 50);
    });

    it('should be defined', function() {
        expect($.addthis().layers_refresh).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().layers_refresh();
        expect(jQueryCopy).toEqual($);
    });

    it('should do nothing if window.addthis is defined but window.addthis.layers is not defined', function() {
        expect($.addthis().current.layers_refresh._intervalId).toBe(false);
        window.addthis = {};
        $.addthis().layers_refresh();
        expect($.addthis().current.layers_refresh._intervalId).toBe(false);
    });

    it('should do nothing if window.addthis.layers is defined but window.addthis.layers.refresh is not defined', function() {
        expect($.addthis().current.layers_refresh._intervalId).toBe(false);
        window.addthis = { layers: {} };
        $.addthis().layers_refresh();
        expect($.addthis().current.layers_refresh._intervalId).toBe(false);
    });

    it('should set up an interval if window.addthis.layers.refresh is defined', function(done) {
        expect($.addthis().current.layers_refresh._intervalId).toBe(false);
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis().layers_refresh();
        expect($.addthis().current.layers_refresh._intervalId).not.toBe(false);

        // let the triggered events finish off else the test fails ¯\_(ツ)_/¯
        setTimeout(done, 601);
    });

    it('does not set up a new interval when one is already setup', function(done) {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis().layers_refresh();
        expect($.addthis().current.layers_refresh._intervalId).not.toBe(false);
        var firstIntervalId = $.addthis().current.layers_refresh._intervalId;
        $.addthis().layers_refresh();
        expect($.addthis().current.layers_refresh._intervalId).toBe(firstIntervalId);

        // let the triggered events finish off else the test fails ¯\_(ツ)_/¯
        setTimeout(done, 601);
    });

    it('updates timestamp when run again', function(done) {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis().layers_refresh();
        var firstTs = $.addthis().current.layers_refresh._lastTs;
        window.setTimeout(function() {
            $.addthis().layers_refresh();
            expect($.addthis().current.layers_refresh._lastTs).not.toBe(firstTs);
            // let the triggered events finish off else the test fails ¯\_(ツ)_/¯
            setTimeout(done, 601);
        }, 1);
    });

    it('does not run window.addthis.layers.refresh until 100ms after the last call to $.addthis().layers_refresh', function(done) {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        var addthisPlugin = $.addthis();

        spyOn(window.addthis.layers, 'refresh').and.callThrough();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();

        addthisPlugin.layers_refresh();

        expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);

        window.setTimeout(function() {
            addthisPlugin.layers_refresh();
            expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
            expect(addthisPlugin.layers_refresh.calls.count()).toEqual(2);
        }, 50);

        window.setTimeout(function() {
            expect(addthisPlugin.layers_refresh.calls.count()).toEqual(2);
            expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
        }, 101);

        window.setTimeout(function() {
            expect(window.addthis.layers.refresh.calls.count()).toEqual(1);
            expect(addthisPlugin.layers_refresh.calls.count()).toEqual(2);
            // let the triggered events finish off else the test fails ¯\_(ツ)_/¯
            setTimeout(done, 601);
        }, 251);
    });

    it('calls addthis.layers.refresh eventually once defined', function(done) {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        var addthisPlugin = $.addthis();

        spyOn(window.addthis.layers, 'refresh').and.callThrough();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();

        expect(addthisPlugin.current.layers_refresh._intervalId).toBe(false);
        addthisPlugin.layers_refresh();
        expect(addthisPlugin.current.layers_refresh._intervalId).not.toBe(false);

        expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);

        window.setTimeout(function() {
            expect(window.addthis.layers.refresh.calls.count()).toEqual(1);
            expect(addthisPlugin.current.layers_refresh._intervalId).toBe(false);
            // let the triggered events finish off else the test fails ¯\_(ツ)_/¯
            setTimeout(done, 601);
        }, 101);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;
    });
});