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

    var newConfigs = {foo: 'bar'};

    it('addthis_config should be an empty object', function() {
        expect(window.addthis_config).toEqual({});
    });

    it('function should not set window.addthis_config to be the the same object as the input', function() {
        $.addthis.config(newConfigs);
        expect(newConfigs).not.toBe(window.addthis_config);
    });

    it('function should set window.addthis_share values', function() {
        $.addthis.config(newConfigs);
        expect(window.addthis_config.foo).toBe('bar');
    });

    it('should change addthis_plugin_info.mode from "AddThis" to "Local" if the property ignore_server_config is true', function() {
        expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
        $.addthis.config({ignore_server_config: true});
        expect($.addthis.config.current).toEqual({ignore_server_config: true});
        expect(window.addthis_config).toEqual({ignore_server_config: true});
        expect(window.addthis_plugin_info.plugin_mode).toBe('Local');
    });

    it('should set addthis_plugin_info.mode to "AddThis" if the property ignore_server_config is false', function() {
        $.addthis.config({ignore_server_config: false});
        expect($.addthis.config.current).toEqual({ignore_server_config: false});
        expect(window.addthis_config).toEqual({ignore_server_config: false});
        expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
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
