'use strict';

describe('by default window.addthis_plugin_info', function() {
    afterEach(function() {
        $.addthis().defaults.config = {};
        $.addthis().current.config = {};

        $.addthis().defaults.share = {};
        $.addthis().current.share = {};

        $.addthis().current.load._callbacks = [];

        $.addthis().current.layers_refresh._lastTs = 0;
        $.addthis().current.layers_refresh.pending = 0;

        if ($.addthis().current.load._intervalId) {
            clearInterval($.addthis().current.load._intervalId);
            $.addthis().current.load._intervalId = false;
        }

        if ($.addthis().current.layers_refresh._intervalId) {
            clearInterval($.addthis().current.layers_refresh._intervalId);
            $.addthis().current.layers_refresh._intervalId = false;
        }

        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
    });

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