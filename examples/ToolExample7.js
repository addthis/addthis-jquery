// the selector for picking out the the div we'll put AddThis tools into
var toolDivSelector = '.my-div-where-i-want-addthis-tools';

// initial configuration for AddThis tool
var addthisToolConfig1 = {
    tool: 'addthis_relatedposts_inline',
};

// create element for AddThis tool
$.addthis().tool(addthisToolConfig1)
    // append element for AddThis tool onto the desired div
    .appendTo(toolDivSelector);