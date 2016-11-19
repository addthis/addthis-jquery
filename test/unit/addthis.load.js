
'use strict';

describe('$.addthis.load', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };

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
        expect($.addthis.load).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis.load();
        expect(jQueryCopy).toEqual($);
    });

    it('does not immidiately call callback if window.addthis is not set', function() {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        $.addthis.load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(0);
    });

    it('sets up interval if window.addthis is not set', function() {
        expect($.addthis.load._intervalId).toBe(false);
        $.addthis.load(function() {});
        expect($.addthis.load._intervalId).not.toBe(false);
    });

    it('immidiately calls callback if window.addthis is set', function() {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        window.addthis = true;
        $.addthis.load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(1);
    });

    it('does not set up a new interval when on is already setup', function() {
        expect($.addthis.load._intervalId).toBe(false);
        $.addthis.load(function() {});
        expect($.addthis.load._intervalId).not.toBe(false);
        var firstIntervalId = $.addthis.load._intervalId;
        $.addthis.load(function() {});
        expect($.addthis.load._intervalId).toBe(firstIntervalId);
    });

    it('calls callback after window.addthis is set up later', function(done) {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        $.addthis.load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(0);
        window.setTimeout(function() {
            expect(myCallbacksObject.callback.calls.count()).toEqual(0);
            window.addthis = true;
            window.setTimeout(function() {
                expect(myCallbacksObject.callback.calls.count()).toEqual(1);
                done();
            }, 201);
        }, 201);
    });
});