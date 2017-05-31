//var webdriverio = require('webdriverio');

describe('$.addthis().tool', function() {
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

    it('if executed without params should return the AddThis jQuery plugin', function() {
        var addthisPlugin = $().addthis();
        var addthisToolResult = addthisPlugin.tool();
        expect(addthisPlugin).toEqual(addthisToolResult);
    });

    describe('used without a method property', function() {
        it('should return an object with the expected properties', function() {
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

        it('should return an element with the expected structure and attributes', function() {
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

        it('prependTo function should append the new element to the desired location', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = $.addthis().tool(toolConfig1);

            newToolResult.prependTo(parentElement);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
            expect(newTool[0].className).toBe(toolConfig1.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('replaceAll function should append the new element to the desired location', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = $.addthis().tool(toolConfig1);

            expect($('.my-div-where-i-want-addthis-tools').length).toBe(1);
            newToolResult.replaceAll(parentElement);
            expect($('.my-div-where-i-want-addthis-tools').length).toBe(0);
            expect($('.addthis-tool-parent-class').length).toBe(1);

            var newTool = $('.addthis-tool-parent-class .' + toolConfig1.tool);
            expect(newTool[0].className).toBe(toolConfig1.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('insertAfter function should append the new element to the desired location', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = $.addthis().tool(toolConfig1);

            expect(parentElement[0].innerHTML).toBe('');
            newToolResult.insertAfter(parentElement);
            expect($('.my-div-where-i-want-addthis-tools')[0].innerHTML).toBe('');
            expect($('.addthis-tool-parent-class').length).toBe(1);

            var newTool = $('.addthis-tool-parent-class .' + toolConfig1.tool);
            expect(newTool[0].className).toBe(toolConfig1.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('insertBefore function should append the new element to the desired location', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = $.addthis().tool(toolConfig1);

            expect(parentElement[0].innerHTML).toBe('');
            newToolResult.insertBefore(parentElement);
            expect($('.my-div-where-i-want-addthis-tools')[0].innerHTML).toBe('');
            expect($('.addthis-tool-parent-class').length).toBe(1);

            var newTool = $('.addthis-tool-parent-class .' + toolConfig1.tool);
            expect(newTool[0].className).toBe(toolConfig1.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        describe('appendTo function', function() {
            it('should append the new element to the desired location', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);

                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });

            it('shareTitle should change the share title and leave all other attributes in place', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareTitle(toolConfig2.title);
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });

            it('shareTitle should remove the share title attributes when not passed an argument', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareTitle();
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(null);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });

            it('shareTitle passed current value in share title attribute on a tool without a share URL (for the sake of code coverage)', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool({title: toolConfig2.title});
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools div div');
                expect(newTool[0].className).toBe('');
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
                expect(newTool[0].getAttribute('data-url')).toBe(null);
                expect(newTool[0].getAttribute('data-media')).toBe(null);
                expect(newTool[0].getAttribute('data-description')).toBe(null);

                newToolResult.shareTitle(toolConfig1.title);
                var changedTool = $('.my-div-where-i-want-addthis-tools div div');

                expect(changedTool[0].className).toBe('');
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(null);
                expect(changedTool[0].getAttribute('data-media')).toBe(null);
                expect(changedTool[0].getAttribute('data-description')).toBe(null);
            });

            it('shareUrl should change the share URL and leave all other attributes in place', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareUrl(toolConfig2.url);
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });

            it('shareUrl should remove the share URL attributes when not passed an argument', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareUrl();
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(null);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });

            it('shareUrl on a tool without a class (for the sake of code coverage)', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool({url: toolConfig1.url});
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools div div');

                expect(newTool[0].className).toBe('');
                expect(newTool[0].getAttribute('data-title')).toBe(null);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(null);
                expect(newTool[0].getAttribute('data-description')).toBe(null);

                newToolResult.shareUrl(toolConfig2.url);
                var changedTool = $('.my-div-where-i-want-addthis-tools div div');

                expect(changedTool[0].className).toBe('');
                expect(changedTool[0].getAttribute('data-title')).toBe(null);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(null);
                expect(changedTool[0].getAttribute('data-description')).toBe(null);
            });

            it('shareDescription should change the share description and leave all other attributes in place', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareDescription(toolConfig2.description);
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
            });

            it('shareDescription should remove the share description attributes when not passed an argument', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareDescription();
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(null);
            });

            it('shareMedia should change the share media and leave all other attributes in place', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareMedia(toolConfig2.media);
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });

            it('shareMedia should remove the share media attributes when not passed an argument', function() {
                var parentElement = $('.my-div-where-i-want-addthis-tools');
                var newToolResult = $.addthis().tool(toolConfig1);
                newToolResult.appendTo(parentElement);

                var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);
                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(newTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(newTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(newTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
                expect(newTool[0].getAttribute('data-description')).toBe(toolConfig1.description);

                newToolResult.shareMedia();
                var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig1.tool);

                expect(newTool[0].className).toBe(toolConfig1.tool);
                expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
                expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
                expect(changedTool[0].getAttribute('data-media')).toBe(null);
                expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
            });
        });

    });

    describe('used with a method property', function() {
        it('should return object with the expected properties', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var addthisToolElement = parentElement.addthis().tool(toolConfig2);

            expect(typeof addthisToolElement).toBe('object');
            expect(typeof addthisToolElement[0]).toBe('object');
            expect(typeof addthisToolElement.shareUrl).toBe('function');
            expect(typeof addthisToolElement.shareTitle).toBe('function');
            expect(typeof addthisToolElement.shareDescription).toBe('function');
            expect(typeof addthisToolElement.shareMedia).toBe('function');
        });

        it('should add element', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');

            expect(parentElement.length).toBe(1);
            expect(parentElement[0].className).toBe('my-div-where-i-want-addthis-tools');
            expect(parentElement[0].innerHTML).toBe('');

            parentElement.addthis().tool(toolConfig2);
            expect(parentElement[0].innerHTML).not.toBe('');

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool.length).toBe(1);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('shareTitle should change the share title and leave all other attributes in place', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareTitle(toolConfig1.title);
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig1.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('shareTitle should remove the share title attributes when not passed an argument', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareTitle();
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(null);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('shareTitle passed current value in share title attribute on a tool without a share URL (for the sake of code coverage)', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool({title: toolConfig2.title, method: toolConfig2.method});

            var newTool = $('.my-div-where-i-want-addthis-tools div div');

            expect(newTool[0].className).toBe('');
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(null);
            expect(newTool[0].getAttribute('data-media')).toBe(null);
            expect(newTool[0].getAttribute('data-description')).toBe(null);

            newToolResult.shareTitle(toolConfig2.title);
            var changedTool = $('.my-div-where-i-want-addthis-tools div div');

            expect(changedTool[0].className).toBe('');
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(null);
            expect(changedTool[0].getAttribute('data-media')).toBe(null);
            expect(changedTool[0].getAttribute('data-description')).toBe(null);
        });

        it('shareUrl should change the share URL and leave all other attributes in place', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareUrl(toolConfig1.url);
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('shareUrl should remove the share URL attributes when not passed an argument', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareUrl();
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(null);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('shareUrl on a tool without a class (for the sake of code coverage)', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool({url: toolConfig2.url, method: toolConfig2.method});

            var newTool = $('.my-div-where-i-want-addthis-tools div div');

            expect(newTool[0].className).toBe('');
            expect(newTool[0].getAttribute('data-title')).toBe(null);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(null);
            expect(newTool[0].getAttribute('data-description')).toBe(null);

            newToolResult.shareUrl(toolConfig1.url);
            var changedTool = $('.my-div-where-i-want-addthis-tools div div');

            expect(changedTool[0].className).toBe('');
            expect(changedTool[0].getAttribute('data-title')).toBe(null);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig1.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(null);
            expect(changedTool[0].getAttribute('data-description')).toBe(null);
        });

        it('shareDescription should change the share description and leave all other attributes in place', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareDescription(toolConfig1.description);
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig1.description);
        });

        it('shareDescription should remove the share description attributes when not passed an argument', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareDescription();
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(null);
        });

        it('shareMedia should change the share media and leave all other attributes in place', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareMedia(toolConfig1.media);
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(toolConfig1.media);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
        });

        it('shareMedia should remove the share media attributes when not passed an argument', function() {
            var parentElement = $('.my-div-where-i-want-addthis-tools');
            var newToolResult = parentElement.addthis().tool(toolConfig2);

            var newTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);
            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(newTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(newTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(newTool[0].getAttribute('data-media')).toBe(toolConfig2.media);
            expect(newTool[0].getAttribute('data-description')).toBe(toolConfig2.description);

            newToolResult.shareMedia();
            var changedTool = $('.my-div-where-i-want-addthis-tools .' + toolConfig2.tool);

            expect(newTool[0].className).toBe(toolConfig2.tool);
            expect(changedTool[0].getAttribute('data-title')).toBe(toolConfig2.title);
            expect(changedTool[0].getAttribute('data-url')).toBe(toolConfig2.url);
            expect(changedTool[0].getAttribute('data-media')).toBe(null);
            expect(changedTool[0].getAttribute('data-description')).toBe(toolConfig2.description);
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
