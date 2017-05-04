
'use strict';

describe('$.addthis().tool', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };

    var toolConfig1 = {
        tool: 'a',
        // share attributes, if they want to override those for the page
        title: 'My awesome page',
        url: 'http://addthis.com',
        media: 'http://addthis.com/img.png',
        description: 'A description of my awesome page'
    };

    var toolConfig2 = {
        tool: 'b',
        // share attributes, if they want to override those for the page
        title: 'Another awesome page',
        url: 'http://example.com',
        media: 'http://example.com/img.png',
        description: 'Another description of another example',
        method: 'append' // or ...
    };

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
        expect($.addthis().tool).toBeDefined();
    });

    it('if executed without params should return the AddThis jQuery plugin', function() {
        var addthisPlugin = $.addthis();
        var addthisToolResult = addthisPlugin.tool();
        expect(addthisPlugin).toEqual(addthisToolResult);
    });

    describe('if executed with params should return an object', function() {
        it('with the expected properties', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig1);
            expect(typeof addthisToolElement).toBe('object');
            expect(typeof addthisToolElement[0]).toBe('object');
            expect(typeof addthisToolElement.appendTo).toBe('function');
            expect(typeof addthisToolElement.insertAfter).toBe('function');
            expect(typeof addthisToolElement.insertBefore).toBe('function');
            expect(typeof addthisToolElement.prependTo).toBe('function');
            expect(typeof addthisToolElement.replaceAll).toBe('function');
            expect(typeof addthisToolElement.shareUrl).toBe('function');
            expect(typeof addthisToolElement.shareTitle).toBe('function');
            expect(typeof addthisToolElement.shareDescription).toBe('function');
            expect(typeof addthisToolElement.shareMedia).toBe('function');
        });

        it('with a DOM element with the expected structure and attributes', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig1);
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('with a shareUrl function that changes the data-url attribute', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, url: toolConfig1.url});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            addthisToolElement.shareUrl(toolConfig2.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig2.url);
        });

        it('with a shareUrl function that act the same even if the share url has not changed', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, url: toolConfig1.url});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            addthisToolElement.shareUrl(toolConfig1.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
        });

        it('with a shareUrl function that does not change any other attribute', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig1);
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
            addthisToolElement.shareUrl(toolConfig2.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig2.url);
        });

        it('with a shareUrl function that deletes the data-url attribute if passed undefined', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, url: toolConfig1.url});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            addthisToolElement.shareUrl();
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(null);
        });

        it('with a shareUrl function on a tool without a class (for the sake of code coverage)', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({url: toolConfig1.url});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe('');
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            addthisToolElement.shareUrl(toolConfig2.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig2.url);
        });

        it('with a shareTitle function that changes the data-title attribute', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, title: toolConfig1.title});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            addthisToolElement.shareTitle(toolConfig2.title);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig2.title);
        });

        it('with a shareTitle function that changes the data-title attribute if passed undefined', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, title: toolConfig1.title});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            addthisToolElement.shareTitle();
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(null);
        });

        it('with a shareDescription function that changes the data-description attribute', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, description: toolConfig1.description});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
            addthisToolElement.shareDescription(toolConfig2.description);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('with a shareDescription function that deletes the data-description attribute if passed undefined', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, description: toolConfig1.description});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
            addthisToolElement.shareDescription();
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(null);
        });

        it('with a shareMedia function that changes the data-media attribute', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, media: toolConfig1.media});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            addthisToolElement.shareMedia(toolConfig2.media);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig2.media);
        });

        it('with a shareMedia function that deletes the data-media attribute if passed undefined', function() {
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool({tool: toolConfig1.tool, media: toolConfig1.media});
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            addthisToolElement.shareMedia();
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(null);
        });

        it('with an appendTo function that adds tool onto specified element', function() {
            var parentElement = $('<div id="pick-me1"></div>');
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig1);
            addthisToolElement.appendTo(parentElement);
            expect(parentElement[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].className).toBe('addthis-tool-parent-class');
            expect(parentElement[0].children[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].children[0].className).toBe(toolConfig1.tool);
            expect(parentElement[0].children[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(parentElement[0].children[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(parentElement[0].children[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(parentElement[0].children[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('with an prependTo function that adds tool onto specified element', function() {
            var parentElement = $('<div id="pick-me1"></div>');
            var addthisPlugin = $.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig1);
            addthisToolElement.prependTo(parentElement);
            expect(parentElement[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].className).toBe('addthis-tool-parent-class');
            expect(parentElement[0].children[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].children[0].className).toBe(toolConfig1.tool);
            expect(parentElement[0].children[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(parentElement[0].children[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(parentElement[0].children[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(parentElement[0].children[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });
    });
});


describe('$.fn.addthis().tool', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };

    var toolConfig1 = {
        tool: 'a',
        // share attributes, if they want to override those for the page
        title: 'My awesome page',
        url: 'http://addthis.com',
        media: 'http://addthis.com/img.png',
        description: 'A description of my awesome page'
    };

    var toolConfig2 = {
        tool: 'b',
        // share attributes, if they want to override those for the page
        title: 'My awesome page',
        url: 'http://addthis.com',
        media: 'http://addthis.com/img.png',
        description: 'A description of my awesome page',
        method: 'append' // or ...
    };

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
        expect($('<div></div>').addthis().tool).toBeDefined();
    });

    it('if executed without params should return the AddThis jQuery plugin', function() {
        var addthisPlugin = $('<div id="pick-me1"></div>').addthis();
        var addthisToolResult = addthisPlugin.tool();
        expect(addthisPlugin).toEqual(addthisToolResult);
    });

    describe('if executed with params should return an object', function() {
        it('with the expected properties', function() {
            var addthisPlugin = $('<div id="pick-me1"></div>').addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig2);
            expect(typeof addthisToolElement).toBe('object');
            expect(typeof addthisToolElement[0]).toBe('object');
            expect(typeof addthisToolElement.appendTo).toBe('function');
            expect(typeof addthisToolElement.insertAfter).toBe('function');
            expect(typeof addthisToolElement.insertBefore).toBe('function');
            expect(typeof addthisToolElement.prependTo).toBe('function');
            expect(typeof addthisToolElement.replaceAll).toBe('function');
            expect(typeof addthisToolElement.shareUrl).toBe('function');
            expect(typeof addthisToolElement.shareTitle).toBe('function');
            expect(typeof addthisToolElement.shareDescription).toBe('function');
            expect(typeof addthisToolElement.shareMedia).toBe('function');
        });

        it('with a DOM element with the expected structure and attributes (params specify method)', function() {
            var addthisPlugin = $('<div id="pick-me1"></div>').addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig2);
            expect(addthisToolElement[0].id).toBe('pick-me1');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].children[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].children[0].className).toBe(toolConfig2.tool);
            expect(addthisToolElement[0].children[0].children[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(addthisToolElement[0].children[0].children[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(addthisToolElement[0].children[0].children[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(addthisToolElement[0].children[0].children[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('with a DOM element with the expected structure and attributes (params do not specify method)', function() {
            var addthisPlugin = $('<div id="pick-me1"></div>').addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig1);
            expect(addthisToolElement[0].className).toBe('addthis-tool-parent-class');
            expect(addthisToolElement[0].childElementCount).toBe(1);
            expect(addthisToolElement[0].children[0].className).toBe(toolConfig1.tool);
            expect(addthisToolElement[0].children[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(addthisToolElement[0].children[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(addthisToolElement[0].children[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(addthisToolElement[0].children[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('with an appendTo function that adds tool onto specified element', function() {
            var parentElement = $('<div id="pick-me1"></div>');
            var addthisPlugin = parentElement.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig2);
            addthisToolElement.appendTo(parentElement);
            expect(parentElement[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].className).toBe('addthis-tool-parent-class');
            expect(parentElement[0].children[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].children[0].className).toBe(toolConfig2.tool);
            expect(parentElement[0].children[0].children[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(parentElement[0].children[0].children[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(parentElement[0].children[0].children[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(parentElement[0].children[0].children[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('with an prependTo function that adds tool onto specified element', function() {
            var parentElement = $('<div id="pick-me1"></div>');
            var addthisPlugin = parentElement.addthis();
            var addthisToolElement = addthisPlugin.tool(toolConfig2);
            addthisToolElement.prependTo(parentElement);
            expect(parentElement[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].className).toBe('addthis-tool-parent-class');
            expect(parentElement[0].children[0].childElementCount).toBe(1);
            expect(parentElement[0].children[0].children[0].className).toBe(toolConfig2.tool);
            expect(parentElement[0].children[0].children[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(parentElement[0].children[0].children[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(parentElement[0].children[0].children[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(parentElement[0].children[0].children[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });
    });
});

