// the selector for picking out the the div we'll put AddThis tools into
var toolDivSelector = '.my-div-where-i-want-addthis-tools';
// initial url shared with share buttons
var initialUrl = 'https://www.addthis.com';
// alternate url shared with share buttons
var alternateUrl = 'https://www.google.com';

// variable for tracking last used share url
var currentUrl;

// configuration for AddThis tool
var addthisToolConfig1 = {
    tool: 'addthis_inline_share_toolbox_ipi2',
};

// create element for AddThis tool
var tool = $.addthis().tool(addthisToolConfig1);
// append element for AddThis tool onto the desired div
tool.appendTo(toolDivSelector);

// function to change the default share URL used on AddThis tools
function switchUrl() {
    if (currentUrl === initialUrl) {
        // if the last url is the initial url
        // change the default share url to the alternate url
        $.addthis().shareUrl(alternateUrl);
        // track last used share url
        currentUrl = alternateUrl;
    } else {
        // else the last url is the alternate url
        // change the default share url to the initial url
        $.addthis().shareUrl(initialUrl);
        // track last used share url
        currentUrl = initialUrl;
    }

    // update the pre element with the current share url
    document.getElementById('shareUrl').innerText = currentUrl;
}

// bootstrap by setting the initial share url
switchUrl();
// call switchUrl function whenever someone clicks on the button
$('button#changeUrl').click(switchUrl);