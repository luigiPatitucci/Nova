"use strict";
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const {User} = require ('../models/User')
const {Token} = require ('../models/token')
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const bcrypt = require('bcrypt');

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
			
	//SE VERIFICA SI YA EXISTE EL EMAIL
			const existe = await User.findOne({
				where: {email: data.email}})
			if(existe){
				throw new MoleculerError("Email en uso !", 422,"");
			}
	//ENCRIPTAR CONTRASEÑA
			data.password = bcrypt.hashSync(data.password, 11);
			
	//CREO EL USUARIO Y LO RETORNO 		
			const newModel = await User.create(data)

	//GENERAR PIN 
		Token.create({
			pin:Math.floor((Math.random() * 1000000)),
			userId:newModel.id
			})			
			return newModel	
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