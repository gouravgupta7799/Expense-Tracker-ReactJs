const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({

  description: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  }
})

module.exports = mongoose.model('Expense', expenseSchema);
