/**
* @file A jQuery plugin for adding AddThis tools onto dynamically generate pages. Requires a free AddThis account.
* @author AddThis <help@addthis.com>
* @version 0.0.1
* @requires jquery
*/
;(function($, window, document, undefined) {
    var pluginName = 'addthis';

    window.addthis_plugin_info = {
        info_status    : 'enabled',
        cms_name       : 'jQuery',
        cms_version    : $.fn.jquery,
        plugin_name    : 'jquery-angular',
        plugin_version : '0.0.1',
        plugin_mode    : 'AddThis'
    };

    var settings = {
        load: {
            _intervalId: false,
            _callbacks: []
        },
        layers_refresh: {
            _intervalId: false,
            _lastTs: 0,
            pending: 0
        },
        config: {},
        share: {}
    };

    var defaults = {
        config: {},
        share: {}
    };

    function plugin(parent) {
        this.parent = parent;
        this._name = pluginName;
        this.load = load;
        this.layers_refresh = layers_refresh;
        this.config = config;
        this.share = share;
        this.shareUrl = shareUrl;
        this.shareTitle = shareTitle;
        this.shareDescription = shareDescription;
        this.shareMedia = shareMedia;
        this.twitterVia = twitterVia;
        this.urlShortening = urlShortening;
        this.tool = tool;
        this.defaults = defaults;
        this.current = settings;
    };

    /**
     * @method "jQuery.addthis().load"
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
    var load = function(callback) {
        if(window.addthis) {
            callback();
        } else {
            settings.load._callbacks.push(callback);
            if (settings.load._intervalId === false) {
                var checkForAddThis = function() {
                    if(window.addthis) {
                        clearInterval(settings.load._intervalId);
                        settings.load._done = true;
                        settings.load._intervalId = false;
                        settings.load._callbacks.forEach(function(stashedCallback) {
                            stashedCallback();
                        });
                        settings.load._callbacks = [];
                    }
                };

                settings.load._intervalId = window.setInterval(checkForAddThis, 200);
            }
        }

        return $;
    };

    /**
     * @method "jQuery.addthis().layers_refresh"
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
    var layers_refresh = function() {
        settings.layers_refresh._lastTs = (new Date()).getTime();

        window.addthis_config = $.extend({}, settings.config);
        window.addthis_share = $.extend({}, settings.share);

        // if `addthis.layers.refresh` doesn't exist yet, do nothing
        // FYI: `addhtis.layers.refresh` won't exist until SmartLayers has
        // bootstrapped. It won't bootstrap automatically unless it's loaded
        // with a valid profile ID that has a tool configured on
        // https://www.addthis.com/dashboard
        if (settings.layers_refresh._intervalId !== false ||
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
            if (now - settings.layers_refresh._lastTs >= 100 &&
                now - window.addthis.layers.lastViewRegistered > 500
            ) {
                clearInterval(settings.layers_refresh._intervalId);
                settings.layers_refresh._intervalId = false;
                window.addthis.layers.refresh(
                    settings.share.url,
                    settings.share.title
                );
            }
        };

        settings.layers_refresh._intervalId = window.setInterval(checkAndRun, 100);

        return $;
    };

    /**
     * @method "jQuery.addthis().config"
     * @access public
     * @param {object} options AddThis configuration object. See
     *   <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
     *   the addthis_config variable documentation</a> for options.
     * @return {jQuery} the jQuery function
     **/
    var config = function(options) {
        var opts = $.extend({}, defaults.config, options);

        // `addthis_config.ignore_server_config` means profile ID settings
        // will be ignored.
        if (opts.ignore_server_config) {
            window.addthis_plugin_info.plugin_mode = 'Local';
        } else {
            window.addthis_plugin_info.plugin_mode = 'AddThis';
        }

        settings.config = opts;
        this.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis().share"
     * @access public
     * @param {object} options AddThis sharing options. See
     *   <a href="https://www.addthis.com/academy/the-addthis_share-variable/"" target="_blank">
     *   the addthis_share variable documentation</a> for options.
     * @return {jQuery} the jQuery function
     **/
    var share = function(options) {
        var opts = $.extend({}, defaults.share, options);

        // setside url, title, description, media as we'll need these on every
        // addthis.layer_refresh call
        if (opts.url) {
            defaults.share.url = opts.url;
        }
        if (opts.title) {
            defaults.share.title = opts.title;
        }
        if (opts.description) {
            defaults.share.description = opts.description;
        }
        if (opts.media) {
            defaults.share.media = opts.media;
        }

        settings.share = opts;
        this.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis().shareUrl"
     * @access public
     * @description
     * This is a shortcut to setting the URL through
     * `$.addthis().share({'url': 'http://example.com'})`. Sets the URL
     * shared by tools that don't explicitly set one.
     *
     * To reset to default, set to `false`.
     *
     * @example $.addthis().shareUrl('https://www.addthis.com');
     *
     * @param {string} url the url to be used when clicking on a share button
     *   that doesn't speicfy its share url
     * @return {jQuery} the jQuery function
     **/
    var shareUrl = function(url) {
        defaults.share.url = url;
        settings.share.url = url;
        this.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis().shareTitle"
     * @access public
     * @description
     * This is a shortcut to setting the title through
     * `$.addthis().share({'title': 'Check this out!'})`. Sets the title
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
     * @example $.addthis().shareTitle('Check this out!');
     *
     * @param {string} title the title to be used when clicking on a share button
     *   that doesn't speicfy its share title
     * @return {jQuery} the jQuery function
     **/
    var shareTitle = function(title) {
        defaults.share.title = title;
        settings.share.title = title;
        this.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis().shareDescription"
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
     * @example $.addthis().shareDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
     *
     * @param {string} description the description to be used when clicking on a
     *   share button that doesn't speicfy its share description
     * @return {jQuery} the jQuery function
     **/
    var shareDescription = function(description) {
        defaults.share.description = description;
        settings.share.description = description;
        this.layers_refresh();
        return $;
    };

    /**
     * @method "jQuery.addthis().shareMedia"
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
     * @example $.addthis().shareMedia('http://example.com/img.png');
     *
     * @param {string} media the image url to be used when clicking on a share
     *   button that doesn't speicfy its share image url
     * @return {jQuery} the jQuery function
     **/
    var shareMedia = function(media) {
        defaults.share.media = media;
        settings.share.media = media;
        this.layers_refresh();
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
     * @method "jQuery.addthis().twitterVia"
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
    var twitterVia = function(handle) {
        // add/delete for current addthis_share value
        twitterViaHelper(handle, settings.share);

        // add/delete for default addthis_share value
        twitterViaHelper(handle, defaults.share);

        this.layers_refresh();
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
     * @method "jQuery.addthis().urlShortening"
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
    var urlShortening = function(urlShorteningService, socialService) {
        // add url shortener to current values for addthis_share
        urlShorteningHelper(urlShorteningService, socialService, settings.share);

        // add url shortener to default values for addthis_share
        urlShorteningHelper(urlShorteningService, socialService, defaults.share);

        this.layers_refresh();
        return $;
    };

    var wrapDomManipulationFunction = function(oldFunction) {
        var newFunction = function() {
            var result = oldFunction.apply(this, arguments);
            layers_refresh();
            return result;
        }

        return newFunction;
    };

    var reDefineDOMManipulationFunctions = function(element) {
        element.appendTo = wrapDomManipulationFunction(element.appendTo);
        element.insertAfter = wrapDomManipulationFunction(element.insertAfter);
        element.insertBefore = wrapDomManipulationFunction(element.insertBefore);
        element.prependTo = wrapDomManipulationFunction(element.prependTo);
        element.replaceAll = wrapDomManipulationFunction(element.replaceAll);
    };

    var changeDataAttrOnToolFunctions = function(destinationElement, changedElement) {
        destinationElement.shareUrl = elementChangeShareAttrForBoostTool('url', changedElement);
        destinationElement.shareTitle = elementChangeShareAttrForBoostTool('title', changedElement);
        destinationElement.shareDescription = elementChangeShareAttrForBoostTool('description', changedElement);
        destinationElement.shareMedia = elementChangeShareAttrForBoostTool('media', changedElement);
    };

    var elementChangeShareAttrForBoostTool = function(attr, element) {
        return function (newValue) {
            var oldToolElement = $(element.children(":first")[0]);
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
            element.empty().append(newToolElement);
            this.layers_refresh();
            return element;
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
    // creates a div with a addthis tool in it based on input options
    var createTool = function(options) {
        var toolElement = createNewElementForBoostTools(options);

        var parentElement = $('<div></div>')
            .addClass(parentClass)
            .append(toolElement);

        return parentElement;
    };

    var tool = function(options) {
        if (typeof options !== 'undefined') {
            var toolElement = createTool(options);
        }

        if (typeof this.parent === 'function') {
            // wraps functions appendTo, insertAfter, insertBefore, prependTo,
            // replaceAll to call addthis.layers.refresh after DOM manipulation
            reDefineDOMManipulationFunctions(toolElement);
            // adds functions shareUrl, shareTitle, shareDescription, shareMedia
            // onto the element in the second param to change attrs data-url,
            // data-title, data-description, data-media on the addthis tool in the
            // second param
            changeDataAttrOnToolFunctions(toolElement, toolElement);
            return toolElement;
        } else if (typeof this.parent === 'object') {
            if (typeof options.method !== 'undefined'
                && typeof this.parent[options.method] === 'function'
            ) {
                this.parent[options.method](toolElement);
                // wraps functions appendTo, insertAfter, insertBefore, prependTo,
                // replaceAll to call addthis.layers.refresh after DOM manipulation
                reDefineDOMManipulationFunctions(this.parent);
                // adds functions shareUrl, shareTitle, shareDescription, shareMedia
                // onto the element in the second param to change attrs data-url,
                // data-title, data-description, data-media on the addthis tool in the
                // second param
                changeDataAttrOnToolFunctions(this.parent, toolElement);
                layers_refresh();

                return this.parent;
            }
        }

        return this;
    };

    //
    // bootstrap addthis_config & addthis_share
    //
    if (typeof window.addthis_config === 'object') {
        // if the user didn't set any general configuration options through
        // the module and window.addthis_config looks right on page and has
        // something in it use it
        settings.config = $.extend({}, window.addthis_config);
    } else {
        window.addthis_config = $.extend({}, settings.config);
    }

    if (typeof window.addthis_share === 'object') {
        // if the user didn't set any share configuration options through
        // the module and window.addthis_config looks right on page and has
        // something in it use it
        settings.share = $.extend({}, window.addthis_share);

        if (typeof window.addthis === 'undefined') {
            /**
             * Only hold onto url, title, description, media values if
             * addthis_widget has not yet set up the global addthis
             * variable. If it has, then those properties may have been set
             * by it addthis_widget.js and not on page. Let's only hold on
             * to those properties if we know they were set on page
             **/
            if (settings.share.url) {
                defaults.share.url = settings.share.url;
            }

            if (settings.share.title) {
                defaults.share.title = settings.share.title;
            }

            if (settings.share.description) {
                defaults.share.description = settings.share.description;
            }

            if (settings.share.media) {
                defaults.share.media = settings.share.media;
            }
        }
    } else {
        window.addthis_share = $.extend({}, settings.share);
    }

    $[pluginName] = function() {
        return new plugin(this);
    }

    $.fn[pluginName] = function() {
        return new plugin(this);
    }

})(jQuery, window, document);

/**
* The jQuery plugin namespace.
* @external "jQuery"
* @access public
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/