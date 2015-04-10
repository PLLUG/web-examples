angular.module('MyApp', [])
  .factory('Posts', function() {
    var _posts = [
      {
        title: "First post",
        content: "First post content"
      },
      {
        title: "Second post",
        content: "Second post content"
      }
    ];

    return {
      all: function() {
        return _posts;
      },

      find: function(id)  {
        return _posts[id] || null;
      }
    }
  })
  .controller('MyController', ['$scope', 'Posts',  function($scope, Posts) {
       $scope.posts = Posts.all();

       $scope.currentPost = $scope.posts[0];

       $scope.changeCurrentPost = function(id) {
          $scope.currentPost = Posts.find(id);
       };
  }]);
