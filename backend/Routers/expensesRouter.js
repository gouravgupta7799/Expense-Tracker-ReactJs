const express = require('express')
const router = express.Router()
const expenseController = require('../Controllers/Expenses');
const userAuth = require('../MiddleWare/UserAuth')

router.post('/expenseData', userAuth.userAccess, expenseController.postDataHandler);
router.get('/getexpenseData', userAuth.userAccess, expenseController.getDataHandler);
router.delete('/deleteexpenseData', userAuth.userAccess, expenseController.deleteDataHandler);
router.put('/updateexpenseData', userAuth.userAccess, expenseController.updateDataHandler);



module.exports = router;