const timers = require("../../controllers/timerController.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

// Create a new Timers
router.post('/timers', timers.create);

// Retrieve all Timers
router.get('/timers', timers.findAll);

// Retrieve a single Timer with timerId
router.get('/timers/:timerId', timers.findOne);

// Update a Timer with timerId
router.put('/timers/:timerId', timers.update);

// Delete a Timer with timerId
router.delete('/timers/:timerId', timers.delete);
module.exports = router;