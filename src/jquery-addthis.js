/**
* @file A jQuery plugin for adding AddThis tools onto dynamically generate pages. Requires a free AddThis account.
* @author AddThis <help@addthis.com>
* @version 0.0.1
* @requires jquery
*/
(function($, window) {
    var pluginName = 'addthis';

    var plugin = $[pluginName] = {};

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

    /**
     * @method "jQuery.addthis.load"
     * @public
     * @description
     * Executes a callback once addthis_widget.js has loaded and AddThis tools
     * are ready to use.
     *
     * @param {function} callback The function to execute once addthis_widget.js
     *     has loaded and AddThis tools are ready to use. No paramaters are
     *     passed to it.
     * @return {jQuery} the jQuery function
      **/
    plugin.load = function(callback) {
        if(window.addthis) {
            callback();
        } else {
            plugin.load._callbacks.push(callback);
            if (plugin.load._intervalId === false) {
                var checkForAddThis = function() {
                    if(window.addthis) {
                        clearInterval(plugin.load._intervalId);
                        plugin.load._done = true;
                        plugin.load._intervalId = false;
                        plugin.load._callbacks.forEach(function(stashedCallback) {
                            stashedCallback();
                        });
                        plugin.load._callbacks = [];
                    }
                };

                plugin.load._intervalId = window.setInterval(checkForAddThis, 200);
            }
        }

        return $;
    };
    plugin.load._intervalId = false;
    plugin.load._callbacks = [];

    /**
     * @method "jQuery.addthis.layers_refresh"
     * @access public
     * @description
     * Checks if `addthis_widget.js` is loaded yet and whether SmartLayers has
     * initialized. If not, there's no need to bother with
     * `addthis.layers.refresh`. If present, creates an interval of 100ms
     * 100ms to make sure more refresh requests aren't coming still coming in
     * from the app. If no more refresh requests have come in 100ms, and
     * refresh hasn't been called in 500ms, `addthis.layers.refresh` is
     * executed. FYI: AddThis SmartLayers API will ignore calls to
     * `addthis.layers.refresh` if it's been called already within 500ms.
     * @return {jQuery} the jQuery function
     **/
    plugin.layers_refresh = function() {
        plugin.layers_refresh._lastTs = (new Date()).getTime();

        window.addthis_config = $.extend({}, plugin.config.current);
        window.addthis_share = $.extend({}, plugin.share.current);

        // if `addthis.layers.refresh` doesn't exist yet, do nothing
        // FYI: `addhtis.layers.refresh` won't exist until SmartLayers has
        // bootstrapped. It won't bootstrap automatically unless it's loaded
        // with a valid profile ID that has a tool configured on
        // https://www.addthis.com/dashboard
        if (plugin.layers_refresh._intervalId !== false ||
            typeof window.addthis === 'undefined' ||
            typeof window.addthis.layers === 'undefined' ||
            typeof window.addthis.layers.refresh === 'undefined'
        ) {
            return $;
        }

        /**
         * @access private
         * @description
         * Callback for checking in an interval whether addthis.layers.refresh
         * can be called now
         * @callback checkAndRun
         */
        var checkAndRun = function() {
            var now = (new Date()).getTime();
            // if it's been at least 99ms since the last request
            // and it's been more than 500ms since client did a layers
            // refresh (client won't do it more often anyway)
            if (now - plugin.layers_refresh._lastTs >= 100 &&
                now - window.addthis.layers.lastViewRegistered > 500
            ) {
                clearInterval(plugin.layers_refresh._intervalId);
                plugin.layers_refresh._intervalId = false;
                window.addthis.layers.refresh(
                    plugin.share.current.url,
                    plugin.share.current.title
                );
            }
        };

        plugin.layers_refresh._intervalId = window.setInterval(checkAndRun, 100);

        return $;
    };
    plugin.layers_refresh._lastTs = 0;
    plugin.layers_refresh.pending = 0;
    plugin.layers_refresh._intervalId = false;

    /**
     * @method "jQuery.addthis.config"
     * @access public
     * @param {object} options AddThis configuration object. See
     *   <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
     *   the addthis_config variable documentation</a> for options.
     * @return {jQuery} the jQuery function
     **/
    plugin.config = function(options) {
        var opts = $.extend({}, plugin.config.defaults, options);

        // `addthis_config.ignore_server_config` means profile ID settings
        // will be ignored.
        if (opts.ignore_server_config) {
            window.addthis_plugin_info.plugin_mode = 'Local';
        } else {
            window.addthis_plugin_info.plugin_mode = 'AddThis';
        }

        plugin.config.current = opts;
        plugin.layers_refresh();
        return $;
    };
    /**
     * @default
     * @description
     * Default options for jQuery.addthis.config
     **/
    plugin.config.defaults = {};
    plugin.config.current = {};

    /**
     * @method "jQuery.addthis.share"
     * @access public
     * @param {object} options AddThis sharing options. See
     *   <a href="https://www.addthis.com/academy/the-addthis_share-variable/"" target="_blank">
     *   the addthis_share variable documentation</a> for options.
     * @return {jQuery} the jQuery function
     **/
    plugin.share = function(options) {
        var opts = $.extend({}, plugin.share.defaults, options);

        // setside url, title, description, media as we'll need these on every
        // addthis.layer_refresh call
        if (opts.url) {
            plugin.share.defaults.url = opts.url;
        }
        if (opts.title) {
            plugin.share.defaults.title = opts.title;
        }
        if (opts.description) {
            plugin.share.defaults.description = opts.description;
        }
        if (opts.media) {
            plugin.share.defaults.media = opts.media;
        }

        plugin.share.current = opts;
        plugin.layers_refresh();
        return $;
    };
    /**
     * @default
     * @description
     * Default options for jQuery.addthis.share
     **/
    plugin.share.defaults = {};
    plugin.share.current = {};

    /**
     * @method "jQuery.addthis.shareUrl"
     * @access public
     * @description
     * This is a shortcut to setting the URL through
     * `$.addthis.share({'url': 'http://example.com'})`. Sets the URL
     * shared by tools that don't explicitly set one.
     *
     * To reset to default, set to `false`.
     *
     * @example $.addthis.shareUrl('https://www.addthis.com');
     *
     * @param {string} url the url to be used when clicking on a share button
     *   that doesn't speicfy its share url
     * @return {jQuery} the jQuery function
     **/
    plugin.shareUrl = function(url) {
        plugin.share.defaults.url = url;
        plugin.share.current.url = url;
        plugin.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis.shareTitle"
     * @access public
     * @description
     * This is a shortcut to setting the title through
     * `$.addthis.share({'title': 'Check this out!'})`. Sets the title
     * shared by tools that don't explicitly set one.
     *
     * To reset to default, set to `false`.
     *
     * Note: Some services (such as Facebook) do not allow you to define
     * the share title for a URL this way. Facebook will always use the
     * Open Graph tags it finds on the page when it crawls it. You can
     * use the <a href="https://developers.facebook.com/tools/debug/">
     * Facebook Sharing Debugger</a> to test your Open Graph tags.
     *
     * @example $.addthis.shareTitle('Check this out!');
     *
     * @param {string} title the title to be used when clicking on a share button
     *   that doesn't speicfy its share title
     * @return {jQuery} the jQuery function
     **/
    plugin.shareTitle = function(title) {
        plugin.share.defaults.title = title;
        plugin.share.current.title = title;
        plugin.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis.shareDescription"
     * @access public
     * @description
     * This is a shortcut to setting the description through
     * `$addthis.share({'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'})`\
     * . Sets the description shared by tools that don't explicitly set
     * one.
     *
     * To reset to default, set to `false`.
     *
     * Note: Some services (such as Facebook) do not allow you to define
     * the share description for a URL this way. Facebook will always
     * use the Open Graph tags it finds on the page when it crawls it.
     * You can use the
     * <a href="https://developers.facebook.com/tools/debug/">
     * Facebook Sharing Debugger</a> to test your Open Graph tags.
     *
     * @example $.addthis.shareDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
     *
     * @param {string} description the description to be used when clicking on a
     *   share button that doesn't speicfy its share description
     * @return {jQuery} the jQuery function
     **/
    plugin.shareDescription = function(description) {
        plugin.share.defaults.description = description;
        plugin.share.current.description = description;
        plugin.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis.shareMedia"
     * @access public
     * @description
     * This is a shortcut to setting the image through
     * `$addthis.share({'shareMedia': 'http://example.com/img.png'})`.
     * Sets the image shared by tools that don't explicitly set one.
     *
     * To reset to default, set to `false`.
     *
     * Note: Some services (such as Facebook) do not allow you to define
     * the share image for a URL this way. Facebook will always use the
     * Open Graph tags it finds on the page when it crawls it. You can
     * use the <a href="https://developers.facebook.com/tools/debug/">
     * Facebook Sharing Debugger</a> to test your Open Graph tags.
     *
     * @example $.addthis.shareMedia('http://example.com/img.png');
     *
     * @param {string} media the image url to be used when clicking on a share
     *   button that doesn't speicfy its share image url
     * @return {jQuery} the jQuery function
     **/
    plugin.shareMedia = function(media) {
        plugin.share.defaults.media = media;
        plugin.share.current.media = media;
        plugin.layers_refresh();
        return $;
    };

    var twitterViaHelper = function(handle, shareConfig) {
        if (typeof handle === 'string' && handle.length > 0) {
            if (typeof shareConfig.passthrough === 'undefined') {
                shareConfig.passthrough = {};
            }
            if (typeof shareConfig.passthrough.twitter === 'undefined') {
                shareConfig.passthrough.twitter = {};
            }
            shareConfig.passthrough.twitter.via = handle;
        } else if (handle === false &&
            typeof shareConfig.passthrough !== 'undefined' &&
            typeof shareConfig.passthrough.twitter !== 'undefined' &&
            typeof shareConfig.passthrough.twitter.via !== 'undefined'
        ) {
            delete shareConfig.passthrough.twitter.via;
        }
    };

    /**
     * @method "jQuery.addthis.twitterVia"
     * @access public
     * @description
     * Takes a twitter handle/username and uses it for twitter via. See
     * https://www.addthis.com/academy/changes-to-how-twitter-works-with-addthis/
     * for more information
     *
     * @param {string|false} the twitter handle in a string or false to remove
     * twitter handle from config
     * @return {jQuery} the jQuery function
     **/
    plugin.twitterVia = function(handle) {
        // add/delete for current addthis_share value
        twitterViaHelper(handle, plugin.share.current);

        // add/delete for default addthis_share value
        twitterViaHelper(handle, plugin.share.defaults);

        plugin.layers_refresh();
        return $;
    };

    /**
     * @method urlShorteningHelper
     * @access private
     * @ignore
     **/
    var urlShorteningHelper = function(urlShorteningService, socialService, shareConfig) {
        if (typeof shareConfig.url_transforms === 'undefined') {
            shareConfig.url_transforms = {};
        }
        if (typeof shareConfig.url_transforms.shorten === 'undefined') {
            shareConfig.url_transforms.shorten = {};
        }
        if (typeof shareConfig.shorteners === 'undefined') {
            shareConfig.shorteners = {};
        }

        shareConfig.url_transforms.shorten[socialService] = urlShorteningService;
        shareConfig.shorteners[urlShorteningService] = {};
    };

    /**
     * @method "jQuery.addthis.urlShortening"
     * @access public
     * @description
     * Takes a URL shortening name and a social service name, then enables URL
     * shortening on that social service using the url shortening service.
     * https://www.addthis.com/academy/url-shortening/
     * for more information
     *
     * @param {string} urlShorteningService The URL shortening service to enable
     * @param {string} socialService The social service to enable the URL shortening on
     * @return {jQuery} the jQuery function
     **/
    plugin.urlShortening = function(urlShorteningService, socialService) {
        // add url shortener to current values for addthis_share
        urlShorteningHelper(urlShorteningService, socialService, plugin.share.current);

        // add url shortener to default values for addthis_share
        urlShorteningHelper(urlShorteningService, socialService, plugin.share.defaults);

        plugin.layers_refresh();
        return $;
    };

    var wrapDomManipulationFunction = function(oldFunction) {
        var newFunction = function() {
            var result = oldFunction.apply(this, arguments);
            plugin.layers_refresh();
            return result;
        }

        return newFunction;
    };

    var definedAddThisFunctionsOnElements = function(element) {
        element.appendTo = wrapDomManipulationFunction(element.appendTo);
        element.insertAfter = wrapDomManipulationFunction(element.insertAfter);
        element.insertBefore = wrapDomManipulationFunction(element.insertBefore);
        element.prependTo = wrapDomManipulationFunction(element.prependTo);
        element.replaceAll = wrapDomManipulationFunction(element.replaceAll);

        element.shareUrl = elementChangeShareAttrForBoostTool('url');
        element.shareTitle = elementChangeShareAttrForBoostTool('title');
        element.shareDescription = elementChangeShareAttrForBoostTool('description');
        element.shareMedia = elementChangeShareAttrForBoostTool('media');

        return element;
    };

    var elementChangeShareAttrForBoostTool = function(attr) {
        return function (newValue) {
            var oldToolElement = $($(this).children(":first")[0]);
            var options = { tool: oldToolElement.class };

            if (typeof oldToolElement.attr('class') !== 'undefined') {
                options.tool = oldToolElement.attr('class');
            }
            if (typeof oldToolElement.attr('data-title') !== 'undefined') {
                options.title = oldToolElement.attr('data-title');
            }
            if (typeof oldToolElement.attr('data-url') !== 'undefined') {
                options.url = oldToolElement.attr('data-url');
            }
            if (typeof oldToolElement.attr('data-description') !== 'undefined') {
                options.description = oldToolElement.attr('data-description');
            }
            if (typeof oldToolElement.attr('data-media') !== 'undefined') {
                options.media = oldToolElement.attr('data-media');
            }

            var oldValue = oldToolElement.attr('data-' + attr);
            if (oldValue !== newValue) {
                if (typeof newValue === 'undefined') {
                    delete options[attr];
                } else {
                    options[attr] = newValue;
                }
            }

            var newToolElement = createNewElementForBoostTools(options);
            $(this).empty().append(newToolElement);
            plugin.layers_refresh();
            return this;
        };
    };

    var createNewElementForBoostTools = function(options) {
        var newElements = $('<div></div>');
        if (typeof options.tool === 'string') {
            newElements.addClass(options.tool);
        }
        if (typeof options.title === 'string') {
            newElements.attr('data-title', options.title);
        }
        if (typeof options.url === 'string') {
            newElements.attr('data-url', options.url);
        }
        if (typeof options.media === 'string') {
            newElements.attr('data-media', options.media);
        }
        if (typeof options.description === 'string') {
            newElements.attr('data-description', options.description);
        }

        return newElements;
    };

    var parentClass = 'addthis-tool-parent-class';
    plugin.tool = function(options) {
        var toolElement = createNewElementForBoostTools(options);

        var parentElement = $('<div></div>')
            .addClass(parentClass)
            .append(toolElement);

        definedAddThisFunctionsOnElements(parentElement);

        return parentElement;
    };


    if (typeof window.addthis_config === 'object') {
        // if the user didn't set any general configuration options through
        // the module and window.addthis_config looks right on page and has
        // something in it use it
        plugin.config.current = $.extend({}, window.addthis_config);
    } else {
        window.addthis_config = $.extend({}, plugin.config.current);
    }

    if (typeof window.addthis_share === 'object') {
        // if the user didn't set any share configuration options through
        // the module and window.addthis_config looks right on page and has
        // something in it use it
        plugin.share.current = $.extend({}, window.addthis_share);

        if (typeof window.addthis === 'undefined') {
            /**
             * Only hold onto url, title, description, media values if
             * addthis_widget has not yet set up the global addthis
             * variable. If it has, then those properties may have been set
             * by it addthis_widget.js and not on page. Let's only hold on
             * to those properties if we know they were set on page
             **/
            if (plugin.share.current.url) {
                plugin.share.defaults.url = plugin.share.current.url;
            }

            if (plugin.share.current.title) {
                plugin.share.defaults.title = plugin.share.current.title;
            }

            if (plugin.share.current.description) {
                plugin.share.defaults.description = plugin.share.current.description;
            }

            if (plugin.share.current.media) {
                plugin.share.defaults.media = plugin.share.current.media;
            }
        }
    } else {
        window.addthis_share = $.extend({}, plugin.share.current);
    }
})(jQuery, window);

/**
* The jQuery plugin namespace.
* @external "jQuery"
* @access public
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/