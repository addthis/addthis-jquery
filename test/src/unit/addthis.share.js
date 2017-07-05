
'use strict';

describe('$.addthis().share', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var title = 'hello world';
    var url = 'https://www.addthis.com';
    var description = 'this is a description';
    var media = 'https://www.addthis.com/img/png';

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
        expect($.addthis().share).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().share();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis().layers_refresh', function() {
        var addthisPlugin = $.addthis();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();
        addthisPlugin.share({});
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_share to a copy of what we passed', function() {
        $.addthis().share(testConfigs1);
        expect(window.addthis_share).not.toBe(testConfigs1);
        expect(window.addthis_share).toEqual(testConfigs1);
        expect($.addthis().current.share).toEqual(testConfigs1);
    });

    it('called with the url property should set $.addthis().defaults.share.url', function() {
        var testConfigs2 = {url: url};
        $.addthis().share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis().current.share).toEqual(testConfigs2);
        expect($.addthis().defaults.share.url).toEqual(url);
    });

    it('called with the title property should set $.addthis().defaults.share.title', function() {
        var testConfigs2 = {title: title};
        $.addthis().share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis().current.share).toEqual(testConfigs2);
        expect($.addthis().defaults.share.title).toEqual(title);
    });

    it('called with the description property should set $.addthis().defaults.share.description', function() {
        var testConfigs2 = {description: description};
        $.addthis().share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis().current.share).toEqual(testConfigs2);
        expect($.addthis().defaults.share.description).toEqual(description);
    });

    it('called with the media property should set $.addthis().defaults.share.media', function() {
        var testConfigs2 = {media: media};
        $.addthis().share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis().current.share).toEqual(testConfigs2);
        expect($.addthis().defaults.share.media).toEqual(media);
    });

    it('called with the url, title, description and media properties should set all the same properties in $.addthis().defaults.share', function() {
        var testConfigs2 = {
            url: url,
            title: title,
            description: description,
            media: media
        };
        $.addthis().share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis().current.share).toEqual(testConfigs2);
        expect($.addthis().defaults.share.url).toEqual(url);
        expect($.addthis().defaults.share.title).toEqual(title);
        expect($.addthis().defaults.share.description).toEqual(description);
        expect($.addthis().defaults.share.media).toEqual(media);
    });

    it('should use defaults in $.addthis().defaults.share.', function() {
        $.addthis().defaults.share = { url: url };
        expect($.addthis().defaults.share.url).toEqual(url);

        $.addthis().share(testConfigs1);
        expect(window.addthis_share).not.toEqual(testConfigs1);
        expect($.addthis().current.share).not.toEqual(testConfigs1);

        expect($.addthis().current.share.foo).toEqual('bar');
        expect($.addthis().current.share.url).toEqual(url);
        expect(window.addthis_share.foo).toEqual('bar');
        expect(window.addthis_share.url).toEqual(url);
    });

});

