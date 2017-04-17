'use strict';

describe('$.addthis().layers_refresh', function() {
    afterEach(function() {
        $.addthis().defaults.config = {};
        $.addthis().current.config = {};

        $.addthis().defaults.share = {};
        $.addthis().current.share = {};

        $.addthis().current.load._callbacks = [];

        $.addthis().current.layers_refresh._lastTs = 0;
        $.addthis().current.layers_refresh.pending = 0;

        if ($.addthis().current.load._intervalId) {
            clearInterval($.addthis().current.load._intervalId);
            $.addthis().current.load._intervalId = false;
        }

        if ($.addthis().current.layers_refresh._intervalId) {
            clearInterval($.addthis().current.layers_refresh._intervalId);
            $.addthis().current.layers_refresh._intervalId = false;
        }

        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
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


    it('should set up an interval if window.addthis.layers.refresh is defined', function() {
        expect($.addthis().current.layers_refresh._intervalId).toBe(false);
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis().layers_refresh();
        expect($.addthis().current.layers_refresh._intervalId).not.toBe(false);
    });

    it('does not set up a new interval when one is already setup', function() {
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
            done();
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
            done();
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
            done();
        }, 101);
    });
});