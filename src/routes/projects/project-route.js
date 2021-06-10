const projects = require("../../controllers/project-controller.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');
const isAdminOf = require("../../middleware/isAdminOf").isAdminOf;
const { isMemberOf } = require("../../middleware/isMemberOf.js");


// Create a new Project
router.post('/projects', jwtMiddleware.verify_token, projects.createProject);

// Get all Projects
router.get('/projects', jwtMiddleware.verify_token, projects.getAllProjects);

// Get a  Project by projectId
router.get('/projects/:projectId', [jwtMiddleware.verify_token, isMemberOf("PROJECT")], projects.getProjectById);

// Update a Project by projectId
router.put('/projects/:projectId', [jwtMiddleware.verify_token, isAdminOf("PROJECT")], projects.updateProject);

// Close project
router.put("/projects/:projectId/close", [jwtMiddleware.verify_token, isAdminOf("PROJECT")], projects.closeProject);

// Delete a Project by projectaId
router.delete('/projects/:projectId', [jwtMiddleware.verify_token, isAdminOf("PROJECT")], projects.deleteProject);

module.exports = router;