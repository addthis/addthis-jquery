//var webdriverio = require('webdriverio');

describe('empty window.addthis_share and empty window.addthis_config', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('test/fixtures');
        fixture.load('1no.explicit.configuration.html');

        window.addthis_share = {};
        window.addthis_config = {};

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

    it('addthis_share should be an empty object', function() {
        expect(window.addthis_share).toEqual({});
    });

    it('addthis_config should be an empty object', function() {
        expect(window.addthis_config).toEqual({});
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
