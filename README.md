# [![jquery-addthis](http://cache.addthiscdn.com/www/160830bfaefda/style/images/wrapper/addthis-logo.svg)](https://www.addthis.com) jquery-addthis
> Add free and Pro AddThis tools with dynamic jQuery sites. This jQuery plugin is smart about reacting when you add new DOM elements onto the page and helps you add AddThis tools onto page after the page has loaded. Requires a free [AddThis account](https://www.addthis.com/register).


## Installation

### NPM

Add it to the project

```
npm install --save jquery-addthis
```

### Bower

Add it to the project

```
bower install --save jquery-addthis
```

### Setup

Include the file in HTML after jQuery and before any code where you use `$.addthis()`.

```html
<script src="path/to/jquery-addthis/dist/jquery-addthis.js"></script>
```

#### Set a Profile ID

Include `addthis_widget.js` in HTML with an AddThis profile ID. Replace `YOUR_PROFILE_ID` below with a profile ID. This can be added anywhere on your page.

```html
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=YOUR_PROFILE_ID"></script>
```

Get a profile ID with a free [AddThis account](https://www.addthis.com/register).

## Usage

### Basic
```js
$.addthis().tool({tool: 'addthis_sharing_toolbox'})
    .appendTo('.my-div-where-i-want-addthis-tools');
```

Replace `addthis_sharing_toolbox` with the name for the AddThis inline tool desired.

### Specify a URL or title other than the current page's

#### Individually Per Tool
```js
var toolConfigs = {
    tool: 'addthis_sharing_toolbox',
    url: 'http://example.com',
    title: 'Check this out:'
};

$.addthis().tool({tool: 'addthis_sharing_toolbox'})
    .appendTo('.my-div-where-i-want-addthis-tools');
```

Replace `addthis_sharing_toolbox` with the name for the AddThis inline share tool desired.

Replace `http://example.com` with the URL to share when a visitor clicks on one of the sharing buttons, or, alternately, leave the `url` property out completely.

Replace `Check this out:` with the title to share when a visitor clicks on one of the sharing buttons, or, alternately, leave the `title` property out completely.

Note: Some services (such as Facebook) do not allow you to define the share title for a URL. Facebook will always use the Open Graph tags it finds on the page when it crawls it. You can use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test your Open Graph tags.

#### For Every Tool

```js
$.addthis().shareUrl('http://example.com');
$.addthis().shareTitle('Check this out:');
```

or

```js
var shareConfigs = {
    url: 'http://example.com',
    title: 'Check this out:'
};
$.addthis().share(shareConfigs);
```

Replace `http://example.com` with the URL to share when a visitor clicks on one of the sharing buttons.

Replace `Check this out:` with the title to share when a visitor clicks on one of the sharing buttons.

This will not override the share URL or title for tools created using the `url` and `title` property.

## More Resources

 - [More documention](http://s7.addthis.com/icons/jquery-addthis/current/docs)
 - [Example site code](http://www.github.com/oracle/jquery-addthis/examples/)
 - [register for an AddThis account](https://www.addthis.com/register)
 - [addthis_config documentation](https://www.addthis.com/academy/the-addthis_config-variable/)
 - [addthis_share documentation](https://www.addthis.com/academy/the-addthis_share-variable/)