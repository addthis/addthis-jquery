
'use strict';

describe('$.addthis.share', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };
    var title = 'hello world';
    var url = 'https://www.addthis.com';
    var description = 'this is a description';
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
        expect($.addthis.share).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis.share();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis.layers_refresh', function() {
        spyOn($.addthis, 'layers_refresh').and.callThrough();
        $.addthis.share({});
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_share to a copy of what we passed', function() {
        $.addthis.share(testConfigs1);
        expect(window.addthis_share).not.toBe(testConfigs1);
        expect(window.addthis_share).toEqual(testConfigs1);
        expect($.addthis.share.current).toEqual(testConfigs1);
    });

    it('called with the url property should set $.addthis.share.defaults.url', function() {
        var testConfigs2 = {url: url};
        $.addthis.share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis.share.current).toEqual(testConfigs2);
        expect($.addthis.share.defaults.url).toEqual(url);
    });

    it('called with the title property should set $.addthis.share.defaults.title', function() {
        var testConfigs2 = {title: title};
        $.addthis.share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis.share.current).toEqual(testConfigs2);
        expect($.addthis.share.defaults.title).toEqual(title);
    });

    it('called with the description property should set $.addthis.share.defaults.description', function() {
        var testConfigs2 = {description: description};
        $.addthis.share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis.share.current).toEqual(testConfigs2);
        expect($.addthis.share.defaults.description).toEqual(description);
    });

    it('called with the media property should set $.addthis.share.defaults.media', function() {
        var testConfigs2 = {media: media};
        $.addthis.share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis.share.current).toEqual(testConfigs2);
        expect($.addthis.share.defaults.media).toEqual(media);
    });

    it('called with the url, title, description and media properties should set all the same properties in $.addthis.share.defaults', function() {
        var testConfigs2 = {
            url: url,
            title: title,
            description: description,
            media: media
        };
        $.addthis.share(testConfigs2);
        expect(window.addthis_share).toEqual(testConfigs2);
        expect($.addthis.share.current).toEqual(testConfigs2);
        expect($.addthis.share.defaults.url).toEqual(url);
        expect($.addthis.share.defaults.title).toEqual(title);
        expect($.addthis.share.defaults.description).toEqual(description);
        expect($.addthis.share.defaults.media).toEqual(media);
    });

    it('should use defaults in $.addthis.share.defaults', function() {
        $.addthis.share.defaults = { url: url };
        expect($.addthis.share.defaults.url).toEqual(url);

        $.addthis.share(testConfigs1);
        expect(window.addthis_share).not.toEqual(testConfigs1);
        expect($.addthis.share.current).not.toEqual(testConfigs1);

        expect($.addthis.share.current.foo).toEqual('bar');
        expect($.addthis.share.current.url).toEqual(url);
        expect(window.addthis_share.foo).toEqual('bar');
        expect(window.addthis_share.url).toEqual(url);
    });

});

