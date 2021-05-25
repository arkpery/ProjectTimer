
const timers = require("../../controllers/timerController.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

// Create a new Timer
router.post('/timers', timers.createTimer);

// Get all Timers
router.get('/timers', timers.findAllTimers);

// Get timer by Id
router.get('/timers/:timerId', timers.findOneTimer);

// Update a Timer by Id
router.put('/timers/:timerId', timers.updateTimer);

// Delete a Timer with timerId
router.delete('/timers/:timerId', timers.deleteTimer);

module.exports = router;