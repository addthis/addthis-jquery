describe('ToolExample1', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');
        fixture.load('ToolExample1.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample1.js';

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
                                if (typeof window.changeToolAction !== 'undefined') {
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

    it('changeToolAction should be a function', function() {
        expect(typeof window.changeToolAction).toEqual('function');
    });

    it('tool should load with initial class name', function() {
        var initialClass = $(toolDivSelector + ' div div').attr('class');
        expect(initialClass).toEqual(window.addthisToolConfig1.tool);
    });

    it('clicking the button should toggle class on desired div', function() {
        var button = document.getElementById('changeTool');
        var initialClass = $(toolDivSelector + ' div div').attr('class');
        button.click();
        var secondClass = $(toolDivSelector + ' div div').attr('class');
        button.click();
        var thirdClass = $(toolDivSelector + ' div div').attr('class');

        expect(initialClass).not.toEqual(secondClass);
        expect(secondClass).not.toEqual(thirdClass);
        expect(initialClass).toEqual(thirdClass);
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
        delete window.addthisToolConfig2;
        delete window.currentToolClass;
        delete window.changeToolAction;
    });
});