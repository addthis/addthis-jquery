/**
* @file A jQuery plugin for adding AddThis tools onto dynamically generate pages. Requires a free AddThis account.
* @author AddThis <help@addthis.com>
* @version 0.0.1
* @requires jquery
*/
(function($, window) {
    var pluginName = 'addthis';
    var plugin = $.fn[pluginName] = {};

    // Variable for tracking module usage to help guide AddThis in deciding how
    // many resources to devote to maintaining this integration and what
    // versions of jQuery to focus on or test with.
    window.addthis_plugin_info = {
        info_status    : 'enabled',
        cms_name       : 'jQuery',
        cms_version    : $.fn.jquery,
        plugin_name    : 'jquery-angular',
        plugin_version : '0.0.1',
        plugin_mode    : 'AddThis'
    };
})(jQuery, window);