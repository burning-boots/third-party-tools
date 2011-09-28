/*
 * Rule: Don't use IDs for selectors.
 */
CSSLint.addRule({

    //rule information
    id: "ids",
    name: "IDs",
    desc: "Selectors should not contain IDs.",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this;
        parser.addListener("startrule", function(event){
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                idCount,
                i, j, k;

            for (i=0; i < selectors.length; i++){
                selector = selectors[i];
                idCount = 0;

                for (j=0; j < selector.parts.length; j++){
                    part = selector.parts[j];
                    if (part instanceof parserlib.css.SelectorPart){
                        for (k=0; k < part.modifiers.length; k++){
                            modifier = part.modifiers[k];
                            if (modifier.type == "id"){
                                idCount++;
                            }
                        }
                    }
                }

                if (idCount == 1){
                    reporter.warn("Don't use IDs in selectors.", selector.line, selector.col, rule);
                } else if (idCount > 1){
                    reporter.warn(idCount + " IDs in the selector, really?", selector.line, selector.col, rule);
                }
            }

        });
    }

});