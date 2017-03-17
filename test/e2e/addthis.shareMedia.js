//var webdriverio = require('webdriverio');

describe('$.addthis.shareMedia', function() {
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

    var media1 = 'https://www.addthis.com/img/png3';
    var media2 = 'https://www.addthis.com/img/png4';

    it('should set window.addthis_share.media to what we passed', function() {
        expect(window.addthis_share.media).toBeUndefined();
        $.addthis.shareMedia(media1);
        expect(window.addthis_share.media).toBe(media1);
        expect($.addthis.share.defaults.media).toBe(media1);
        expect($.addthis.share.current.media).toBe(media1);
        $.addthis.shareMedia(media2);
        expect(window.addthis_share.media).toBe(media2);
        expect($.addthis.share.defaults.media).toBe(media2);
        expect($.addthis.share.current.media).toBe(media2);
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
