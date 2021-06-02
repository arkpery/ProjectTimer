

const projects = require("../../controllers/project-controller.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');


// Create a new Project
router.post('/projects', jwtMiddleware.verify_token, projects.createProject);

// Get all Projects
router.get('/projects', jwtMiddleware.verify_token, projects.getAllProjects);

// Get a  Project by projectId
router.get('/projects/:projectId', jwtMiddleware.verify_token, projects.getProjectById);

// Update a Project by projectId
router.put('/projects/:projectId', jwtMiddleware.verify_token, projects.updateProject);

// Delete a Project by projectId
router.delete('/projects/:projectId', jwtMiddleware.verify_token, projects.deleteProject);

module.exports = router;