define([
  "chai",
  "backbone",
  "rivets",
  "vetbone"
], function(chai, Backbone, rivets) {

  describe("Array", function() {
    describe("binding", function() {
      it("model and jquery element", function() {

        var $el = $("<ul><li rv-each-item='model:all'><span rv-html='item:name'></span></li></lu>");
        var collection = new Backbone.Collection([
          {name:"Ursula"},
          {name:"Farva"},
          {name:"Yes!!"}
        ]);

        rivets.bind($el, {model: collection});

        chai.assert.equal($el.children().length, 3);
        chai.assert.equal($el.text(), "UrsulaFarvaYes!!");
      });
    });
  });

});
