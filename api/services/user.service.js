"use strict";
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const {User} = require ('../models/User')
const {Account} = require ('../models/Account')
const {Token} = require ('../models/token')
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const bcrypt = require('bcrypt');
const sendMail = require( '../helpers/email/sender' );

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "user",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
	},

	dependencies: [],

	actions: {

		list: {
			rest: {
				method: "GET",
				path: "/users"
			},
			async handler() {
				const data = await User.findAll()
				return data;
			}
		},
		listToken: {
			rest: {
				method: "GET",
				path: "/token"
			},
			async handler() {
				const data = await Token.findAll()
				return data;
			}
		},

	//REGISTRO DE USUARIO		
		newUser: {
 			rest: {
                method: "POST",
                path: "/",
            },

		async handler(ctx) {
			let data = ctx.params

			const existe = await User.findOne({
				$or: [
					{ username: data.username },
					{ email: data.email },
				],
			})
			console.log( " asdasdasda"+existe)
	//SE VERIFICA SI EL USUARIO SE ENCUENTRA EN USO
		if(existe && existe.username && existe.username === data.username) {
				throw new MoleculerError("Usuario en uso !", 422,"")}
				
	//SE VERIFICA SI EL EMAIL SE ENCUENTRA EN USO
		if(existe && existe.email && existe.email === data.email){
				throw new MoleculerError("Email en uso !", 422,"")}
				
	//ENCRIPTAR CONTRASEÑA
		data.password = bcrypt.hashSync("12345", 11);
			
	//CREO EL USUARIO Y LO RETORNO (el usuario todavia no esta dado de alta)	
		const newuser = await User.create(data)

	//GENERAR PIN PARA DAR ALTA DE CLIENTE 
		const newToken = await Token.create({
			pin:Math.floor((Math.random() * 1000000)),
			userId:newuser.id
			})
			
			/* 	ACA SE DEBERIA ENVIAR EL EMAIL CON EL TOKEN AL USUARIO 
			*/
			
		await sendMail( {
			to: data.email,
			subject: "[Henry Bank] Código de confirmación",
			template: "confirmation",
			input: {
				code: newToken.pin
			}
		} );
	},
	//BUSCAR USUARIO POR ID USUARIO
	userById: {
		rest: {
			method: "GET",
			path: "/user/:id"
		},
		async handler(ctx) {
		const {id} = ctx.params
		const data = await User.findByPk(id)

			return data;
			}
		},
	
	//ACTUALIZAR USUARIO	
	userUpdate: {
		rest: {
			method:"PUT",
			path:"/update"
		},
		
		async handler(ctx) {
			const data = ctx.params;

			const existe = await User.findOne({
				$or: [
					{ identityNumber: data.username },
				],
			})

			if(existe && existe.identityNumber && existe.identityNumber == data.identityNumber) {
				throw new MoleculerError("DNI duplicado !", 422,"")}
			
			data.password = bcrypt.hashSync("12345", 11);
			//GENERAMOS CODIGO DE CUENTA DE 10 DIGITOS
			function randomString(length, chars) {
				var result = '';
				for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
				return result;
			}
			var codigoCuenta = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
			//CREAMOS LA CUENTA VINCULADA AL USUARIO

			const cuenta = Account.create({
				code:codigoCuenta,
				userId:data.id
			}) 
		
		await User.update(
			data,
			{
			where:{
				id:data.id
				}
			}
		);
		const user = await User.findByPk(data.id)
		return user

		},
	},
	validarToken:{
		rest: {
			method:"POST",
			path:"/validartoken"
		},  
		async handler(ctx) {
			const {pin} = ctx.params 
			const existe = await Token.findOne({
				$or: [
					{ pin: pin},
				],
			})

			if(existe && existe.pin && existe.pin == data.pin) {
				throw new MoleculerError("PIN incorrecto !", 422,"")}

				return "email validado";
		}
	}
	}
},
	events: {
	},
	methods: {
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		User.hasOne(Token);
		User.hasOne(Account)
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
}
