
'use strict';

describe('$.addthis().config', function() {
    var testConfigs1 = {
        'foo': 'bar'
    };

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

    it('should be defined', function() {
        expect($.addthis().config).toBeDefined();
    });

    it('should return the jQuery function', function() {
        var jQueryCopy = $.addthis().config();
        expect(jQueryCopy).toEqual($);
    });

    it('should call $.addthis().layers_refresh', function() {
        var addthisPlugin = $.addthis();
        spyOn(addthisPlugin, 'layers_refresh').and.callThrough();
        addthisPlugin.config({});
        expect(addthisPlugin.layers_refresh.calls.count()).toEqual(1);
    });

    it('should set window.addthis_config to a copy of what we passed', function() {
        $.addthis().config(testConfigs1);
        expect(window.addthis_config).not.toBe(testConfigs1);
        expect(window.addthis_config).toEqual(testConfigs1);
        expect($.addthis().current.config).toEqual(testConfigs1);
    });

    it('should change addthis_plugin_info.mode from "AddThis" to "Local" if the property ignore_server_config is true', function() {
        expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
        $.addthis().config({ignore_server_config: true});
        expect($.addthis().current.config).toEqual({ignore_server_config: true});
        expect(window.addthis_config).toEqual({ignore_server_config: true});
        expect(window.addthis_plugin_info.plugin_mode).toBe('Local');
    });

    it('should set addthis_plugin_info.mode to "AddThis" if the property ignore_server_config is false', function() {
        $.addthis().config({ignore_server_config: false});
        expect($.addthis().current.config).toEqual({ignore_server_config: false});
        expect(window.addthis_config).toEqual({ignore_server_config: false});
        expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
    });

    it('should use defaults in $.addthis().defaults.config', function() {
        $.addthis().defaults.config = { 'biz': 'baz' };
        expect($.addthis().defaults.config.biz).toEqual('baz');

        $.addthis().config(testConfigs1);
        expect(window.addthis_config).not.toEqual(testConfigs1);
        expect($.addthis().current.config).not.toEqual(testConfigs1);

        expect($.addthis().current.config.foo).toEqual('bar');
        expect($.addthis().current.config.biz).toEqual('baz');
        expect(window.addthis_config.foo).toEqual('bar');
        expect(window.addthis_config.biz).toEqual('baz');
    });
});

