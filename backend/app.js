const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const AuthanticationRout = require('./Routers/AuthanticationRouter.js');
const expensesRout = require('./Routers/expensesRouter.js');
const profileRout = require('./Routers/ProfileRouter.js');
const forgetPasswordRout = require('./Routers/ForgetPasswordRouter.js')
const primeUserRout = require('./Routers/PurchesRouter.js')


const app = express();
app.use(cors());
app.use(bodyperser.json({ extended: false }));


app.use('/auth', AuthanticationRout);
app.use('/expensetracker', expensesRout);
app.use('/profile', profileRout)
app.use('/password', forgetPasswordRout);
app.use('/prime', primeUserRout);



// mongoose.connect(`mongodb+srv://gouravgupta7799:${process.env.mongoPassword}@cluster0.le9nhzq.mongodb.net/expense-tracker?retryWrites=true&w=majority`)
//   .then(result => {
//     app.listen(process.env.PORT)
//   })

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to DB"))
  .catch(err => console.error(err.message))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`server is running on PORT ${port}`))