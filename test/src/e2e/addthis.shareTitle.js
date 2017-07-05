//var webdriverio = require('webdriverio');

describe('$.addthis().shareTitle', function() {
    var $;

    beforeEach(function(done) {
        fixture.setBase('test/src/fixtures');
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

    var title1 = 'hello world3';
    var title2 = 'hello world4';

    it('should set window.addthis_share.title to what we passed', function() {
        expect(window.addthis_share.title).toBeUndefined();
        $.addthis().shareTitle(title1);
        expect(window.addthis_share.title).toBe(title1);
        expect($.addthis().defaults.share.title).toBe(title1);
        expect($.addthis().current.share.title).toBe(title1);
        $.addthis().shareTitle(title2);
        expect(window.addthis_share.title).toBe(title2);
        expect($.addthis().defaults.share.title).toBe(title2);
        expect($.addthis().current.share.title).toBe(title2);
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
