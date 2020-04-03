const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gitManaSystem',{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
const db = mongoose.connection;

db.once('open',() => {
    console.log('数据库连接成功')
})

module.exports = db