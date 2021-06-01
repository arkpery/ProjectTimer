const userController = require("../../controllers/user_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

// Register User
router.post("/users", userController.userRegister);

// Login User
router.post("/users/login", userController.userLogin);

// Get all users
router.get("/users", userController.listAllUsers);

// Get user by Id
router.get("/users/:id", userController.getUserById);

// Update User by Id
router.put("/users/:id", userController.updateUserById);

// Delete user by Id
router.delete("/users/:id", userController.deleteUserById);


module.exports = router;
