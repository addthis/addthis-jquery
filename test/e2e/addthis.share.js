//var webdriverio = require('webdriverio');

describe('$.addthis.share', function() {
    var $;

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

    var newShareConfig1 = {
        title: 'hello world1',
        url: 'https://www.addthis.com1',
        description: 'this is a description1',
        media: 'https://www.addthis.com/img/png1',
        foo: 'bar'
    };

    var newShareConfig2 = {
        title: 'hello world2',
        url: 'https://www.addthis.com2',
        description: 'this is a description2',
        media: 'https://www.addthis.com/img/png2'
    };

    it('addthis_share should be an empty object', function() {
        expect(window.addthis_share).toEqual({});
    });

    it('function should not set window.addthis_share to be the the same object as the input', function() {
        $.addthis.share(newShareConfig1);
        expect(newShareConfig1).not.toBe(window.addthis_share);
    });

    it('function should set window.addthis_share values', function() {
        $.addthis.share({foo: 'bar'});
        expect(window.addthis_share.foo).toBe('bar');
        $.addthis.share(newShareConfig1);
        expect(window.addthis_share.foo).toBe('bar');
        expect(window.addthis_share.title).toBe(newShareConfig1.title);
        expect(window.addthis_share.url).toBe(newShareConfig1.url);
        expect(window.addthis_share.description).toBe(newShareConfig1.description);
        expect(window.addthis_share.media).toBe(newShareConfig1.media);
    });

    it('function should set $.addthis.share.default.title to equal inputs title', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.title).toBe(newShareConfig1.title);
    });

    it('function should set $.addthis.share.default.url to equal inputs url', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.url).toBe(newShareConfig1.url);
    });

    it('function should set $.addthis.share.default.description to equal inputs description', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.description).toBe(newShareConfig1.description);
    });

    it('function should set $.addthis.share.default.media to equal inputs media', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.media).toBe(newShareConfig1.media);
    });

    it('function should reuse previous title, url, description and media in window.addthis_share when not provided', function() {
        $.addthis.share(newShareConfig1);
        expect(window.addthis_share.foo).toBe('bar');
        expect(window.addthis_share.title).toBe(newShareConfig1.title);
        expect(window.addthis_share.url).toBe(newShareConfig1.url);
        expect(window.addthis_share.description).toBe(newShareConfig1.description);
        expect(window.addthis_share.media).toBe(newShareConfig1.media);
        $.addthis.share({foo: 'baz'});
        expect(window.addthis_share.foo).toBe('baz');
        expect(window.addthis_share.title).toBe(newShareConfig1.title);
        expect(window.addthis_share.url).toBe(newShareConfig1.url);
        expect(window.addthis_share.description).toBe(newShareConfig1.description);
        expect(window.addthis_share.media).toBe(newShareConfig1.media);
    });

    it('function should change title, url, description and media in window.addthis_share when provided', function() {
        $.addthis.share(newShareConfig1);
        expect(window.addthis_share.foo).toBe('bar');
        expect(window.addthis_share.title).toBe(newShareConfig1.title);
        expect(window.addthis_share.url).toBe(newShareConfig1.url);
        expect(window.addthis_share.description).toBe(newShareConfig1.description);
        expect(window.addthis_share.media).toBe(newShareConfig1.media);
        $.addthis.share(newShareConfig2);
        expect(window.addthis_share.foo).toBeUndefined();
        expect(window.addthis_share.title).toBe(newShareConfig2.title);
        expect(window.addthis_share.url).toBe(newShareConfig2.url);
        expect(window.addthis_share.description).toBe(newShareConfig2.description);
        expect(window.addthis_share.media).toBe(newShareConfig2.media);
    });

    it('function should change existing $.addthis.share.default.title to equal inputs title', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.title).toBe(newShareConfig1.title);
        $.addthis.share(newShareConfig2);
        expect($.addthis.share.defaults.title).toBe(newShareConfig2.title);
    });

    it('function should change existing $.addthis.share.default.url to equal inputs url', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.url).toBe(newShareConfig1.url);
        $.addthis.share(newShareConfig2);
        expect($.addthis.share.defaults.url).toBe(newShareConfig2.url);
    });

    it('function should change existing $.addthis.share.default.description to equal inputs description', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.description).toBe(newShareConfig1.description);
        $.addthis.share(newShareConfig2);
        expect($.addthis.share.defaults.description).toBe(newShareConfig2.description);
    });

    it('function should change existing $.addthis.share.default.media to equal inputs media', function() {
        $.addthis.share(newShareConfig1);
        expect($.addthis.share.defaults.media).toBe(newShareConfig1.media);
        $.addthis.share(newShareConfig2);
        expect($.addthis.share.defaults.media).toBe(newShareConfig2.media);
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
