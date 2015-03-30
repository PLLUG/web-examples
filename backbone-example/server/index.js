var express = require('express'),
    crypto = require('crypto'),
    app = express();

var users = [
  {
    username: "admin",
    password: 'password'
  }
];

var Cache = {
  store: {},

  setCache: function(key, value) {
    this.store[key] = value;
    var  self = this;
    setTimeout(function() {
      self.delCahe(key);
    }, 5 * 60 * 1000);
  },

  delCahe: function(key) {
    if(this.store.hasOwnProperty(key)) {
      delete this.store[key];
    }
  }
};

var authenticate = function(username, password) {
  var usersLength = users.length;
  for(var i=0; i<usersLength; i++) { 
    if(users[i].username == username && users[i].password == password) {
      return users[i];
    }
  }
  return null;
};

var generateToken = function(username, password) {
  var hash = username + password + new Date().getTime();
  return crypto.createHash('sha256').update(hash).digest('base64');
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/login', function(req, res) {
  var username = req.query.username,
      password = req.query.password;

  user = authenticate(username, password);

  if(user !== null) {
    token = generateToken(username, password);
    Cache.setCache(token, user);
    res.json({
      'token': token
    });
  } else {
    res.json(400, {
      'message': 'Authentication failed!!!!'
    });
  }
});

var books = [
  {
    id: 1,
    title: 'Lord of the rings',
    image: 'http://google.com',
    author: 'R. R. Tolkien'
  },
  {
    id: 2,
    title: 'Night in Lisbon',
    image: 'http://google.com',
    author: 'E. M. Remark'
  }
];

app.get('/books', function(req, res) {
  res.json(books);
});

app.listen(1337, function() {
  console.log('server run on http://localhost:1337');
});
