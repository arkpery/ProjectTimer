
const timers = require("../../controllers/timer-controller.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');

// Create a new Timer
router.post('/timers', jwtMiddleware.verify_token, timers.setTimer);

// Get Timer by Project 
router.get('/timers/project/:timerId', jwtMiddleware.verify_token, timers.getTimerByProject);

// Get timer by User
router.get('/timers/user/:timerId', jwtMiddleware.verify_token, timers.getTimerByUser);

// Update a Timer by Id
router.put('/timers/:timerId', jwtMiddleware.verify_token, timers.updateTimer);

// Delete a Timer by timerId
router.delete('/timers/:timerId', jwtMiddleware.verify_token, timers.deleteTimer);

module.exports = router;