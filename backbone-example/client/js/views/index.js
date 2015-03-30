define([
  'jquery',
  'underscore',
  'backbone',
  'collections/books',
  'text!templates/index.html'
], function($, _, Backbone, Books, index) {

  var IndexView = Backbone.View.extend({

    collection: new Books(),

    initialize: function() {
      var self = this;
      this.collection.on('sync', function() {
        self.render(self.collection);
      });
      this.collection.fetch();
    },

    render: function(collection) {
      var template, toRender;
      template = _.template(index);
      toRender = template({
        books: collection.toJSON(),
        _:_
      });
      $(this.$el).html(toRender);
      return this;
    }
  });

  return IndexView;
})
