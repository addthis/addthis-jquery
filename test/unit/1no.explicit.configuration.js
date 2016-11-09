/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('with no explicit configuration', function() {
    it('should define addthis_plugin_info', function() {
        expect(window.addthis_plugin_info).toBeDefined();
    });

    it('should define addthis_plugin_info.info_status as enabled', function() {
        expect(window.addthis_plugin_info.info_status).toBe('enabled');
    });

    it('should define addthis_plugin_info.cms_name as jQuery', function() {
        expect(window.addthis_plugin_info.cms_name).toBe('jQuery');
    });

    it('should define addthis_plugin_info.cms_version', function() {
        expect(window.addthis_plugin_info.cms_version).toBeDefined();
    });

    it('should define addthis_plugin_info.plugin_name as jquery-angular', function() {
        expect(window.addthis_plugin_info.plugin_name).toBe('jquery-angular');
    });

    it('should define addthis_plugin_info.plugin_version', function() {
        expect(window.addthis_plugin_info.plugin_version).toBeDefined();
    });

    it('should define addthis_plugin_info.plugin_mode as AddThis', function() {
        expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
    });
});