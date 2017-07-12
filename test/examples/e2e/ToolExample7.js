describe('ToolExample7', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');
        fixture.load('ToolExample7.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample7.js';

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
                                if (typeof window.addthisToolConfig1 !== 'undefined') {
                                    clearInterval(toolExampleIntervalId);
                                    $(document).ready(done);
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

    it('tool should load with initial class name', function() {
        var initialClass = $(toolDivSelector + ' div div').attr('class');
        expect(initialClass).toEqual(window.addthisToolConfig1.tool);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;

        delete window.toolDivSelector;
        delete window.addthisToolConfig1;
    });
});