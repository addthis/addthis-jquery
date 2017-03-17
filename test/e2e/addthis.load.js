//var webdriverio = require('webdriverio');

describe('$.addthis.config', function() {
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

    it('does not immidiately call callback if window.addthis is not set', function() {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        $.addthis.load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(0);
    });

    it('sets up interval if window.addthis is not set', function() {
        expect($.addthis.load._intervalId).toBe(false);
        $.addthis.load(function() {});
        expect($.addthis.load._intervalId).not.toBe(false);
    });

    it('immidiately calls callback if window.addthis is set', function() {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        window.addthis = true;
        $.addthis.load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(1);
    });

    it('does not set up a new interval when on is already setup', function() {
        expect($.addthis.load._intervalId).toBe(false);
        $.addthis.load(function() {});
        expect($.addthis.load._intervalId).not.toBe(false);
        var firstIntervalId = $.addthis.load._intervalId;
        $.addthis.load(function() {});
        expect($.addthis.load._intervalId).toBe(firstIntervalId);
    });

    it('calls callback after window.addthis is set up later', function(done) {
        var myCallbacksObject = { callback: function() {} };
        spyOn(myCallbacksObject, 'callback').and.callThrough();
        $.addthis.load(myCallbacksObject.callback);
        expect(myCallbacksObject.callback.calls.count()).toEqual(0);
        window.setTimeout(function() {
            expect(myCallbacksObject.callback.calls.count()).toEqual(0);
            window.addthis = true;
            window.setTimeout(function() {
                expect(myCallbacksObject.callback.calls.count()).toEqual(1);
                done();
            }, 201);
        }, 201);
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
