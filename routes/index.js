var express = require('express');
var router = express.Router();

var userRouter = require('./userController');
var authenticate = require('./auth');

/*
 * Base api route 
 */
//router.route('/api/v1/*').all(authenticate.verifyOrdinaryUser);

/*
 * User Routes
 */
router.get('/api/v1/users', authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, userRouter.getAll);
router.get('/api/v1/users/:userID', authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, userRouter.getUser);

router.get('/api/v1/logout', userRouter.signOut);
router.post('/api/v1/login', userRouter.signIn);
router.post('/api/v1/register', userRouter.signUp);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;