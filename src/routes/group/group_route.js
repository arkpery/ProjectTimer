const groupController = require("../../controllers/group_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

router.get("/group", groupController.list);
router.get("/group/:id", groupController.read);
router.post("/group", groupController.insert);
router.delete("/group/:id", groupController.delete);
router.put("/group", groupController.update);

module.exports = router;
