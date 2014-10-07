requirejs.config({
  "baseUrl": ".",
  "paths": {
    "jquery": "libs/jquery/dist/jquery.min",
    "underscore": "libs/underscore/underscore",
    "backbone": "libs/backbone/backbone",
    "rivets": "libs/rivets/dist/rivets",
    "vetbone": "../dist/vetbone",
    "mocha": "libs/mocha/mocha",
    "chai": "libs/chai/chai"
  },
  "shim": {
    "backbone": {
      "deps": ["jquery", "underscore"],
      "exports": "Backbone"
    },
    "underscore": {
      "exports": "_"
    },
    "mocha": {
      "exports": "mocha"
    }
  },
  "urlArgs": 'bust=' + (new Date()).getTime()
});
