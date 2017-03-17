//var webdriverio = require('webdriverio');

describe('$.addthis.twitterVia', function() {
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

    var twitterHandle = 'addthis';

    describe('if passed a string, should set the passthrough.twitter.via property', function() {
        it('in window.addthis_share', function() {
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('in $.addthis.share.current', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBe(twitterHandle);
        });
    });

    describe('if passed false, should delete the passthrough.twitter.via property', function() {
        it('in window.addthis_share', function() {
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBeDefined();
            $.addthis.twitterVia(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
        });

        it('in $.addthis.share.current', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBeDefined();
            $.addthis.twitterVia(false);
            expect($.addthis.share.current.passthrough.twitter.via).toBeUndefined();
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBeDefined();
            $.addthis.twitterVia(false);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBeUndefined();
        });
    });


    describe('if passed false, should do nothing to passthrough.twitter if passthrough.twitter.via is not defined', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
            $.addthis.twitterVia(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect($.addthis.share.current.passthrough.twitter.via).toBeUndefined();
            expect($.addthis.share.current.passthrough.twitter.foo).toBe('bar');
            $.addthis.twitterVia(false);
            expect($.addthis.share.current.passthrough.twitter.via).toBeUndefined();
            expect($.addthis.share.current.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            var testConfigs2 = $.addthis.share.defaults = {'passthrough': {'twitter': {'foo': 'bar'}}};
            expect($.addthis.share.defaults).toBe(testConfigs2);
            $.addthis.twitterVia(false);
            expect($.addthis.share.defaults).toBe(testConfigs2);
        });
    });

    describe('if passed a string, should set passthrough.twitter.via without touching other items in passthrough', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'passthrough': {'foo': 'bar'}});
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'passthrough': {'foo': 'bar'}});
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.current.passthrough.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'passthrough': {'foo': 'bar'}};
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.defaults.passthrough.foo).toBe('bar');
        });
    });

    describe('if passed a string, should set passthrough.twitter.via without touching other items in passthrough.twitter', function() {
        it('in window.addthis_share', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $.addthis.twitterVia(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.current', function() {
            $.addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.current.passthrough.twitter.foo).toBe('bar');
        });

        it('in $.addthis.share.defaults', function() {
            $.addthis.share.defaults = {'passthrough': {'twitter': {'foo': 'bar'}}};
            $.addthis.twitterVia(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.via).toBe(twitterHandle);
            expect($.addthis.share.defaults.passthrough.twitter.foo).toBe('bar');
        });
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
