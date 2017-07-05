//var webdriverio = require('webdriverio');

describe('$.addthis().shareUrl', function() {
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

    var url1 = 'https://www.addthis.com3';
    var url2 = 'https://www.addthis.com4';

    it('should set window.addthis_share.url to what we passed', function() {
        expect(window.addthis_share.url).toBeUndefined();
        $.addthis().shareUrl(url1);
        expect(window.addthis_share.url).toBe(url1);
        expect($.addthis().defaults.share.url).toBe(url1);
        expect($.addthis().current.share.url).toBe(url1);
        $.addthis().shareUrl(url2);
        expect(window.addthis_share.url).toBe(url2);
        expect($.addthis().defaults.share.url).toBe(url2);
        expect($.addthis().current.share.url).toBe(url2);
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
