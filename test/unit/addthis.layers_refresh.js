'use strict';

describe('$.addthis.layers_refresh', function() {
    afterEach(function() {
        $.addthis.config.defaults = {};
        $.addthis.config.current = {};

        $.addthis.share.defaults = {};
        $.addthis.share.current = {};

        $.addthis.load._callbacks = [];

        $.addthis.layers_refresh._lastTs = 0;
        $.addthis.layers_refresh.pending = 0;

        if ($.addthis.load._intervalId) {
            clearInterval($.addthis.load._intervalId);
            $.addthis.load._intervalId = false;
        }

        if ($.addthis.layers_refresh._intervalId) {
            clearInterval($.addthis.layers_refresh._intervalId);
            $.addthis.layers_refresh._intervalId = false;
        }

        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
    });

    it('should be defined', function() {
        expect($.addthis.layers_refresh).toBeDefined();
    });

    it('should do nothing if window.addthis is defined but window.addthis.layers is not defined', function() {
        expect($.addthis.layers_refresh._intervalId).toBe(false);
        window.addthis = {};
        $.addthis.layers_refresh();
        expect($.addthis.layers_refresh._intervalId).toBe(false);
    });

    it('should do nothing if window.addthis.layers is defined but window.addthis.layers.refresh is not defined', function() {
        expect($.addthis.layers_refresh._intervalId).toBe(false);
        window.addthis = { layers: {} };
        $.addthis.layers_refresh();
        expect($.addthis.layers_refresh._intervalId).toBe(false);
    });


    it('should set up an interval if window.addthis.layers.refresh is defined', function() {
        expect($.addthis.layers_refresh._intervalId).toBe(false);
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis.layers_refresh();
        expect($.addthis.layers_refresh._intervalId).not.toBe(false);
    });

    it('does not set up a new interval when one is already setup', function() {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis.layers_refresh();
        expect($.addthis.layers_refresh._intervalId).not.toBe(false);
        var firstIntervalId = $.addthis.layers_refresh._intervalId;
        $.addthis.layers_refresh();
        expect($.addthis.layers_refresh._intervalId).toBe(firstIntervalId);
    });

    it('updates timestamp when run again', function(done) {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };

        $.addthis.layers_refresh();
        var firstTs = $.addthis.layers_refresh._lastTs;
        window.setTimeout(function() {
            $.addthis.layers_refresh();
            expect($.addthis.layers_refresh._lastTs).not.toBe(firstTs);
            done();
        }, 1);
    });

    it('does not run window.addthis.layers.refresh until 100ms after the last call to $.addthis.layers_refresh', function(done) {
        window.addthis = {
            layers: {
                lastViewRegistered: 0,
                refresh: function() {}
            }
        };
        spyOn(window.addthis.layers, 'refresh').and.callThrough();
        spyOn($.addthis, 'layers_refresh').and.callThrough();

        $.addthis.layers_refresh();

        expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);

        window.setTimeout(function() {
            $.addthis.layers_refresh();
            expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
            expect($.addthis.layers_refresh.calls.count()).toEqual(2);
        }, 50);

        window.setTimeout(function() {
            expect($.addthis.layers_refresh.calls.count()).toEqual(2);
            expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
        }, 101);

        window.setTimeout(function() {
            expect(window.addthis.layers.refresh.calls.count()).toEqual(1);
            expect($.addthis.layers_refresh.calls.count()).toEqual(2);
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
        spyOn(window.addthis.layers, 'refresh').and.callThrough();

        spyOn($.addthis, 'layers_refresh').and.callThrough();
        expect($.addthis.layers_refresh._intervalId).toBe(false);
        $.addthis.layers_refresh();
        expect($.addthis.layers_refresh._intervalId).not.toBe(false);

        expect(window.addthis.layers.refresh.calls.count()).toEqual(0);
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);

        window.setTimeout(function() {
            expect(window.addthis.layers.refresh.calls.count()).toEqual(1);
            expect($.addthis.layers_refresh._intervalId).toBe(false);
            done();
        }, 101);
    });
});