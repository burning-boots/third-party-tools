/*
 * Rule: Don't use classes or IDs with elements (a.foo or a#foo).
 */
CSSLint.addRule({

    //rule information
    id: "overqualified-elements",
    name: "Overqualified Elements",
    desc: "Don't use classes or IDs with elements (a.foo or a#foo).",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            classes = {};
            
        parser.addListener("startrule", function(event){
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++){
                selector = selectors[i];

                for (j=0; j < selector.parts.length; j++){
                    part = selector.parts[j];
                    if (part instanceof parserlib.css.SelectorPart){
                        for (k=0; k < part.modifiers.length; k++){
                            modifier = part.modifiers[k];
                            if (part.elementName && modifier.type == "id"){
                                reporter.warn("Element (" + part + ") is overqualified, just use " + modifier + " without element name.", part.line, part.col, rule);
                            } else if (modifier.type == "class"){
                                
                                if (!classes[modifier]){
                                    classes[modifier] = [];
                                }
                                classes[modifier].push({ modifier: modifier, part: part });
                            }
                        }
                    }
                }
            }
        });
        
        parser.addListener("endstylesheet", function(){
        
            var prop;
            for (prop in classes){
                if (classes.hasOwnProperty(prop)){
                
                    //one use means that this is overqualified
                    if (classes[prop].length == 1 && classes[prop][0].part.elementName){
                        reporter.warn("Element (" + classes[prop][0].part + ") is overqualified, just use " + classes[prop][0].modifier + " without element name.", classes[prop][0].part.line, classes[prop][0].part.col, rule);
                    }
                }
            }        
        });
    }

});