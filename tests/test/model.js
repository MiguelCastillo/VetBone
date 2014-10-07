define([
  "chai",
  "backbone",
  "rivets",
  "vetbone"
], function(chai, Backbone, rivets) {

  describe("Backbone Model", function() {
    describe("binding", function() {
      it("model and jquery element", function() {

        // Sample jquery html.  Notice 'model:text'.  vetbone uses ':' to tell rivets that
        // vetbone will be processing the 'text' property in 'model'
        var $el = $("<div rv-html='model:text'></div>");
        
        // Backbone model
        var model = new Backbone.Model({"text": "hello world"});

        // Rivets bind jquery and backbone
        rivets.bind($el, {model: model});

        chai.assert.equal($el.html(), "hello world");
      });
    });
  });

});
