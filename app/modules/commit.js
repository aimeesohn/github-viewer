define(function(require, exports, module) {
  
  // Application.
  var app = require("app");

  exports.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        commit: {}
      };
    }
  });

  exports.Collection = Backbone.Collection.extend({
    model: exports.Model,

    cache: true,

    url: function() {
      return "https://api.github.com/repos/" + this.user + "/" + this.repo +
        "/commits?callback=?";
    },

    parse: function(obj) {
      // Safety check ensuring only valid data is used.
      if (obj.data.message !== "Not Found") {
        return obj.data;
      }

      return this.models;
    },

    initialize: function(models, options) {
      if (options) {
        this.user = options.user;
        this.repo = options.repo;
      }
    }
  });

  exports.Views = {
    Item: Backbone.View.extend({
      template: "commit/item",
      // Use the <TR> from the template.
      el: false,

      serialize: function() {
        return {
          model: this.model,
          repo: this.options.repo,
          user: this.options.user
        };
      }
    }),

    List: Backbone.View.extend({
      tagName: "table",
      className: "table table-striped",

      beforeRender: function() {
        this.$el.children().remove();

        this.options.commits.each(function(commit) {
          this.insertView(new exports.Views.Item({
            model: commit,
            repo: this.options.commits.repo,
            user: this.options.commits.user
          }));
        }, this);
      },

      initialize: function() {
        // Whenever the collection resets, re-render.
        this.listenTo(this.options.commits, "reset", this.render);

        // Show a spinner while fetching.
        this.listenTo(this.options.commits, "fetch", function() {
          this.$el.html("<img src='/app/img/spinner.gif'>");
        });
      }
    })
  };

});
