const router = express.Router();

const Index = require('../controller/index')

const index = new Index()
router.get('/', index.index)

module.exports = router