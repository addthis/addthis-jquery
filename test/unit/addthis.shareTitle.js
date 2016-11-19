
'use strict';

describe('$.addthis.shareTitle', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var title = 'hello world';

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
        expect($.addthis.shareTitle).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis.shareTitle();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis.layers_refresh', function() {
        spyOn($.addthis, 'layers_refresh').and.callThrough();
        $.addthis.shareTitle(title);
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_share to a copy of what we passed', function() {
        $.addthis.shareTitle(title);
        expect(window.addthis_share.title).toBe(title);
        expect($.addthis.share.defaults.title).toBe(title);
        expect($.addthis.share.current.title).toBe(title);
    });

    it('should not touch existing defaults in $.addthis.share.defaults', function() {
        $.addthis.share.defaults = testConfigs1;
        $.addthis.shareTitle(title);
        expect($.addthis.share.defaults.title).toEqual(title);
        expect($.addthis.share.current.title).toEqual(title);
        expect(window.addthis_share.title).toEqual(title);
        expect($.addthis.share.defaults.foo).toEqual('bar');
        expect($.addthis.share.current.foo).not.toEqual('bar');
        expect(window.addthis_share.foo).not.toEqual('bar');
    });
});