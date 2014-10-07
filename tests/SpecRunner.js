define([
  "mocha",
  "chai",
  "jquery"
], function(mocha) {

  mocha.setup("bdd");

  require([
    "test/model.js",
    "test/collection.js"
  ], mocha.run); 
});
