const auth = require('./auth')
const users = require('./users');
const posts = require('./posts');

module.exports = [].concat(auth, users, posts);