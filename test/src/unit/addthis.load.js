
'use strict';

describe('$.addthis().load', function() {
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
        expect($.addthis().load).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().load();
        expect(jQueryCopy).toEqual($);
    });

    it('does not immidiately call callback if window.addthis is not set', function() {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        $.addthis().load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(0);
    });

    it('sets up interval if window.addthis is not set', function() {
        expect($.addthis().current.load._intervalId).toBe(false);
        $.addthis().load(function() {});
        expect($.addthis().current.load._intervalId).not.toBe(false);
    });

    it('immidiately calls callback if window.addthis is set', function() {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        window.addthis = true;
        $.addthis().load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(1);
    });

    it('does not set up a new interval when on is already setup', function() {
        expect($.addthis().current.load._intervalId).toBe(false);
        $.addthis().load(function() {});
        expect($.addthis().current.load._intervalId).not.toBe(false);
        var firstIntervalId = $.addthis().current.load._intervalId;
        $.addthis().load(function() {});
        expect($.addthis().current.load._intervalId).toBe(firstIntervalId);
    });

    it('calls callback after window.addthis is set up later', function(done) {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        $.addthis().load(myCallbacksObject.callback);
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