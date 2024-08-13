'use strict'
const knexConfig = require('../knexfile')
const knex = require('knex')(knexConfig)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (next) {
  await knex.schema.table('characters', (table) => {
    table.integer('hitPoints').notNullable().defaultTo(10)
    table.integer('maxHitPoints').notNullable().defaultTo(10)
    table.integer('tempHitPoints').notNullable().defaultTo(0)
  })
  next()
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (next) {
  await knex.schema.table('characters', (table) => {
    table.dropColumn('hitPoints')
    table.dropColumn('maxHitPoints')
    table.dropColumn('tempHitPoints')
  })
  next()
}
