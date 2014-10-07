define([
  "mocha",
  "chai",
  "jquery"
], function(mocha) {

  mocha.setup("bdd");

  require([
    "specs/object.js",
    "specs/array.js"
  ], mocha.run);
 
});