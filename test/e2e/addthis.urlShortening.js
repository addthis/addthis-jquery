//var webdriverio = require('webdriverio');

describe('$.addthis.config', function() {
    var $;
    var urlShorteningService = 'bitly';
    var socialService = 'twitter';

    beforeEach(function(done) {
        fixture.setBase('test/fixtures');
        fixture.load('1no.explicit.configuration.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';

        document.head.appendChild(jqueryScript);
        var jqueryIntervalId = window.setInterval(function() {
            if (typeof window.jQuery !== 'undefined') {
                clearInterval(jqueryIntervalId);
                $ = window.jQuery;
                document.head.appendChild(addthisPluginScript);
                var addthisPluginIntervalId = window.setInterval(function() {
                    if (typeof $.addthis !== 'undefined') {
                        clearInterval(addthisPluginIntervalId);
                        done();
                    }
                }, 50);
            }
        }, 50);
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

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;
    });
});
