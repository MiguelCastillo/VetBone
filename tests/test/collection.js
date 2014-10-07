define([
  "chai",
  "backbone",
  "rivets",
  "vetbone"
], function(chai, Backbone, rivets) {

  describe("Backbone Collections", function() {
    var $el, collection;

    beforeEach(function() {
      $el = $("<ul><li rv-each-item='collection:items'><span rv-html='item:name'></span></li></lu>");

      collection = new Backbone.Collection([
        {name:"Ursula"},
        {name:"Farva"},
        {name:"Yes!!"}
      ]);

      rivets.bind($el, {collection: collection});
    });

    describe("Read tests", function() {
      it("Simple model and jquery element", function() {
        chai.assert.equal($el.children().length, 3);
        chai.assert.equal($el.text(), "UrsulaFarvaYes!!");
      });
    });

    describe("Write tests", function() {
      it("Adding last item", function() {
        collection.push({name:"newguy"});
        chai.assert.equal($el.children().length, 4);
        chai.assert.equal($el.text(), "UrsulaFarvaYes!!newguy");
      });

      it("Removing first item", function() {
        collection.shift();
        chai.assert.equal($el.children().length, 2);
        chai.assert.equal($el.text(), "FarvaYes!!");
      });

      it("Removing last item", function() {
        collection.pop();
        chai.assert.equal($el.children().length, 2);
        chai.assert.equal($el.text(), "UrsulaFarva");
      });

      it("Adding new item in last position and removes first item", function() {
        collection.push({name:"newguy"});
        collection.shift();
        chai.assert.equal($el.children().length, 3);
        chai.assert.equal($el.text(), "FarvaYes!!newguy");
      });

      it("Adding new item in first position and removes last item", function() {
        collection.unshift({name:"newguy"});
        collection.pop();
        chai.assert.equal($el.children().length, 3);
        chai.assert.equal($el.text(), "newguyUrsulaFarva");
      });
    });

  });

});
