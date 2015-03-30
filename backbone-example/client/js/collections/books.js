define([
  'backbone'    
], function(Backbone) {
  var Books = Backbone.Collection.extend({
    url: 'http://localhost:1337/books'
  });

  return Books;
});
