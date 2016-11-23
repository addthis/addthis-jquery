//var webdriverio = require('webdriverio');

describe('with no explicit configuration', function() {
    beforeEach(function(){
        fixture.setBase('test/fixtures');
        fixture.load('1no.explicit.configuration.html');
    });

    it('addthis_plugin_info should have the expected format & values', function() {
        expect(typeof window.addthis_plugin_info).toBe('object');
        expect(window.addthis_plugin_info.info_status).toBe('enabled');
        expect(window.addthis_plugin_info.cms_name).toBe('jQuery');
        expect(window.addthis_plugin_info.plugin_name).toBe('jquery-angular');
        expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
        expect(typeof window.addthis_plugin_info.cms_version).toBe('string');
        expect(typeof window.addthis_plugin_info.plugin_version).toBe('string');
    });

    afterEach(function() {
        fixture.cleanup();
    });
});
