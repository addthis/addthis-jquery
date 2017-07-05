//var webdriverio = require('webdriverio');

describe('with no explicit configuration', function() {
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

    describe(' - interface checks - ', function() {
        it('window.jQuery should be defined', function() {
            expect(window.jQuery).toBeDefined();
        });

        it('$.addthis should be an object', function() {
            expect(typeof $.addthis()).toBe('object');
        });

        it('$.addthis().load should be a function', function() {
            expect(typeof $.addthis().load).toBe('function');
        });

        it('$.addthis().layers_refresh should be a function', function() {
            expect(typeof $.addthis().layers_refresh).toBe('function');
        });

        it('$.addthis().current.layers_refresh.pending should be 0', function() {
            expect($.addthis().current.layers_refresh.pending).toBe(0);
        });

        it('$.addthis().config should be a function', function() {
            expect(typeof $.addthis().config).toBe('function');
        });

        it('$.addthis().config.defaults should be an empty object', function() {
            expect($.addthis().defaults.config).toEqual({});
        });

        it('$.addthis().config.current should be an empty object', function() {
            expect($.addthis().current.config).toEqual({});
        });

        it('$.addthis().share should be a function', function() {
            expect(typeof $.addthis().share).toBe('function');
        });

        it('$.addthis().share.defaults should be an empty object', function() {
            expect($.addthis().defaults.share).toEqual({});
        });

        it('$.addthis().share.current should be an empty object', function() {
            expect($.addthis().current.share).toEqual({});
        });

        it('$.addthis().shareUrl should be a function', function() {
            expect(typeof $.addthis().shareUrl).toBe('function');
        });

        it('$.addthis().shareTitle should be a function', function() {
            expect(typeof $.addthis().shareTitle).toBe('function');
        });

        it('$.addthis().shareDescription should be a function', function() {
            expect(typeof $.addthis().shareDescription).toBe('function');
        });

        it('$.addthis().shareMedia should be a function', function() {
            expect(typeof $.addthis().shareMedia).toBe('function');
        });

        it('$.addthis().twitterVia should be a function', function() {
            expect(typeof $.addthis().twitterVia).toBe('function');
        });

        it('$.addthis().urlShortening should be a function', function() {
            expect(typeof $.addthis().urlShortening).toBe('function');
        });
    });

    describe('by default window.addthis_plugin_info', function() {
        it('should be defined as an object', function() {
            expect(window.addthis_plugin_info).toBeDefined();
            expect(typeof window.addthis_plugin_info).toBe('object');
        });

        it('should have property info_status equal "enabled"', function() {
            expect(window.addthis_plugin_info.info_status).toBe('enabled');
        });

        it('should have property cms_name equal "jQuery"', function() {
            expect(window.addthis_plugin_info.cms_name).toBe('jQuery');
        });

        it('should have property cms_version defined and a string', function() {
            expect(window.addthis_plugin_info.cms_version).toBeDefined();
            expect(typeof window.addthis_plugin_info.cms_version).toBe('string');
        });

        it('should have property plugin_name equal "jquery-angular"', function() {
            expect(window.addthis_plugin_info.plugin_name).toBe('jquery-angular');
        });

        it('should have property plugin_version defined and a string', function() {
            expect(window.addthis_plugin_info.plugin_version).toBeDefined();
            expect(typeof window.addthis_plugin_info.plugin_version).toBe('string');
        });

        it('should have property plugin_mode equal "AddThis"', function() {
            expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
        });
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
