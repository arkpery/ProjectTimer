const lang = require("../../controllers/lang-controller");
const Context = require("../../services/context");
const { router, id } = Context.Pull();
const jwtMiddleware = require('../../middleware/jwtMiddleware');

router.get("/lang/:lang", lang.setLang);

module.exports = router;
