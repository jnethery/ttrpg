'use strict'
const knexConfig = require('../knexfile')
const knex = require('knex')(knexConfig)

module.exports.up = async function (next) {
  const exists = await knex.schema.hasTable('characters')
  if (!exists) {
    await knex.schema.createTable('characters', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.integer('level').notNullable().defaultTo(1)
      table.string('race').notNullable().defaultTo('human')
      table.jsonb('baseAbilityScores').notNullable().defaultTo('{}')
    })
  }
  next()
}

module.exports.down = async function (next) {
  const exists = await knex.schema.hasTable('characters')
  if (exists) {
    await knex.schema.dropTable('characters')
  }
  next()
}
