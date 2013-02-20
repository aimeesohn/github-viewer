// FIXME Why does require break here?
// Set the require.js configuration for your application.
requirejs.config({
  paths: {
    // JavaScript folders.
    vendor: "../vendor",
    plugins: "../vendor/js/plugins",
  },

  shim: {
    // Backbone.CollectionCache depends on Backbone.
    "plugins/backbone.collectioncache": ["backbone"],

    // Twitter Bootstrap depends on jQuery.
    "vendor/bootstrap/js/bootstrap": ["jquery"]
  }
});

// Initialize the application with the main application file and the JamJS
// generated configuration file.
require(["../vendor/jam/require.config"], function() {

  // Kick off the application.
  require(["main"]);

});
