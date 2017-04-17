//var webdriverio = require('webdriverio');

describe('$.addthis().shareDescription', function() {
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

    var description1 = 'this is a description3';
    var description2 = 'this is a description4';

    it('should set window.addthis_share.description to what we passed', function() {
        expect(window.addthis_share.description).toBeUndefined();
        $.addthis().shareDescription(description1);
        expect(window.addthis_share.description).toBe(description1);
        expect($.addthis().defaults.share.description).toBe(description1);
        expect($.addthis().current.share.description).toBe(description1);
        $.addthis().shareDescription(description2);
        expect(window.addthis_share.description).toBe(description2);
        expect($.addthis().defaults.share.description).toBe(description2);
        expect($.addthis().current.share.description).toBe(description2);
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
