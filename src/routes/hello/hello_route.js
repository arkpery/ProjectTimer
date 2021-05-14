const helloController = require("../../controllers/hello_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

router.get("/hello", helloController.hello);

module.exports = router;
