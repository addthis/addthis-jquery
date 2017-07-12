describe('ToolExample4', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');
        fixture.load('ToolExample4.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample4.js';

        document.head.appendChild(jqueryScript);

        var jqueryIntervalId = window.setInterval(function() {
            if (typeof window.jQuery !== 'undefined') {
                clearInterval(jqueryIntervalId);
                $ = window.jQuery;
                document.head.appendChild(addthisPluginScript);
                var addthisPluginIntervalId = window.setInterval(function() {
                    if (typeof $.addthis !== 'undefined') {
                        clearInterval(addthisPluginIntervalId);
                        $(document).ready(function() {
                            document.body.appendChild(toolExampleJs);
                            var toolExampleIntervalId = window.setInterval(function() {
                                if (typeof window.switchGlobalUrl !== 'undefined') {
                                    clearInterval(toolExampleIntervalId);
                                    done();
                                }
                            });
                        }, 50);
                    }
                }, 50);
            }
        }, 50);
    });

    it('switchGlobalUrl should be a function', function() {
        expect(typeof window.switchGlobalUrl).toEqual('function');
    });

    it('should load with initial url attribute in addthis_share', function() {
        var initialUrl = addthis_share.url;
        expect(initialUrl).toEqual(window.initialUrl);
    });

    it('clicking the button should toggle url attribute on desired div', function() {
        var button = document.getElementById('changeUrl');
        var initialUrl = addthis_share.url;
        button.click();
        var secondUrl = addthis_share.url;
        button.click();
        var thirdUrl = addthis_share.url;

        expect(initialUrl).not.toEqual(secondUrl);
        expect(secondUrl).not.toEqual(thirdUrl);
        expect(initialUrl).toEqual(thirdUrl);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;

        delete window.toolDivSelector;
        delete window.initialUrl;
        delete window.alternateUrl;
        delete window.addthisToolConfig1;
        delete window.currentToolUrl;
        delete window.tool;
        delete window.switchGlobalUrl;
    });
});