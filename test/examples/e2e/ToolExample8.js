describe('ToolExample8', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('examples');
        fixture.load('ToolExample8.html');

        var jqueryScript = document.createElement('script');
        jqueryScript.type = 'text/javascript';
        jqueryScript.src = '/base/node_modules/jquery/dist/jquery.js';
        var addthisPluginScript = document.createElement('script');
        addthisPluginScript.type = 'text/javascript';
        addthisPluginScript.src = '/base/src/jquery-addthis.js';
        var toolExampleJs = document.createElement('script');
        toolExampleJs.type = 'text/javascript';
        toolExampleJs.src = '/base/examples/ToolExample8.js';

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
                                if (typeof window.addAnotherIpsum !== 'undefined') {
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

    it('addAnotherIpsum should be a function', function() {
        expect(typeof window.addAnotherIpsum).toEqual('function');
    });

    it('queuedIpsums should be an array', function() {
        expect(Array.isArray(window.queuedIpsums)).toEqual(true);
    });

    it('one ipsum should load automatically', function() {
        var impsumsOnPage = $('#ipsumContainer').children('div').length;
        expect(impsumsOnPage).toEqual(1);
    });

    it('clicking the button should add another ipsum to the page', function() {
        var button = document.getElementById('addIpsum');

        button.click();
        var impsumsOnPage = $('#ipsumContainer').children('div').length;
        expect(impsumsOnPage).toEqual(2);
    });

    it('clicking the button more times than there are ipsums should not add more ipsums', function() {
        var button = document.getElementById('addIpsum');
        while (window.queuedIpsums.length > 0) {
            button.click();
        }

        var maxIpsums = $('#ipsumContainer').children('div').length;
        button.click();
        var impsumsOnPage = $('#ipsumContainer').children('div').length;

        expect(impsumsOnPage).toEqual(maxIpsums);
    });

    afterEach(function() {
        fixture.cleanup();
        delete window.jQuery;
        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
        delete window.addthis_plugin_info;

        delete window.queuedIpsums;
        delete window.addAnotherIpsum;
    });
});