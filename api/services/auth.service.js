"use strict";
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const model = require ('../models/User')
const jwt = require('jsonwebtoken');
const { MoleculerError } = require("moleculer").Errors;
const dbConfig = require ('../dbConfig');
const {User} = require ('../models/User')
const bcrypt = require('bcrypt');

const {CLAVE_TOKEN} = process.env;

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: "auth",
	adapter: new SequelizeAdapter(dbConfig.db),
	settings: {
		fields: [
            'id',
            'username',
            'email',
            'name',
            'lastname',
			'typeUser'
        ],
	},


	actions: {
        login: {
			rest: {
				method: "POST",
				path: "/login"
			},
            async handler(ctx) {
				const { email, password } = ctx.params;
                //CHECKEO EL EMAIL
                const logUser = await User.findOne({where: {email: email}});
				//CHECKEO CONTRASEÑA
				const checkPass = await bcrypt.compare(password , logUser.password);

                if(!logUser || !checkPass){
                    throw new MoleculerError('Email o contraseña invalido', 422)
                }

                const res = await jwt.sign({id: logUser.id},CLAVE_TOKEN,
					{expiresIn: "1d"});

                if(!res) {
                    throw new MoleculerError('algo malir sal',422)
				}
				
				console.log(jwt.verify(res, CLAVE_TOKEN))
                return res;

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