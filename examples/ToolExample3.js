
// the selector for picking out the the div we'll put AddThis tools into
var toolDivSelector = '.my-div-where-i-want-addthis-tools';
// initial title shared with share buttons
var initialTitle = 'This link is awesome. Check it out!';
// alternate title shared with share buttons
var alternateTitle = 'This is a good read:';

// initial configuration for AddThis tool
var addthisToolConfig1 = {
    tool: 'addthis_inline_share_toolbox_ipi2',
    title: initialTitle
};

// variable for tracking last used share title
var currentToolTitle = addthisToolConfig1.title;
// update the pre element with the current share url
document.getElementById('shareTitle').innerText = currentToolTitle;

// create element for AddThis tool
var tool = $.addthis().tool(addthisToolConfig1);
// append element for AddThis tool onto the desired div
tool.appendTo(toolDivSelector);

// function to change the share title on the AddThis tool in the tool variable
function switchTitle() {
    if (currentToolTitle === alternateTitle) {
        // if the last title is the initial title
        // change the tool saved in the tool variable to use the alternate title
        tool.shareTitle(initialTitle);
        // track last used share title
        currentToolTitle = initialTitle;
    } else {
        // else the last title is the alternate title
        // change the tool saved in the tool variable to use the initial title
        tool.shareTitle(alternateTitle);
        // track last used share title
        currentToolTitle = alternateTitle;
    }

    // update the pre element with the current share title
    document.getElementById('shareTitle').innerText = currentToolTitle;
}

// call switchTitle function whenever someone clicks on the button
$('button#changeTitle').click(switchTitle);