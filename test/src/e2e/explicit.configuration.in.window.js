//var webdriverio = require('webdriverio');

describe('with explicit configuration', function() {
    var $;
    var loadScripts = function(done) {
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
    };

    var title = 'hello world';
    var url = 'https://www.addthis.com';
    var description = 'this is a description';
    var media = 'https://www.addthis.com/img/png';

    beforeEach(function(){
        fixture.setBase('test/src/fixtures');

        fixture.load('1no.explicit.configuration.html');

            window.addthis_plugin_info = 'foo';

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

    });

    describe('before more javascript loads', function() {
        it('window.addthis_plugin_info should be foo', function() {
            expect(window.addthis_plugin_info).toBe('foo');
        });

        it('window.addthis_share is setup as expected', function() {
            expect(typeof window.addthis_share).toBe('object');
            expect(window.addthis_share.bar).toBe('baz');
            expect(window.addthis_share.title).toBe(title);
            expect(window.addthis_share.url).toBe(url);
            expect(window.addthis_share.description).toBe(description);
            expect(window.addthis_share.media).toBe(media);
        });

        it('window.addthis_config is setup as expected', function() {
            expect(window.addthis_config.addthis).toBe('rocks');
        });
    });

    describe('after more javascript loads', function() {
        beforeEach(function(done) {
            loadScripts(done);
        });

        describe('on page version of window.addthis_plugin_info will be overridden', function() {
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

        describe('on page version of window.addthis_share', function() {
            it('should have the expected proprities & values', function() {
                expect(typeof window.addthis_share).toBe('object');
                expect(window.addthis_share.bar).toEqual('baz');
                expect(window.addthis_share.title).toBe(title);
                expect(window.addthis_share.url).toBe(url);
                expect(window.addthis_share.description).toBe(description);
                expect(window.addthis_share.media).toBe(media);
            });

            it('should have populated share title value into $.addthis().defaults.share.title', function() {
                expect($.addthis().defaults.share.title).toBe(title);
            });

            it('should have populated share title value into $.addthis().defaults.share.url', function() {
                expect($.addthis().defaults.share.url).toBe(url);
            });

            it('should have populated share title value into $.addthis().defaults.share.description', function() {
                expect($.addthis().defaults.share.description).toBe(description);
            });

            it('should have populated share title value into $.addthis().defaults.share.media', function() {
                expect($.addthis().defaults.share.media).toBe(media);
            });
        });

        it('addthis_config should include onpage proprities', function() {
            expect(typeof window.addthis_config).toBe('object');
            expect(window.addthis_config.addthis).toEqual('rocks');
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
