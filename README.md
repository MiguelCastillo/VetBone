VetBone
=======

Rivets adapter for Backbone to enable bidirecitonal data binding in Backbone Views.


### Highlights

1. UMD compliant
2. Rivets integration with Backbone Collections
3. Rivets integration with Backbone Models

### Setup

The only thing that needs to happen is load VetBone once so that it can register itself with Rivets. And since VetBone depends on Rivets and Backbone, it needs to be loaded after Backbone and Rivets.

When loading VetBone as an AMD module, the module IDs it depends on are `backbone` and `rivets`. So you will need to make sure those modules are registered with those IDs.

### Rivets Adapter

In order to tell rivets about your Backbone Model and Collection properties, your data binding needs to use `:` as a property demiliter.  Which means that only properties that are delmited `:` can be considered as Backbone data.

For example, `<span rv-html="model:name"></span>` will enable rivets data binding of Backbone `model` property `name`.

* The default adapter for accessing properties with `.` continues to work and can also be mixed with `:`.

### Examples

This is a very simple example extracted from one of the unit tests

``` javascript
  // Sample jquery html.  Notice 'model:text'.  vetbone uses ':' to tell rivets that
  // vetbone will be processing the 'text' property in 'model'
  var $el = $("<div rv-html='model:text'></div>");

  // Backbone model
  var model = new Backbone.Model({"text": "hello world"});

  // Rivets bind jquery and backbone
  rivets.bind($el, {model: model});
```

What this will do is keep the DOM in sync with any changes to `model:text`.

### Gotchas

The only way to tell VetBone about Backbone Models and Collections is via the `:` delimiter.  And since Backbone Collection items are not accessible as properties, you need to somehow tell VetBone about it.  This is one way to address this issue

``` javascript
$el = $("<ul><li rv-each-item='collection:items'><span rv-html='item:name'></span></li></lu>");

collection = new Backbone.Collection([
  {name:"Ursula"},
  {name:"Farva"},
  {name:"Yes!!"}
]);

rivets.bind($el, {collection: collection});
```

Notice `collection:items`.  `items` isn't really a property in `collection`, but it's a way to sneak in the `:` and tell VetBone about the Backbone Collection.

This issue does not occur is the collection is a property in a model that's delimited with `:`.
