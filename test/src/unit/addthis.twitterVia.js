
'use strict';

describe('$.addthis().twitterVia', function() {
    var twitterHandle = 'addthis';

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
        expect($.addthis().twitterVia).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().twitterVia();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis().layers_refresh', function() {
        var addthisPlugin = $.addthis();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();
        addthisPlugin.twitterVia(twitterHandle);
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);
    });

    describe('if passed a string, should set the passthrough.twitter.via property', function() {
        it('in window.addthis_share', function() {
            $.addthis().twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('in $.addthis().current.share', function() {
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().current.share.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().defaults.share.passthrough.twitter.via).toBe(twitterHandle);
        });
    });

    describe('if passed false, should delete the passthrough.twitter.via property', function() {
        it('in window.addthis_share', function() {
            $.addthis().twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBeDefined();
            $.addthis().twitterVia(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
        });

        it('in $.addthis().current.share', function() {
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().current.share.passthrough.twitter.via).toBeDefined();
            $.addthis().twitterVia(false);
            expect($.addthis().current.share.passthrough.twitter.via).toBeUndefined();
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().defaults.share.passthrough.twitter.via).toBeDefined();
            $.addthis().twitterVia(false);
            expect($.addthis().defaults.share.passthrough.twitter.via).toBeUndefined();
        });
    });

    describe('if passed false, should do nothing to passthrough.twitter if passthrough.twitter.via is not defined', function() {
        it('in window.addthis_share', function() {
            $.addthis().share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
            $.addthis().twitterVia(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis().current.share', function() {
            $.addthis().share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect($.addthis().current.share.passthrough.twitter.via).toBeUndefined();
            expect($.addthis().current.share.passthrough.twitter.foo).toBe('bar');
            $.addthis().twitterVia(false);
            expect($.addthis().current.share.passthrough.twitter.via).toBeUndefined();
            expect($.addthis().current.share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis().defaults.share', function() {
            var testConfigs2 = $.addthis().defaults.share = {'passthrough': {'twitter': {'foo': 'bar'}}};
            expect($.addthis().defaults.share).toBe(testConfigs2);
            $.addthis().twitterVia(false);
            expect($.addthis().defaults.share).toBe(testConfigs2);
        });
    });

    describe('if passed a string, should set passthrough.twitter.via without touching other items in passthrough', function() {
        it('in window.addthis_share', function() {
            $.addthis().share({'passthrough': {'foo': 'bar'}});
            $.addthis().twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.foo).toBe('bar');
        });

        it('in $.addthis().current.share', function() {
            $.addthis().share({'passthrough': {'foo': 'bar'}});
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().current.share.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis().current.share.passthrough.foo).toBe('bar');
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().defaults.share = {'passthrough': {'foo': 'bar'}};
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().defaults.share.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis().defaults.share.passthrough.foo).toBe('bar');
        });
    });

    describe('if passed a string, should set passthrough.twitter.via without touching other items in passthrough.twitter', function() {
        it('in window.addthis_share', function() {
            $.addthis().share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $.addthis().twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis().current.share', function() {
            $.addthis().share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().current.share.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis().current.share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis().defaults.share', function() {
            $.addthis().defaults.share = {'passthrough': {'twitter': {'foo': 'bar'}}};
            $.addthis().twitterVia(twitterHandle);
            expect($.addthis().defaults.share.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis().defaults.share.passthrough.twitter.foo).toBe('bar');
        });
    });
});