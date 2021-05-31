const router = express.Router();

const Index = require('../controller/index')

const index = new Index()
router.get('/', index.index)
router.post('/get_snap', index.getSnap)
router.post('/post_payment_handler', index.postPaymentHandler)

module.exports = router