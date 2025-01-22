import knex from 'knex'
import knexConfig from '../knexfile'
import dotenv from 'dotenv'

dotenv.config()

export const db = knex(knexConfig[process.env.NODE_ENV || 'development'])