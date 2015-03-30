define([
  'underscore',
  'backbone',
  'text!templates/login.html',
  'jquery.cookie',
], function(_, Backbone, login) {
  var LoginView = Backbone.View.extend({

    events: {
      'click #sign-in': 'doLogin'
    },

    render: function() {
      var template = _.template(login);
      this.$el.html(template);
    },

    loginSuccess: function(data) {
      $.cookie(window.TOKEN_KEY, data.token);
      Backbone.history.navigate('', true);
    },

    loginError: function(error) {
      alert(error.responseJSON.message);
    },

    doLogin: function() {
      var username = $('#username').val();
      var password = $('#password').val();

      if(username.length > 0 && password.length > 0) {
        $.ajax({
          url: 'http://localhost:1337/login',
          data: {
            username: username,
            password: password
          },
          success: this.loginSuccess,
          error: this.loginError
        });
      }
    }
  });

  return LoginView;
});
