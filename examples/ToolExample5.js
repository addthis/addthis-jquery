// the selector for picking out the the div we'll put AddThis tools into
var toolDivSelector = '.my-div-where-i-want-addthis-tools';
// initial title shared with share buttons
var initialTitle = 'This link is awesome. Check it out!';
// alternate title shared with share buttons
var alternateTitle = 'This is a good read:';
// variable for tracking last used share title
var currentTitle;

// configuration for AddThis tool
var addthisToolConfig1 = {
    tool: 'addthis_inline_share_toolbox_ipi2',
};

// create element for AddThis tool
var tool = $.addthis().tool(addthisToolConfig1);
// append element for AddThis tool onto the desired div
tool.appendTo(toolDivSelector);

// function to change the default share title used on AddThis tools
function switchGlobalTitle() {
    if (currentTitle === alternateTitle) {
        // if the last title is the initial title
        // change the default share title to the alternate title
        $.addthis().shareTitle(initialTitle);
        // track last used share title
        currentTitle = initialTitle;
    } else {
        // else the last title is the alternate title
        // change the default share title to the initial title
        $.addthis().shareTitle(alternateTitle);
        // track last used share title
        currentTitle = alternateTitle;
    }

    // update the pre element with the current share title
    document.getElementById('shareTitle').innerText = currentTitle;
}

// bootstrap by setting the initial share title
switchGlobalTitle();
// call switchTitle function whenever someone clicks on the button
$('button#changeTitle').click(switchGlobalTitle);