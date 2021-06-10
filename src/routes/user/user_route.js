const userController = require("../../controllers/user_controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');

// Register User
router.post("/users", userController.userRegister);

// Login User
router.post("/users/login", userController.userLogin);

// Reset Password
router.post("/users/resetPassword", userController.resetPassword);

// New Password
router.post('/users/new-password', userController.NewPassword);

// Check  the token with user id
router.post('/users/valid-password-token', userController.ValidPasswordToken);

router.get("/users/me", jwtMiddleware.verify_token, userController.Me);

// Get all users
router.get("/users", jwtMiddleware.verify_token, userController.listAllUsers);

// Get user by Id
router.get("/users/:id", jwtMiddleware.verify_token, userController.getUserById);

// Update User by Id
router.put("/users/:id", jwtMiddleware.verify_token, userController.updateUserById);

// Delete user by Id
router.delete("/users/:id", jwtMiddleware.verify_token, userController.deleteUserById);

// Serve file
router.get("/:code", userController.serve);

// Logout User
router.post("/users/logout", jwtMiddleware.verify_token, userController.Logout);



module.exports = router;
