define(function(require, app) {

  // The root path to run the application through.
  app.root = "/";

  // External library dependencies.
  var _ = require("underscore");
  var Backbone = require("backbone");
  var $ = require("jquery");

  // Useful defaults for GitHub Viewer.
  _.extend(Backbone.Collection.prototype, {
    cache: true,

    initialize: function(models, options) {
      // Automatically extend in passed options.
      _.extend(this, options);

      // Listen for request and sync events to control the `isRequest` flag.
      this.on({
        request: function() {
          this.isRequest = true;
        },

        sync: function() {
          this.isRequest = false;
        }
      });

      // By default the collection is not in a request.
      this.isRequest = false;
    },

    parse: function(obj) {
      // Safety check ensuring only valid data is used.
      if (obj.data.message !== "Not Found") {
        return obj.data;
      }

      return this.models;
    }
  });

  // Configure LayoutManager with Backbone Boilerplate defaults.
  require("backbone.layoutmanager").configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    // Indicate where templates are stored.
    prefix: "app/templates/",

    // This custom fetch method will load pre-compiled templates or fetch them
    // remotely with AJAX.
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
      $.get(app.root + path, function(contents) {
        done(_.template(contents));
      }, "text");
    }
  });

});
