const healthController = require("../../controllers/health_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

router.get("/health", healthController.health);

module.exports = router;
