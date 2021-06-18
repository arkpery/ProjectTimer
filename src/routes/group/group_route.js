const groupController = require("../../controllers/group_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');
const isAdminOf = require("../../middleware/isAdminOf").isAdminOf;

// Get All Groups
router.get("/groups", jwtMiddleware.verify_token, groupController.getAllGroups);

// Get Group by Id
router.get("/groups/:groupId", jwtMiddleware.verify_token, groupController.getGroupById);

// List group by project
router.get("/groups/project/:projectId", jwtMiddleware.verify_token, groupController.listGroupByProject);

// Insert project in group
router.put("/groups/:groupId/project/:projectId", [jwtMiddleware.verify_token, isAdminOf("GROUP")], groupController.insertProject);

// Create Group
router.post("/groups", jwtMiddleware.verify_token, groupController.createGroup);

// Delete Group By Id
router.delete("/groups/:groupId", [jwtMiddleware.verify_token, isAdminOf("GROUP")], groupController.deleteGroupById);

// Update Group By Id
router.put("/groups/:groupId", [jwtMiddleware.verify_token, isAdminOf("GROUP")], groupController.updateGroupById);

module.exports = router;
