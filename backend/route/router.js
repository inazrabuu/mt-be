const router = express.Router();

const Index = require('../controller/index')

const index = new Index()
router.get('/', index.index)
router.post('/get_snap', index.getSnap)
router.post('/post_payment_handler', index.postPaymentHandler)
router.post('/save_card', index.saveCard)
router.get('/get_user_token/:user_id', index.getUserToken)
router.get('/get_midtrans_config', index.getMidtransConfig)
router.get('/freezy_callback', index.testFreezyCallback)

module.exports = router