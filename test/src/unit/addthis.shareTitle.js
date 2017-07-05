
'use strict';

describe('$.addthis().shareTitle', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var title = 'hello world';

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
        expect($.addthis().shareTitle).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().shareTitle();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis().layers_refresh', function() {
        var addthisPlugin = $.addthis();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();
        addthisPlugin.shareTitle(title);
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_share.title to what we passed', function() {
        $.addthis().shareTitle(title);
        expect(window.addthis_share.title).toBe(title);
        expect($.addthis().defaults.share.title).toBe(title);
        expect($.addthis().current.share.title).toBe(title);
    });

    it('should not touch existing defaults in $.addthis().defaults.share', function() {
        $.addthis().defaults.share = testConfigs1;
        $.addthis().shareTitle(title);
        expect($.addthis().defaults.share.title).toEqual(title);
        expect($.addthis().current.share.title).toEqual(title);
        expect(window.addthis_share.title).toEqual(title);
        expect($.addthis().defaults.share.foo).toEqual('bar');
        expect($.addthis().current.share.foo).not.toEqual('bar');
        expect(window.addthis_share.foo).not.toEqual('bar');
    });
});