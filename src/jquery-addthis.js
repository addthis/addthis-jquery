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

    /**
     * @method "jQuery.addthis().load"
     * @public
     * @description
     * Executes a callback once addthis_widget.js has loaded and AddThis tools
     * are ready to use.
     * For example, one might want to use this if they are defining the tools
     * they want on the page using
     * <a href="https://www.addthis.com/academy/smart-layers-api/" target="_blank">SmartLayers</a>
     * instead of on their AddThis account.
     *
     * @example
jQuery.addthis().load(function() {
    window.addthis.layers({share: {}});
});
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
     * <p>
     * This only needs to be used if adding HTML elements for AddThis
     * tools without using jQuery.addthis().tool() or if using
     * jQuery.addthis().tool() and adding the returned tool onto an element
     * currently detatched from the DOM. In either case, after adding the
     * element onto the DOM, call jQuery.addthis().layers_refresh manually or
     * AddThis tools may not be added to the new element.
     * </p>
     *
     * <p>
     * This functions checks if AddThis' addthis_widget.js JavaScript file is
     * loaded yet and whether AddThis SmartLayers has initialized. If not,
     * there's no need to bother with addthis.layers.refresh and it's not
     * called. Otherwise, it creates an interval of 100ms to make catch any
     * subsequent calls. If no more refresh requests have come in 100ms, and
     * addthis.layers.refresh hasn't been called in 500ms,
     * addthis.layers.refresh is executed. The AddThis SmartLayers API will
     * ignore calls to addthis.layers.refresh if it's been called in the last
     * 500ms.
     * </p>
     * @example
var newElementIWantToolsIn = $('<div class="foo-bar"></div>');
newElementIWantToolsIn.addthis().tool({
    tool: 'addthis_inline_share_toolbox_m90v',
    method: 'append' // or ...
});

var someOtherElements = $('.my-div-where-i-want-addthis-tools')
  .append(newElementIWantToolsIn);
jQuery.addthis().layers_refresh();
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
         * can be called now (exists and hasn't run in at least 500ms), and if
         * so, calls it.
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
     * @description
     * Sets values in the window.addthis_config variable and triggers AddThis
     * refresh to put the new settings to use. See
     * <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
     * the addthis_config variable documentation</a> for options.
     * @example
jQuery.addthis().config({
    ui_tabindex: 1,
    ui_language: 'en
});
     * @param {object} options AddThis configuration object.
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
     * @description
     * Sets values in the window.addthis_share variable and triggers AddThis
     * refresh to put the new settings to use. See
     * <a href="https://www.addthis.com/academy/the-addthis_share-variable/"" target="_blank">
     * the addthis_share variable documentation</a> for options.
     * @example
jQuery.addthis().share({
    title: 'My awesome page',
    url: 'http://addthis.com',
});
     * @param {object} options AddThis sharing object.
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
     * <p>
     * This is a shortcut to setting the URL. Sets the URL
     * shared by tools that don't explicitly set one. To set this along with
     * other share variables at once, use jQuery.addthis().share
     * instead.
     * </p>
     *
     * <p>
     * To reset to default, set to false.
     * </p>
     *
     * @example $.addthis().shareUrl('https://www.addthis.com');
     * @example $.addthis().shareUrl(false);
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
     * <p>
     * This is a shortcut to setting the share title. Sets the title shared by
     * tools that don't explicitly set one. To set this along with other share
     * variables at once, use jQuery.addthis().share instead.
     * </p>
     *
     * <p>
     * To reset to default, set to false.
     * </p>
     *
     * <p>
     * <strong>Note</strong>: Some services (such as Facebook) do not allow one
     * to define the share title for a URL this way. Facebook will always
     * use the Open Graph tags it finds on the page when it crawls it. You can
     * use the
     * <a href="https://developers.facebook.com/tools/debug/">
     * Facebook Sharing Debugger</a> to test a page's Open Graph tags.
     * </p>
     *
     * @example $.addthis().shareTitle('Check this out!');
     * @example $.addthis().shareTitle(false);
     * @param {string} title the title to be used when clicking on a share
     *   button that doesn't speicfy its share title
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
     * <p>
     * This is a shortcut to setting the description. Sets the description
     * shared by tools that don't explicitly set one. To set this along with
     * other share variables at once, use jQuery.addthis().share
     * instead.
     * </p>
     *
     * <p>
     * To reset to default, set to false.
     * </p>
     *
     * <p>
     * <strong>Note</strong>: Some services (such as Facebook) do not allow one
     * to define the share description for a URL this way. Facebook will always
     * use the Open Graph tags it finds on the page when it crawls it. You can
     * use the
     * <a href="https://developers.facebook.com/tools/debug/">
     * Facebook Sharing Debugger</a> to test a page's Open Graph tags.
     * </p>
     *
     * @example $.addthis().shareDescription('Lorem ipsum');
     * @example $.addthis().shareDescription(false);
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
     * <p>
     * This is a shortcut to setting the share image. Sets the image shared by
     * tools that don't explicitly set one. To set this along with other share
     * variables at once, use jQuery.addthis().share instead.
     * </p>
     *
     * <p>
     * To reset to default, set to false.
     * </p>
     *
     * <p>
     * <strong>Note</strong>: Some services (such as Facebook) do not allow one
     * to define the share image for a URL this way. Facebook will always
     * use the Open Graph tags it finds on the page when it crawls it. You can
     * use the
     * <a href="https://developers.facebook.com/tools/debug/">
     * Facebook Sharing Debugger</a> to test a page's Open Graph tags.
     * </p>
     *
     * @example $.addthis().shareMedia('http://example.com/img.png');
     * @example $.addthis().shareMedia(false);
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

    /**
     * @method twitterViaHelper
     * @access private
     * @description
     * A helper function for manipulating the Twitter via configuration settings
     * @ignore
     **/
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
     * Takes a Twitter handle/username and uses it for Twitter via. See
     * https://www.addthis.com/academy/changes-to-how-twitter-works-with-addthis/
     * for more information.
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
     * @description
     * A helper function for manipulating the share configuration settings
     * specifically for URL shorteners.
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

    /**
     * @method wrapDomManipulationFunction
     * @access private
     * @description
     * Creates the functions that replace appendTo, insertAfter, insertBefore,
     * prependTo and replaceAll to make sure AddThis is told to refresh after
     * relevant DOM changes.
     * @ignore
     **/
    var wrapDomManipulationFunction = function(oldFunction) {
        var newFunction = function() {
            var result = oldFunction.apply(this, arguments);
            layers_refresh();
            return result;
        };

        return newFunction;
    };

    /**
     * @method reDefineDOMManipulationFunctions
     * @access private
     * @description
     * Replaces the stock appendTo, insertAfter, insertBefore, prependTo and
     * replaceAll functions on the passed element and replaces them with wrapped
     * version from wrapDomManipulationFunction
     * @ignore
     **/
    var reDefineDOMManipulationFunctions = function(element) {
        element.appendTo = wrapDomManipulationFunction(element.appendTo);
        element.insertAfter = wrapDomManipulationFunction(element.insertAfter);
        element.insertBefore = wrapDomManipulationFunction(element.insertBefore);
        element.prependTo = wrapDomManipulationFunction(element.prependTo);
        element.replaceAll = wrapDomManipulationFunction(element.replaceAll);
    };

    /**
     * @method createNewElementForBoostTools
     * @access private
     * @description
     * Creates an AddThis element based off the passed options
     * @ignore
     **/
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

    /**
     * @method elementChangeShareAttrForBoostTool
     * @access private
     * @description
     * Creates a function for a given AddThis element for changing a given
     * attribute. This builds all the element specific shareTitle, shareUrl,
     * shareDescription and shareMedia functions.
     * @ignore
     **/
    var elementChangeShareAttrForBoostTool = function(attr, element) {
        return function (newValue) {
            var oldToolElement = $(element.children(':first')[0]);
            var options = { tool: oldToolElement.className };

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
            layers_refresh();
            return element;
        };
    };

    /**
     * @method changeDataAttrOnToolFunctions
     * @access private
     * @description
     * Adds shareTitle, shareUrl, shareDescription and shareMedia functions onto
     * destinationElement that change attributes for the changedElement.
     * @ignore
     **/
    var changeDataAttrOnToolFunctions = function(destinationElement, changedElement) {
        destinationElement.shareUrl = elementChangeShareAttrForBoostTool('url', changedElement);
        destinationElement.shareTitle = elementChangeShareAttrForBoostTool('title', changedElement);
        destinationElement.shareDescription = elementChangeShareAttrForBoostTool('description', changedElement);
        destinationElement.shareMedia = elementChangeShareAttrForBoostTool('media', changedElement);
    };

    var parentClass = 'addthis-tool-parent-class';

    /**
     * @method createTool
     * @access private
     * @description
     * Creates a div with an AddThis tool in it.
     * @ignore
     **/
    var createTool = function(options) {
        var toolElement = createNewElementForBoostTools(options);

        var parentElement = $('<div></div>')
            .addClass(parentClass)
            .append(toolElement);

        return parentElement;
    };

    /**
     * @method "jQuery.addthis().tool"
     * @access public
     * @description
     * <p>
     * Creates an element for an inline AddThis tool that can be added onto
     * the page.
     * </p>
     *
     * <p>
     * There are three ways to use this function.
     * </p>
     * <ol>
     * <li>
     * Add that object onto the page using appendTo, prependTo, insertAfter,
     * insertBefore, or replaceAll off the returned object. Illustrated in the
     * first example below.
     * </li>
     * <li>
     * Call .addthis().tool off of any jQuery object for an element that is
     * already in the DOM (not something detatched from the DOM) and specify
     * how the AddThis tool should be added onto that element using the method
     * property. The value for this property can be 'append', 'prepend', 'after'
     * or 'before'. Illustrated in the second example below.
     * </li>
     * <li>
     * Use either option 1 or 2 above on an element detached from the DOM. Once
     * the relevant item is attched to the DOM, execute
     * jQuery.addthis().layers_refresh(). See the documentation for
     * jQuery.addthis().layers_refresh for examples and more information.
     * </li>
     * </ol>
     * @example
var addthisToolConfig1 = {
    tool: 'addthis_inline_share_toolbox_m90v',
    title: 'My awesome page',
    url: 'http://addthis.com',
    media: 'http://addthis.com/img.png',
    description: 'A description of my awesome page'
};

$.addthis()
    .tool(addthisToolConfig1)
    .appendTo('.my-div-where-i-want-addthis-tools');
     * @example
var addthisToolConfig2 = {
    tool: 'addthis_inline_share_toolbox_m90v',
    title: 'My awesome page',
    url: 'http://addthis.com',
    media: 'http://addthis.com/img.png',
    description: 'A description of my awesome page',
    method: 'append'
};

$('.my-div-where-i-want-addthis-tools')
    .$addthis()
    .tool(addthisToolConfig2);
     * @param {object} options An object with the property tool and optionally
     * the properties title, url, media, description and method.
     * @return {addthis} An AddThis jQuery plugin object, which looks just like
     * a jQuery element plugin with a coupld additional functions: shareUrl,
     * shareTitle, shareDescription and shareMedia.
     **/
    var tool = function(options) {
        if (typeof options !== 'object') {
            return this;
        }

        var toolElement = createTool(options);

        if (typeof this.parent === 'object' &&
            typeof options.method !== 'undefined' &&
            typeof this.parent[options.method] === 'function'
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
            this.layers_refresh();

            return this.parent;
        }

        // wraps functions appendTo, insertAfter, insertBefore, prependTo,
        // replaceAll to call addthis.layers.refresh after DOM manipulation
        reDefineDOMManipulationFunctions(toolElement);
        // adds functions shareUrl, shareTitle, shareDescription, shareMedia
        // onto the element in the second param to change attrs data-url,
        // data-title, data-description, data-media on the addthis tool in the
        // second param
        changeDataAttrOnToolFunctions(toolElement, toolElement);

        return toolElement;
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
    }

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

    /**
     * @method "jQuery.addthis"
     * @access public
     * @description
     * Creates and returns an object that can be used to create AddThis tools
     * or change settings for AddThis tools already on the page.
     */
    $[pluginName] = function() {
        return new plugin(this);
    };

    $.fn[pluginName] = function() {
        return new plugin(this);
    };

})(jQuery, window, document);

/**
 * The jQuery plugin namespace.
 * @external jQuery
 * @access public
 * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
 */