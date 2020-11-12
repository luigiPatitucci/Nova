"use strict";
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')
const {Account} = require ('../models/User')

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "account",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
	},


	actions: {
        login: {
			rest: {
				method: "POST",
				path: "/account"
			},
            async handler(ctx){

                const {id} = ctx.params
            
                const user = await User.findOne({
                    where:{
                        id:id
                    },
                    include:Account
                })
            
                return user.accounts
            }      
        }
    },
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