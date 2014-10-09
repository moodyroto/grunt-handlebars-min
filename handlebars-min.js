//handlebars template minifier - minifies templates before they're compiled to 
//  reduce output file size by a tiny amount.
// known not to work for <pre> tags (as in, it disregards the pre) 
//and for quoted text (as in, it disregards the quotes.)
var min = function(input){
    "use strict";

    return input
        //get rid of duplicate whitespace
        .replace(/[\s][\s]*/gi, " ")

        //remove whitespace before the ">" of a tag
        .replace(/[\s]*>/gi, ">")

        //remove whitespace after the start of a tag
        .replace(/>[\s]*/gi, ">")

        //remove whitespace before the close of a tag
        .replace(/[\s]*</gi, "<")

        //the previous removal may have turned {{> partial}} into {{>partial}}
        // that's bad. undo it.
        .replace(/{{2}>/gi, "{{> ")

        //remove whitespace after the "<" of a tag
        .replace(/<[\s]/gi, "<");
};

exports = module.exports = min;