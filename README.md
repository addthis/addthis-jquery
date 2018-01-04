# [![addthis-jquery](http://cache.addthiscdn.com/www/160830bfaefda/style/images/wrapper/addthis-logo.svg)](https://www.addthis.com) addthis-jquery
> Grow your website with audience engagement tools trusted by over 15 million sites. The AddThis jQuery plugin is smart about reacting when you add new DOM elements onto the page and helps you add AddThis tools onto page after the page has loaded. This plugin requires a free [AddThis account](https://www.addthis.com/register).

The AddThis jQuery plugin helps you use AddThis tools on your dynamic jQuery websites. It has jQuery-specific functionality to:

- Create AddThis tools elements to add onto the page whenever desired
- Customize the share URL and title for specific AddThis tools as well as all AddThis tools
- Change the share URL and title on an AddThis tool at any time


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

When you create an account on addthis.com, we assign you a profile ID to provide analytics, configure settings, etc. To find your profile ID, log in to your addthis.com account, select the three dots in the top navigation, select "More," and identify your profile ID in the "General" section. Select an option below to set up your profile ID for the module.

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

#### Have questions or need a hand? Reach out to us at help@addthis.com or on Twitter at [@AddThisSupport](https://twitter.com/addthissupport).

## More Resources

 - [More documention](http://s7.addthis.com/icons/jquery-addthis/current/docs)
 - [Example site code](http://www.github.com/oracle/jquery-addthis/examples/)
 - [register for an AddThis account](https://www.addthis.com/register)
 - [addthis_config documentation](https://www.addthis.com/academy/the-addthis_config-variable/)
 - [addthis_share documentation](https://www.addthis.com/academy/the-addthis_share-variable/)
