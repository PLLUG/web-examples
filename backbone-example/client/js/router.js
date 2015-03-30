define([
    'jquery', 
    'backbone',
    'views/index',
    'views/login',
    'jquery.cookie'
], function($, Backbone, IndexView, LoginView) {

  window.TOKEN_KEY = 'token';

  var AppRouter = Backbone.Router.extend({
    routes: {
      'login': 'login',
      'logout': 'logout',
      '': 'index'
    },

    login: function() {
      var loginView = new LoginView({el: $('#main')});
      loginView.render();
    },
  
    index: function() {
      var indexView = new IndexView({el: $('#main')}); 
    },

    logout: function() {
      $.removeCookie(window.TOKEN_KEY);
      Backbone.history.navigate('login', true);
    }
  });
  
  var initialize = function() {
    var router = new AppRouter();

    Backbone.history.on('route', function() {
      var isAuthenticated = $.cookie(window.TOKEN_KEY) === undefined ? false : true;
      if(!isAuthenticated) {
        Backbone.history.navigate('login', true);
      }
    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
