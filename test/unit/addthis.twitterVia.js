
'use strict';

describe('$.addthis.twitterVia', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var twitterHandle = 'addthis';

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
        expect($.addthis.twitterVia).toBeDefined();
    });

//    it('should return a jQuery object', function() {});

    it('should call $.addthis.layers_refresh', function() {
        spyOn($.addthis, 'layers_refresh').and.callThrough();
        $.addthis.twitterVia(twitterHandle);
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);
    });

    describe('if passed a string, should set the passthrough.twitter.via property', function() {
        it('in window.addthis_share', function() {
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('in $.addthis.share.current', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBe(twitterHandle);
        });
    });

    describe('if passed false, should delete the passthrough.twitter.via property', function() {
        it('in window.addthis_share', function() {
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBeDefined();
            $.addthis.twitterVia(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
        });

        it('in $.addthis.share.current', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBeDefined();
            $.addthis.twitterVia(false);
            expect($.addthis.share.current.passthrough.twitter.via).toBeUndefined();
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBeDefined();
            $.addthis.twitterVia(false);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBeUndefined();
        });
    });

    describe('if passed false, should do nothing to passthrough.twitter if passthrough.twitter.via is not defined', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
            $.addthis.twitterVia(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect($.addthis.share.current.passthrough.twitter.via).toBeUndefined();
            expect($.addthis.share.current.passthrough.twitter.foo).toBe('bar');
            $.addthis.twitterVia(false);
            expect($.addthis.share.current.passthrough.twitter.via).toBeUndefined();
            expect($.addthis.share.current.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            var testConfigs2 = $.addthis.share.defaults = {'passthrough': {'twitter': {'foo': 'bar'}}};
            expect($.addthis.share.defaults).toBe(testConfigs2);
            $.addthis.twitterVia(false);
            expect($.addthis.share.defaults).toBe(testConfigs2);
        });
    });

    describe('if passed a string, should set passthrough.twitter.via without touching other items in passthrough', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'passthrough': {'foo': 'bar'}});
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'passthrough': {'foo': 'bar'}});
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.current.passthrough.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'passthrough': {'foo': 'bar'}};
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.defaults.passthrough.foo).toBe('bar');
        });
    });

    describe('if passed a string, should set passthrough.twitter.via without touching other items in passthrough.twitter', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'passthrough': {'twitter': {'foo': 'bar'}}};
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.foo).toBe('bar');
        });
    });
});