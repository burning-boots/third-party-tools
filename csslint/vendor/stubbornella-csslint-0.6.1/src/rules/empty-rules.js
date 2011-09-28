/*
 * Rule: Style rules without any properties defined should be removed.
 */
CSSLint.addRule({

    //rule information
    id: "empty-rules",
    name: "Empty Rules",
    desc: "Rules without any properties specified should be removed.",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            count = 0;

        parser.addListener("startrule", function(){
            count=0;
        });

        parser.addListener("property", function(){
            count++;
        });

        parser.addListener("endrule", function(event){
            var selectors = event.selectors;
            if (count == 0){
                reporter.warn("Rule is empty.", selectors[0].line, selectors[0].col, rule);
            }
        });
    }

});