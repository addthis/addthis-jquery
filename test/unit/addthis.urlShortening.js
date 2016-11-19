
'use strict';

describe('$.addthis.urlShortening', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var urlShorteningService = 'bitly';
    var socialService = 'twitter';

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
        expect($.addthis.urlShortening).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis.urlShortening();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis.layers_refresh', function() {
        spyOn($.addthis, 'layers_refresh').and.callThrough();
        $.addthis.urlShortening(urlShorteningService, socialService);
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);
    });

    describe('should configure url shortening for passed params', function() {
        it('in window.addthis_share', function() {
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
        });

        it('in $.addthis.share.current', function() {
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.current.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.current.shorteners[urlShorteningService]).toEqual({});
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.defaults.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.defaults.shorteners[urlShorteningService]).toEqual({});
        });
    });

    describe('should set url_transforms.shorten & shorteners without touching other items in url_transforms', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'url_transforms': {'foo': 'bar'}});
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.url_transforms.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'url_transforms': {'foo': 'bar'}});
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.current.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.current.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis.share.current.url_transforms.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'url_transforms': {'foo': 'bar'}};
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.defaults.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.defaults.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis.share.defaults.url_transforms.foo).toBe('bar');
        });
    });

    describe('should set url_transforms.shorten & shorteners without touching other items in url_transforms.shorten', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'url_transforms': {'shorten': {'foo': 'bar'}}});
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.url_transforms.shorten.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'url_transforms': {'shorten': {'foo': 'bar'}}});
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.current.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.current.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis.share.current.url_transforms.shorten.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'url_transforms': {'shorten': {'foo': 'bar'}}};
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.defaults.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.defaults.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis.share.defaults.url_transforms.shorten.foo).toBe('bar');
        });
    });

    describe('should set url_transforms.shorten & shorteners without touching other items in shorteners', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'shorteners': {'foo': 'bar'}});
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.shorteners.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'shorteners': {'foo': 'bar'}});
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.current.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.current.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis.share.current.shorteners.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'shorteners': {'foo': 'bar'}};
            $.addthis.urlShortening(urlShorteningService, socialService);
            expect($.addthis.share.defaults.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis.share.defaults.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis.share.defaults.shorteners.foo).toBe('bar');
        });
    });
});