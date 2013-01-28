// Plugins.
require("backbone.layoutmanager");
require("plugins/backbone.collectioncache");
require("vendor/bootstrap/js/bootstrap");

// Patch collection fetching to emit a `fetch` event.
Backbone.Collection.prototype.fetch = function() {
  var fetch = Backbone.Collection.prototype.fetch;

  return function() {
    this.trigger("fetch");

    return fetch.apply(this, arguments);
  };
}();

// Configure LayoutManager with Backbone Boilerplate defaults.
Backbone.Layout.configure({
  // Allow LayoutManager to augment Backbone.View.prototype.
  manage: true,

  prefix: "app/templates/",

  fetch: function(path) {
    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    // Concatenate the file extension.
    path = path + ".html";

    // If cached, use the compiled template.
    if (JST[path]) {
      return JST[path];
    }

    // Put fetch into `async-mode`.
    var done = this.async();

    // Seek out the template asynchronously.
    $.get(exports.root + path, function(contents) {
      done(_.template(contents));
    });
  }
});

// The root path to run the application through.
exports.root = "/";

// Mix Backbone.Events, modules, and layout management into the exports
// object.
_.extend(exports, {
  // Helper for using layouts.
  useLayout: function(name, options) {
    // Enable variable arity by allowing the first argument to be the options
    // object and omitting the name argument.
    if (_.isObject(name)) {
      options = name;
    }

    // Ensure options is an object.
    options = options || {};

    // If a name property was specified use that as the template.
    if (_.isString(name)) {
      options.template = name;
    }

    // Create a new Layout with options.
    var layout = new Backbone.Layout(_.extend({
      el: "main"
    }, options));

    // Cache the refererence.
    return this.layout = layout;
  }
}, Backbone.Events);
