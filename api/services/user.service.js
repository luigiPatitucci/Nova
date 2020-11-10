"use strict";
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const dbConfig = require ('../dbConfig');
const model = require ('../models/User')
const { MoleculerError } = require("moleculer").Errors;
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "user",
	adapter: new SequelizeAdapter(dbConfig.db),
	model:  model.user.sync(),
	
	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 */
		list: {
			rest: {
				method: "GET",
				path: "/users"
			},
			async handler() {
				const data = await model.user.findAll()
				return data;
			}
		},

		/**
		 *
		 * 
		 */
		newUser: {
			rest: {
                method: "POST",
                path: "/",
            },
			params: {
				email: "string",
				password:"string",
				name: "string",
				surname:"string",
/* 				birthday:"string",
				identityType:"string",
				identityNumber:"string",
				phone_number:"string",
				address_street:"string",
				adress_number:"number|integer|positive",
				locality:"string",
				province:"string,
				country:"string"
				avatar:"string", */	
			},
			
			handler(ctx) {
				let data = ctx.params
				const newUser = model.user.create({
					email:data.email,
					password:data.password,
					name:data.name,
					surname:data.surname,
					birthday:data.birthday,
					identityType:data.identityType,
					identityNumber:data.identityNumber,
					phone_number:data.phone_number,
					address_street:data.address_street,
					adress_number:data.adress_number,
					locality:data.locality,
					province:data.province,
					country:data.country,
					avatar:data.avatar
				})
				return "usuario registrado" 
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
	
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