// require modules
const User = require('../models').User;
const authService = require('./../services/AuthService');

// Create
const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;
  if(!body.unique_key && !body.email && !body.phone) {
    return ReE(res, 'Please enter an email or phone number to register.');
  } else if(!body.password) {
    return ReE(res, 'Please enter a password to register.');
  } else {
    let err, user;
    [err, user] = await to(authService.createUser(body));
    if(err) {
      return ReE(res, err, 422);
    } return Res(res, {
      message: 'Successfully created new user',
      user: user.toWeb(), 
      token: user.getJWT()
    }, 201);
  }
}

module.exports.create = create;

// Get - Pretty basic speaks for itself
const get = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let user = req.user;

  return ReS(res, {
    user:user.toWeb()
  });
}

module.exports.get = get;

// Update - still basic
const update = async function(req, res) {
  let err, user, data
  user = req.user;
  data = req.body;
  user.set(data);

  [err, user] = await to(user.save());
  if(err) {
    if(err.message == 'Validation error') {
      err = 'The email address or phone number is already in use';
      return ReE(res, err);
    }
  }
}

// Remove
const remove = async function(req, res) {
  let user, err;
  user = req.user;

  [err, user] = await to(user.destroy());
  if(err) {
    return ReE(res, 'error occured trying to delete user');
  }
  return Res(res, {
      message: 'Deleted User'
  }, 204);
}

module.exports.remove = remove;

// Login
const login = async function(req, res) {
  const body = req.body;
  let err, user;

  [err, user] = await to(authService.authUser(req.body));
  if(err) {
    return ReE(res, err, 422);
  }
  return ReS(res, {
    token: user.getJWT(),
    user: user.toWeb()
  });
}

module.exports.login = login;
