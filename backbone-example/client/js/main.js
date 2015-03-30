require.config({
  'paths': {
    'jquery': 'libs/jquery/dist/jquery',
    'underscore': 'libs/underscore/underscore',
    'backbone': 'libs/backbone/backbone',
    'text': 'libs/requirejs-text/text',
    'jquery.cookie': 'libs/jquery.cookie/jquery.cookie',
  },

  shims: {
    'jquery.cookie': {
      'deps': ['jquery']
    }
  }
});

require(['app'], function(App) {
  App.initialize();
});
