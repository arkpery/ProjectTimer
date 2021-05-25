

const projects = require("../../controllers/projectController.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

// Create a new Project
router.post('/projects', projects.createProject);

// Retrieve all Projects
router.get('/projects', projects.findAllProjects);

// Retrieve a single Project with projectId
router.get('/projects/:projectId', projects.findOneProject);

// Update a Project with projectId
router.put('/projects/:projectId', projects.updateProject);

// Delete a Project with projectId
router.delete('/projects/:projectId', projects.deleteProject);

module.exports = router;