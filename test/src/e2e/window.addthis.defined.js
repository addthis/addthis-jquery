//var webdriverio = require('webdriverio');

describe('if window.addthis is defined when the jQuery plugin loads', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('test/fixtures');
        fixture.load('1no.explicit.configuration.html');

        window.addthis = {};

        window.addthis_share = {
            bar: 'baz',
            title: 'hello world',
            url: 'https://www.addthis.com',
            description: 'this is a description',
            media: 'https://www.addthis.com/img/png'
        };

        window.addthis_config = {
            addthis: 'rocks'
        };

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

    it('even though window.addthis_share is defined, it\'s value is not added to the defaults', function() {
        var addthisPlugin = $().addthis();
        expect(addthisPlugin.defaults.share).toEqual({});
    });

    it('even though window.addthis_config is defined, it\'s value is not added to the defaults', function() {
        var addthisPlugin = $().addthis();
        expect(addthisPlugin.defaults.config).toEqual({});
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
