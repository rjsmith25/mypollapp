var router = require('express').Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret:process.env.JWT_SECRET,
	userProperty: 'payload'
})

var pollsCtrl = require('../controllers/polls');
var authCtrl = require('../controllers/authentication');

/*poll routes*/
router.get('/polls',pollsCtrl.getPolls);
router.get('/polls/:pollid',pollsCtrl.getOnePoll);
router.get('/polls/user/:userid',pollsCtrl.getPollsByUserId);
router.post('/polls',auth,pollsCtrl.createPoll);
router.delete('/polls/:pollid',auth,pollsCtrl.deletePoll);
router.post('/polls/:pollid/choices',auth,pollsCtrl.createPollChoice);
router.delete('/polls/:pollid/choices/:choiceid',auth,pollsCtrl.deletePollChoice);
router.put('/polls/:pollid/choices/:choiceid',pollsCtrl.updatePollVote);

/*authentication routes*/
router.post('/register',authCtrl.register);
router.post('/login',authCtrl.login);

module.exports = router;