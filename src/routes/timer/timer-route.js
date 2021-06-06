const timers = require("../../controllers/timer-controller.js");
const Context = require("../../services/context");
const isMemberOf = require("../../middleware/isMemberOf").isMemberOfGroups;
const isAdminOf = require("../../middleware/isAdminOf").isAdminOf;
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');

// Create a new Timer
router.post('/timers', [jwtMiddleware.verify_token, isMemberOf("PROJECT")], timers.setTimer);

// Get Timer by Project 
router.get('/timers/project/:projectId', [jwtMiddleware.verify_token, isMemberOf("PROJECT")], timers.getTimerByProject);

// Get timer by User
router.get('/timers/user/:userId', [jwtMiddleware.verify_token, isMemberOf("USER")], timers.getTimerByUser);

// Update a Timer by Id
router.put('/timers/:timerId', [jwtMiddleware.verify_token, isAdminOf("TIMER")], timers.updateTimer);

// Delete a Timer by timerId
router.delete('/timers/:timerId', [jwtMiddleware.verify_token, isAdminOf("TIMER")], timers.deleteTimer);

// Start timer
router.post("/timers/:projectId/start", [jwtMiddleware.verify_token, isMemberOf("PROJECT")], timers.startTimer);

// Stop timer
router.put("/timers/:projectId/stop/:id", [jwtMiddleware.verify_token, isMemberOf("PROJECT")], timers.stopTimer);

module.exports = router;
