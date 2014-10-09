var mini = require("../handlebars-min.js");

describe("handlebars template before-compilation minifier", function(){
    it("should remove all whitespace greater than one character long", function(){        
        
        var input = "1 2  3   4    5     6";
        expect( mini(input) ).toEqual("1 2 3 4 5 6");       

    });

    it("should not remove necessary white space from text", function(){
        var input = "<td> Heres   some  text</td>"; //3 spaces, then 2
        expect( mini(input) ).toEqual("<td>Heres some text</td>");
    });

    it("should trim whitespace before text between tags", function(){
        var input = "<div>  t  </div>";
        expect( mini(input) ).toEqual("<div>t</div>");

        input = "<span> Here's some text</span>";
        expect( mini(input) ).toEqual("<span>Here's some text</span>");

        input = "<span>Here's some text </span>";
        expect( mini(input) ).toEqual("<span>Here's some text</span>");
    }); 

    it("shouldn't destroy partials", function(){
        var input = "{{> a partial}}";
        expect( mini(input) ).toEqual(input);
    });

});