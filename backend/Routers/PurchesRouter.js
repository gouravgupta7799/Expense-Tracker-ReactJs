
const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Purches')
const middle = require('../MiddleWare/UserAuth');


router.post('/purches', middle.userAccess, controller.primeMembership);
router.post('/updatetransaction', middle.userAccess, controller.transactionUpdate);



module.exports = router;