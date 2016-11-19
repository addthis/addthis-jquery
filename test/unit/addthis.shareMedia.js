
'use strict';

describe('$.addthis.shareMedia', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var media = 'https://www.addthis.com/img/png';

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
        expect($.addthis.shareMedia).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis.shareMedia();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis.layers_refresh', function() {
        spyOn($.addthis, 'layers_refresh').and.callThrough();
        $.addthis.shareMedia(media);
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_share to a copy of what we passed', function() {
        $.addthis.shareMedia(media);
        expect(window.addthis_share.media).toBe(media);
        expect($.addthis.share.defaults.media).toBe(media);
        expect($.addthis.share.current.media).toBe(media);
    });

    it('should not touch existing defaults in $.addthis.share.defaults', function() {
        $.addthis.share.defaults = testConfigs1;
        $.addthis.shareMedia(media);
        expect($.addthis.share.defaults.media).toEqual(media);
        expect($.addthis.share.current.media).toEqual(media);
        expect(window.addthis_share.media).toEqual(media);
        expect($.addthis.share.defaults.foo).toEqual('bar');
        expect($.addthis.share.current.foo).not.toEqual('bar');
        expect(window.addthis_share.foo).not.toEqual('bar');
    });
});