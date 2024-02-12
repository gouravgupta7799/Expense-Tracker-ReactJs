
const Expense = require('../Models/ExpensesModel')

exports.postDataHandler = async (req, res) => {

  try {
    const description = req.body.description;
    const amount = req.body.amount;
    const categ = req.body.category;

    const expenseItem = new Expense({
      description: description,
      amount: amount,
      category: categ,
      userId: req.userId._id
    })

    const data = await expenseItem.save()
    res.status(200).json({ data })
  }
  catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.getDataHandler = async (req, res) => {
  const activeUser = req.userId;
  try {
    const getUserExpenses = await Expense.find({ userId: activeUser._id })
    if (getUserExpenses) {
      res.status(200).json({ ...getUserExpenses, isPrime: activeUser.isPrime })
    }
    else {
      res.status(201).json({})
    }

  } catch (err) {
    res.status(500).json({ error: err })
  }
}


exports.deleteDataHandler = async (req, res) => {

  const expenseId = req.body.id;

  try {
    const deleted = await Expense.findByIdAndDelete(expenseId)

    if (deleted) {
      res.status(200).json({ msg: 'item deleted successfully' })
    } else {
      res.status(201).json({ msg: 'no item found' })
    }
  }
  catch (err) {
    res.status(500).json({ error: err })
  }

}

exports.updateDataHandler = async (req, res) => {

  try {
    const id = req.body.id
    const desc = req.body.description;
    const amount = req.body.amount;
    const categ = req.body.category;


    const expenseToUpdate = await Expense.findById(id)

    expenseToUpdate.description = desc;
    expenseToUpdate.amount = amount;
    expenseToUpdate.category = categ;

    const data = await expenseToUpdate.save()
    if (data) {
      res.status(200).json({ data })
    } else {
      throw new Error('something when wrong')
    }


  }
  catch (err) {
    res.status(500).json({ error: err })
  }
}