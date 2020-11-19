"use strict";
const relation = require ('../relations.js')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const {Account} = require ('../models/Account.js')
const {Transaction} = require ('../models/Transaction.js')
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
//FUNCION PARA GENERAR CODIGO DE REFERENCIA
const numReference = async () =>{

    var numRef = Math.floor(Math.random() * 100000000)

    const existe = await Transaction.findOne({
        where:{refernece:numRef}
    })

    if(existe){
        return numReference();
    }
    return numRef
}


module.exports = {
	name: "transaction",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {	
    },
	
	actions: {
	// TRANSFERENCIA ENTRE CUENTAS
		transfer:{
			rest:{
				method:"POST",
				path:"/transfer"
			},
			async handler(ctx){
				const {id,toEmail,amount,description} = ctx.params
				const account = await Account.findByPk(id)
				const toUser = await User.findOne({
					where:{email:toEmail},
					include:Account
				})
				const toAccount = await Account.findByPk(toUser.account.id)
				//return toAccount;
				 if(account.balanceArs < amount){
					throw new MoleculerError("Dinero insuficiente!", 422,"")
				}
				console.log(toAccount)
				if( !toAccount || !toAccount.verified){
					throw new MoleculerError(
					"La Cuenta de destino no se encuentra Verificada o No existe", 
					422,"")
				}
				//ACTUALIZO BALANCE REMITENTE
				account.balanceArs = account.balanceArs-amount;
				account.save()
				//ACTUALIZO BALANCE DESTINATARIO
				toAccount.balanceArs = toAccount.balanceArs + amount
				toAccount.save()

				const transaction1= await Transaction.create(
					{
						amount:amount,
						currency:"ARS",
						transactionType:"transfer",
						description:description,
						accountId:id,
						refernece:await numReference()
					},
				)
				 const transaction2= await Transaction.create(
					{
						amount:amount,
						currency:"ARS",
						transactionType:"transfer",
						description:description,
						accountId:toAccount.id,
						refernece:await numReference()
					},
				) 
				return transaction1;
			}
			
		},
	//RECARGA EN EFECTIVO	
        recharge: {
			rest: {
				method: "POST",
				path: "/recharge"
			},
            async handler(ctx) {
				const data = ctx.params
				console.log(data)
				const amount = Math.floor(Math.random()  * 1000 + 50)

               const transaction= await Transaction.create({
                    amount:amount,
                    currency:"ARS",
                    transactionType:"recharge",
                    description:"recarga en efectivo",
					accountId:data.id,
					refernece: await numReference()
                })

                const account = await Account.findOne({
                    where: { id: data.id },
                });
            
                account.balanceArs = account.balanceArs + amount;
                await account.save(); 

                return transaction;   
            }
		},
		rechargeCard:{
		//RECARGA POR TARJETA
			rest:{
				method:"POST",
				path:"/recharge_card"
			},
			async handler(ctx){
				const {id,amount} = ctx.params
               const transaction= await Transaction.create({
                    amount:amount,
                    currency:"ARS",
                    transactionType:"recharge",
                    description:"recarga con tarjeta",
					accountId:id,
					referece:numReference()
                })

                const account = await Account.findOne({
                    where: { id: id },
                });
            
                account.balanceArs = account.balanceArs + amount;
                await account.save(); 

                return transaction;
			}
		},
		//OBTENER TRANSACCION POR ID DE CUENTA
		getTransaction_byIdAccount:{
			rest:{
				method:"GET",
				path:"/getTransaction/:id"
			},
			async handler(ctx){
				const {id} =ctx.params;
				const transaction = Transaction.findAll({
					where:{
						accountId:id
					}
				})
				return transaction;
			}
		}      
    },

	methods: {
        
    },

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		relation()
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};