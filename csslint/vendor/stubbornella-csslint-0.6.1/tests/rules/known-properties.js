(function(){

    /*global YUITest, CSSLint*/
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Known Properties Errors",

        "Using an unknown property should result in an error": function(){
            var result = CSSLint.verify("h1 { foo: red;}", { "known-properties": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("error", result.messages[0].type);
            Assert.areEqual("Unknown property 'foo'.", result.messages[0].message);
        },

        "Using a known property should not result in a warning": function(){
            var result = CSSLint.verify("h1 { color: red;}", { "known-properties": 1 });
            Assert.areEqual(0, result.messages.length);
        },

        "Using a vendor-prefix property should not result in a warning": function(){
            var result = CSSLint.verify("h2 { -moz-border-radius: 5px; }", { "known-properties": 1 });
            Assert.areEqual(0, result.messages.length);        
        }

    }));

})();
