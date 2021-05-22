const userController = require("../../controllers/user_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

router.get("/user", userController.list);
router.get("/user/:id", userController.read);
router.post("/user", userController.insert);
router.delete("/user/:id", userController.delete);
router.put("/user", userController.update);
router.post("/user/login", userController.login);

module.exports = router;
