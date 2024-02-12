const Sib = require('sib-api-v3-sdk');
const User = require('../Models/AuthanticationModel');
const ForgotPasswordRequest = require('../Models/ForgetPasswordModel');
const bcrypt = require('bcrypt');

exports.forgetPassword = async (req, res, next) => {

  let uniqueId = Math.random()
  let ForgotPassword = new ForgotPasswordRequest({
    id: uniqueId,
    isValid: true,
    userId: req.userId
  })
  await ForgotPassword.save()

  try {
    var defaultClient = Sib.ApiClient.instance;
    var apiK = defaultClient.authentications['api-key'];
    apiK.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
      email: 'demoUser0011@gmail.com'
    }
    const receivers = [
      {
        email: req.body.email
      }
    ]

    tranEmailApi
      .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'new mail sended',
        htmlcontent: `<p>To reset your password<a href="http://localhost:4000/password/resetPasswordlink/${uniqueId}" >click here</a></p>`
      })
      .then(d => {

        res.send(d)
      })

      .catch(err => {
        console.log('123ee..', err.body)
        res.status(500).json({ 'error': err.body })
      })

  }
  catch (err) {
    console.log('err>>>', err.body)
    res.status(500).json({ 'error': err })
  };
};


exports.getresetPassword = async (req, res, next) => {

  let Id = req.params.id
  let ForgetPass = await ForgotPasswordRequest.findOne({ id: Id });

  if (ForgetPass.isValid === false) {
    return res.status(404).send('<html><head></head><body><h1>request is not active</h1></body></html>')
  }
  else if (ForgetPass.isValid === true) {
    res.status(200).send(`
   <button><a href="http://localhost:3000/verifaction?id=${Id}">click here for reset your password</a></button>
    `)
  }
}

exports.postresetPassword = async (req, res, next) => {
  try {
    let password = req.body.passwordInput;
    let Id = req.userId._id
    let uuid = req.body.id

    let foundEmail = await User.findById(Id);
    if (!foundEmail) {
      return res.status(402).send('user email not found');
    }
    else {
      salt = 5
      bcrypt.hash(password, salt, async (err, hash) => {
        foundEmail.userPassword = hash
        foundEmail.save()
      })

      let ForgotPass = await ForgotPasswordRequest.findOne({ id: uuid })
      ForgotPass.isValid = false
      ForgotPass.save()
    }

    res.send('user password updated');
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}
