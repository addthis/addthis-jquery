
'use strict';

describe('$.addthis().urlShortening', function() {
    var urlShorteningService = 'bitly';
    var socialService = 'twitter';

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
        expect($.addthis().urlShortening).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().urlShortening();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis().layers_refresh', function() {
        var addthisPlugin = $.addthis();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();
        addthisPlugin.urlShortening(urlShorteningService, socialService);
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);
    });

    describe('should configure url shortening for passed params', function() {
        it('in window.addthis_share', function() {
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
        });

        it('in $.addthis().current.share', function() {
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().current.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().current.share.shorteners[urlShorteningService]).toEqual({});
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().defaults.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().defaults.share.shorteners[urlShorteningService]).toEqual({});
        });
    });

    describe('should set url_transforms.shorten & shorteners without touching other items in url_transforms', function() {
        it('in window.addthis_share', function() {
            $.addthis().share({'url_transforms': {'foo': 'bar'}});
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.url_transforms.foo).toBe('bar');
        });

        it('in $.addthis().current.share', function() {
            $.addthis().share({'url_transforms': {'foo': 'bar'}});
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().current.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().current.share.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis().current.share.url_transforms.foo).toBe('bar');
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().defaults.share = {'url_transforms': {'foo': 'bar'}};
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().defaults.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().defaults.share.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis().defaults.share.url_transforms.foo).toBe('bar');
        });
    });

    describe('should set url_transforms.shorten & shorteners without touching other items in url_transforms.shorten', function() {
        it('in window.addthis_share', function() {
            $.addthis().share({'url_transforms': {'shorten': {'foo': 'bar'}}});
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.url_transforms.shorten.foo).toBe('bar');
        });

        it('in $.addthis().current.share', function() {
            $.addthis().share({'url_transforms': {'shorten': {'foo': 'bar'}}});
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().current.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().current.share.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis().current.share.url_transforms.shorten.foo).toBe('bar');
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().defaults.share = {'url_transforms': {'shorten': {'foo': 'bar'}}};
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().defaults.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().defaults.share.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis().defaults.share.url_transforms.shorten.foo).toBe('bar');
        });
    });

    describe('should set url_transforms.shorten & shorteners without touching other items in shorteners', function() {
        it('in window.addthis_share', function() {
            $.addthis().share({'shorteners': {'foo': 'bar'}});
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.shorteners.foo).toBe('bar');
        });

        it('in $.addthis().current.share', function() {
            $.addthis().share({'shorteners': {'foo': 'bar'}});
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().current.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().current.share.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis().current.share.shorteners.foo).toBe('bar');
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().defaults.share = {'shorteners': {'foo': 'bar'}};
            $.addthis().urlShortening(urlShorteningService, socialService);
            expect($.addthis().defaults.share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect($.addthis().defaults.share.shorteners[urlShorteningService]).toEqual({});
            expect($.addthis().defaults.share.shorteners.foo).toBe('bar');
        });
    });
});