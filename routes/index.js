var express = require('express');
var router = express.Router();

var userRouter = require('./users');
//var authRouter = require('./auth');

/*
 *  Routes that anyone can access
 */
//router.post('/login', auth.login);


/* User routes */
router.get('/api/v1/users', userRouter.getAll);
router.get('/api/v1/logout', userRouter.signOut)
router.post('/api/v1/login', userRouter.signIn);
router.post('api/v1/register', userRouter.signUp);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
