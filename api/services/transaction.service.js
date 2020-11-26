"use strict";
const relation = require ('../relations.js')
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const {Account} = require ('../models/Account.js')
const {Transaction} = require ('../models/Transaction.js')
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')
const moment = require("moment");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
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

		addPesos:{
			rest:{
				method:"POST",
				path:"/pesos"
			},
			async handler(ctx){
				const data = ctx.params
				const account = await Account.findByPk(data.id)

				account.balanceArs = account.balanceArs+data.pesos;
				account.balanceUsd = account.balanceUsd-data.dolares
				account.save()

				const transaction= await Transaction.create(
					{
						amount:data.pesos,
						currency:"ARS",
						transactionType:"conversionArs",
						balanceType:"positivo",
						description:"Cambio de dolares a pesos",
						accountId:data.id,
						refernece:await numReference()
					},
				)

				return transaction
			}
		},
		addDolar:{
			rest:{
				method:"POST",
				path:"/dolares"
			},
			async handler(ctx){
				const data = ctx.params
				const account = await Account.findByPk(data.id)

				account.balanceArs = account.balanceArs-data.pesos;
				account.balanceUsd = account.balanceUsd+data.dolares
				account.save()

				const transaction= await Transaction.create(
					{
						amount:data.pesos,
						currency:"USD",
						transactionType:"conversionUsd",
						balanceType:"negativo",
						description:"Cambio de pesos a dolares",
						accountId:data.id,
						refernece:await numReference()
					},
				)

				return transaction
			}
		},
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
						balanceType:"negativo",
						description:description,
						accountId:id,
						refernece:await numReference()
					},
				)
				 const transaction2= await Transaction.create(
					{
						amount:amount,
						currency:"ARS",
						transactionType:"received",
						balanceType:"positivo",
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
				const fecha = data.fecha ? new Date(data.fecha) : Date()

               const transaction= await Transaction.create({
                    amount:amount,
                    currency:"ARS",
                    transactionType:"recharge",
					description:"recarga en efectivo",
					balanceType:"positivo",
					accountId:data.id,
					refernece: await numReference(),
					createdAt: fecha
			
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
					balanceType:"positivo",
					accountId:id,
					referece:numReference(),
					 
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
				const transaction = await Transaction.findAll({
					where:{
						accountId:id
					}
					
				})
				console.log(ctx.params)

				return transaction;
			}
		},
		
		rangoFecha:{
			rest:{
				method:"POST",
				path:"/getRangoFecha"
			},
			async handler(ctx){
				const data = ctx.params
				const fechaInicio = new Date(data.fechaInicio).getTime();
				const fechaFin 	=   new Date(data.fechaFin).getTime() 
				const transacciones = await Transaction.findAll({
					where:{
						accountId:data.id,
						createdAt: {
							[Op.between]: [fechaInicio, fechaFin],
						  },
					}
				})
				return transacciones
			}
		},
		getByDate:{
			rest:{
				method:"POST",
				path:"/getbydate/"
			},

			async handler(ctx){

				const data = ctx.params  
				const fechaInicio = Date.now() - data.dias*86400000;
				const fechaFin 	=  data.diafin ? data.diafin : Date.now()
				
				let transacciones = await Transaction.findAll(data.type?{
					where:{
						accountId:data.id,
						balanceType: data.type,
						createdAt: {
							[Op.gt]: fechaInicio
						  },
					}
				}:
				{
					where:{
						accountId:data.id,
						createdAt: {
							[Op.gt]: fechaInicio
						  },
					}
				})

 				const  sumarPeriodo =  (dias,per) => {
					var periodo={
						dates:[],
						amounts:[]
					} 
					let tiempo=86400000*per; 
					let diaAct = Date.now()
					let tiempo2 = dias*86400000
					let val = dias == 31 ? 31:13
					let diasfecha=[]
					for(let i=0;i<val ;i++){
						periodo.amounts.push(0)
						diasfecha.push((new Date((Date.now()-tiempo2)).toString())
						.split(" ")
						.slice(1,3)
						.join())
						tiempo2 = tiempo2 - tiempo
					}
					for(let j=0;j<transacciones.length;j++){
						let diasR = Date.parse(transacciones[j].createdAt)
						let pos = Math.floor(periodo.amounts.length - ((diaAct - diasR)/tiempo))
						if(!data.type){
							periodo.dates[pos] = diasfecha[pos]
							if(transacciones[j].transactionType == "recharge" ||transacciones[j].transactionType == "received" || transacciones[j].transactionType =="conversionArs"){
								periodo.amounts[pos] = periodo.amounts[pos] + transacciones[j].amount
							}else{
								periodo.amounts[pos] + transacciones[j].amount
							} 
							if(data.type){
							periodo.dates[pos] = diasfecha[pos]
							periodo.amounts[pos] = periodo.amounts[pos] + transacciones[j].amount
							}
						}
					}
			 		/*  periodo.dates = periodo.dates.filter(fechas=> fechas !== null)
					periodo.amounts = periodo.amounts.filter(fechas=> fechas !== 0) */  
					
					return {periodo}
					
				}  
		      	if(data.dias == 90) return sumarPeriodo(90,7)
				if(data.dias == 182) return sumarPeriodo(182,30)
				if(data.dias == 30) return sumarPeriodo(30,1)
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