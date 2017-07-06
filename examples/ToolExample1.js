// the selector for picking out the the div we'll put AddThis tools into
var toolDivSelector = '.my-div-where-i-want-addthis-tools';

// configuration for tool 1
var addthisToolConfig1 = {
    tool: 'addthis_inline_share_toolbox_ipi2',
};

// configuration for tool 2
var addthisToolConfig2 = {
    tool: 'addthis_inline_share_toolbox',
};

// variable for tracking last used tool class
var currentToolClass;

// function for changing tool on page
function changeToolAction() {
    //console.log('changeToolAction start ', currentToolClass);
    // delete old tool
    $(toolDivSelector).empty();
    if (currentToolClass === addthisToolConfig2.tool) {
        // if tool 1 was on page last
        // put tool 2 on page
        $.addthis().tool(addthisToolConfig1)
            // append element for AddThis tool onto the desired div
            .appendTo(toolDivSelector);
        // track last used tool class
        currentToolClass = addthisToolConfig1.tool;
    } else {
        // if tool 2 was on page last
        // put tool 1 on page
        $.addthis().tool(addthisToolConfig2)
            // append element for AddThis tool onto the desired div
            .appendTo(toolDivSelector);
        // track last used tool class
        currentToolClass = addthisToolConfig2.tool;
    }

    // update the pre element with the current tool class
    document.getElementById('toolClass').innerText =  currentToolClass;
    //console.log('changeToolAction end ', currentToolClass);
}

// bootstrap by adding first tool onto page
changeToolAction();
// call changeTool function whenever someone clicks on the button
$('button#changeTool').click(changeToolAction);