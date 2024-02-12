
const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ForgetPassword')
const auth = require('../MiddleWare/UserAuth')

router.use('/forgotpassword', auth.userAccess, controller.forgetPassword);
router.get('/resetPasswordlink/:id', controller.getresetPassword);
router.post('/resetPassword', auth.userAccess, controller.postresetPassword);


module.exports = router;