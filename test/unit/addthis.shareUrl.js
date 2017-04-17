
'use strict';

describe('$.addthis().shareUrl', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var url = 'https://www.addthis.com';

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
        expect($.addthis().shareUrl).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().shareUrl();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis().layers_refresh', function() {
        var addthisPlugin = $.addthis();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();
        addthisPlugin.shareUrl(url);
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_share.url to what we passed', function() {
        $.addthis().shareUrl(url);
        expect(window.addthis_share.url).toBe(url);
        expect($.addthis().defaults.share.url).toBe(url);
        expect($.addthis().current.share.url).toBe(url);
    });

    it('should not touch existing defaults in $.addthis().defaults.share', function() {
        $.addthis().defaults.share = testConfigs1;
        $.addthis().shareUrl(url);
        expect($.addthis().defaults.share.url).toEqual(url);
        expect($.addthis().current.share.url).toEqual(url);
        expect(window.addthis_share.url).toEqual(url);
        expect($.addthis().defaults.share.foo).toEqual('bar');
        expect($.addthis().current.share.foo).not.toEqual('bar');
        expect(window.addthis_share.foo).not.toEqual('bar');
    });
});