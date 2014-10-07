(function (root, factory) {
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS support
    module.exports = factory(require("backbone"), require("rivets"));
  } else if (typeof define === "function" && define.amd) {
    // Do AMD support
    define(["backbone", "rivets"], factory);
  } else {
    // Do browser support
    root.vetbone = factory(root.Backbone, root.rivets);
  }
}(this, function(Backbone, rivets) {

return false ||  // This is to allow the return to properly execute the factory function
/////////////////////////////////////////////////////////////////////////////////////////////
