// the selector for picking out the the div we'll put AddThis tools into
var toolDivSelector = '.my-div-where-i-want-addthis-tools';
// initial url shared with share buttons
var initialUrl = 'https://www.addthis.com';
// alternate url shared with share buttons
var alternateUrl = 'https://www.google.com';

// initial configuration for AddThis tool
var addthisToolConfig1 = {
    tool: 'addthis_inline_share_toolbox_ipi2',
    url: initialUrl
};

// variable for tracking last used share url, set to match initial tool configuration
var currentToolUrl = addthisToolConfig1.url;
// update the pre element with the current share url
document.getElementById('shareUrl').innerText = currentToolUrl;

// create element for AddThis tool
var tool = $.addthis().tool(addthisToolConfig1);
// append element for AddThis tool onto the desired div
tool.appendTo(toolDivSelector);

// function to change the share URL on the AddThis tool in the tool variable
function switchUrl() {
    if (currentToolUrl === alternateUrl) {
        // if the last url is the initial url
        // change the tool saved in the tool variable to use the alternate url
        tool.shareUrl(initialUrl);
        // track last used share url
        currentToolUrl = initialUrl;
    } else {
        // else the last url is the alternate url
        // change the tool saved in the tool variable to use the initial url
        tool.shareUrl(alternateUrl);
        // track last used share url
        currentToolUrl = alternateUrl;
    }

    // update the pre element with the current share url
    document.getElementById('shareUrl').innerText = currentToolUrl;
}

// call switchUrl function whenever someone clicks on the button
$('button#changeUrl').click(switchUrl);