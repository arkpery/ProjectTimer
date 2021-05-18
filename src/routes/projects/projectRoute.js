

const projects = require("../../controllers/projectController.js");
const Context = require("../../services/context");
const { router, id } = Context.Pull();

// Create a new Project
router.post('/projects', projects.create);

// Retrieve all Projects
router.get('/projects', projects.findAll);

// Retrieve a single Project with projectId
router.get('/projects/:projectId', projects.findOne);

// Update a Project with projectId
router.put('/projects/:projectId', projects.update);

// Delete a Project with projectId
router.delete('/projects/:projectId', projects.delete);
module.exports = router;