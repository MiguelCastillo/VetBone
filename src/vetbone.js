(function(Backbone, rivets) {
  "use strict";


  var primitiveTypes = {
    "undefined": true,
    "boolean": true,
    "number": true,
    "string": true
  };


  function getType(data) {
    if (data instanceof Array) {
      return "array";
    }

    var typeOf = typeof data;
    if (primitiveTypes.hasOwnProperty(typeOf)) {
      return "primitive";
    }
    else if (typeOf === "object") {
      return "object";
    }

    throw "Invalid data type";
  }


  function subscription(action, obj, keypath, callback, recurse) {
    if (obj instanceof Backbone.Collection) {
      obj[action]("add remove reset", callback);
    }
    else if (obj instanceof Backbone.Model) {
      obj[action]("change:" + keypath, callback);
    }
    else if (recurse !== false && keypath && obj.hasOwnProperty(keypath)) {
      subscription(action, obj[keypath], keypath, callback, false);
    }
  }


  function read(obj, keypath) {
    if (obj instanceof Backbone.Collection) {
      return obj.models;
    }
    else if (obj instanceof Backbone.Model) {
      return obj.get(keypath);
    }
    //
    // This conditional is to handle cases where JSON is directly accessed here instead
    // of through the standard '.' adapter.  Handling that here might make the markup a
    // bit cleaner and consistent
    //
    else if (keypath && obj.hasOwnProperty(keypath)) {
      //  Let's return the content of the collection so that it can be used directly
      // in iteration contructs such as rv-each-*
      if (obj[keypath] instanceof Backbone.Collection) {
        return obj[keypath].models;
      }

      // Otherwise just return the object and let rivets do the rest
      return obj[keypath];
    }
  }


  function write(obj, keypath, value, recurse) {
    //
    // Primitive values will get coerced to an object of the format { value : value };
    // This is to make it the HTML binding flow better with rivets binding.
    // Also, Backbone Collection are meant to be used as Collection of Models, not
    // Collections of primitives.
    //
    if (obj instanceof Backbone.Collection) {
      if (getType(value) === "primitive") {
        obj.add({value:value});
      }
      else {
        obj.add(value);
      }
    }
    else if (obj instanceof Backbone.Model) {
      obj.set(keypath, value);
    }
    //
    // This conditional is to handle cases where JSON is directly accessed here instead
    // of through the standard '.' adapter.  Handling that here might make the markup a
    // bit cleaner and consistent
    //
    else if (recurse !== false && keypath && obj.hasOwnProperty(keypath)) {
      write(obj[keypath], keypath, value, false);
    }
  }


  //
  // Adapter to interface with Backbone models and collections
  //
  rivets.adapters[":"] = {
    subscribe: function(obj, keypath, callback) {
      subscription("on", obj, keypath, callback);
    },
    unsubscribe: function(obj, keypath, callback) {
      subscription("off", obj, keypath, callback);
    },
    read: function(obj, keypath) {
      return read(obj, keypath);
    },
    publish: function(obj, keypath, value) {
      write(obj, keypath, value);
    }
  };

}.apply(this, [Backbone, rivets]));
