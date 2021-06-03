const groupController = require("../../controllers/group_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');

// Get All Groups
router.get("/groups", jwtMiddleware.verify_token, groupController.getAllGroups);

// Get Group by Id
router.get("/groups/:id", jwtMiddleware.verify_token, groupController.getGroupById);

// Create Group
router.post("/groups", jwtMiddleware.verify_token, groupController.createGroup);

// Delete Group By Id
router.delete("/groups/:id", jwtMiddleware.verify_token, groupController.deleteGroupById);

// Update Group By Id
router.put("/groups/:id", jwtMiddleware.verify_token, groupController.updateGroupById);

module.exports = router;
