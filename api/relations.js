const {Account} = require('./models/Account')
const {Token} = require('./models/Token')
const {User} = require('./models/User')
const {Transaction} = require('./models/Transaction')

module.exports=()=>{
    
    User.hasOne(Token);
    User.hasOne(Account)
    Account.hasMany(Transaction,{foreignKey:'accountId'})
}