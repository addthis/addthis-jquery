
'use strict';

describe('$.addthis.config', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };

    afterEach(function() {
        $.addthis.config.defaults = {};
        $.addthis.config.current = {};

        $.addthis.share.defaults = {};
        $.addthis.share.current = {};

        $.addthis.load._callbacks = [];

        $.addthis.layers_refresh._lastTs = 0;
        $.addthis.layers_refresh.pending = 0;

        if ($.addthis.load._intervalId) {
            clearInterval($.addthis.load._intervalId);
            $.addthis.load._intervalId = false;
        }

        if ($.addthis.layers_refresh._intervalId) {
            clearInterval($.addthis.layers_refresh._intervalId);
            $.addthis.layers_refresh._intervalId = false;
        }

        delete window.addthis;
        delete window.addthis_share;
        delete window.addthis_config;
    });

    it('should be defined', function() {
        expect($.addthis.config).toBeDefined();
    });

//    it('should return a jQuery object', function() {});

    it('should call $.addthis.layers_refresh', function() {
        spyOn($.addthis, 'layers_refresh').and.callThrough();
        $.addthis.config({});
        expect($.addthis.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_config to a copy of what we passed', function() {
        $.addthis.config(testConfigs1);
        expect(window.addthis_config).not.toBe(testConfigs1);
        expect(window.addthis_config).toEqual(testConfigs1);
        expect($.addthis.config.current).toEqual(testConfigs1);
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

    it('should use defaults in $.addthis.config.defaults', function() {
        $.addthis.config.defaults = { 'biz': 'baz' };
        expect($.addthis.config.defaults.biz).toEqual('baz');

        $.addthis.config(testConfigs1);
        expect(window.addthis_config).not.toEqual(testConfigs1);
        expect($.addthis.config.current).not.toEqual(testConfigs1);

        expect($.addthis.config.current.foo).toEqual('bar');
        expect($.addthis.config.current.biz).toEqual('baz');
        expect(window.addthis_config.foo).toEqual('bar');
        expect(window.addthis_config.biz).toEqual('baz');
    });
});

