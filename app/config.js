// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    // Use the underscore build of Lo-Dash to minimize incompatibilities.
    "lodash": "../vendor/jam/lodash/lodash.underscore",

    // JavaScript folders.
    vendor: "../vendor",
    plugins: "../vendor/js/plugins",
  },

  map: {
    // Ensure Lo-Dash is used instead of underscore.
    "*": { "underscore": "lodash" }
  },

  shim: {
    // Backbone.CollectionCache depends on Backbone.
    "plugins/backbone.collectioncache": ["backbone"],

    // Twitter Bootstrap depends on jQuery.
    "vendor/bootstrap/js/bootstrap": ["jquery"]
  }
});
