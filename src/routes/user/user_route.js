const userController = require("../../controllers/user_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');

// Register User
router.post("/users", userController.userRegister);

// Login User
router.post("/users/login", userController.userLogin);

// Get all users
router.get("/users", jwtMiddleware.verify_token, userController.listAllUsers);

// Get user by Id
router.get("/users/:id", jwtMiddleware.verify_token, userController.getUserById);

// Update User by Id
router.put("/users/:id", jwtMiddleware.verify_token, userController.updateUserById);

// Delete user by Id
router.delete("/users/:id", jwtMiddleware.verify_token, userController.deleteUserById);


module.exports = router;
