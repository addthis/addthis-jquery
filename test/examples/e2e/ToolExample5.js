describe('ToolExample5', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');
        fixture.load('ToolExample5.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample5.js';

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
                                if (typeof window.switchTitle !== 'undefined') {
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

    it('switchTitle should be a function', function() {
        expect(typeof window.switchTitle).toEqual('function');
    });

    it('should load with initial title attribute in addthis_share', function() {
        var initialTitle = addthis_share.title;
        expect(initialTitle).toEqual(window.initialTitle);
    });

    it('switchUrl should toggle title attribute on desired div', function() {
        var initialTitle = addthis_share.title;
        window.switchTitle();
        var secondTitle = addthis_share.title;
        window.switchTitle();
        var thirdTitle = addthis_share.title;

        expect(initialTitle).not.toEqual(secondTitle);
        expect(secondTitle).not.toEqual(thirdTitle);
        expect(initialTitle).toEqual(thirdTitle);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;

        delete window.toolDivSelector;
        delete window.initialTitle;
        delete window.alternateTitle;
        delete window.addthisToolConfig1;
        delete window.currentToolTitle;
        delete window.tool;
        delete window.switchTitle;
    });
});