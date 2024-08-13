'use strict'
const knexConfig = require('../knexfile')
const knex = require('knex')(knexConfig)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (next) {
  await knex.schema.table('characters', (table) => {
    table.dropColumn('baseAbilityScores')
    table.integer('strength').notNullable().defaultTo(10)
    table.integer('dexterity').notNullable().defaultTo(10)
    table.integer('constitution').notNullable().defaultTo(10)
    table.integer('intelligence').notNullable().defaultTo(10)
    table.integer('wisdom').notNullable().defaultTo(10)
    table.integer('charisma').notNullable().defaultTo(10)
  })
  next()
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (next) {
  await knex.schema.table('characters', (table) => {
    table.jsonb('baseAbilityScores').notNullable().defaultTo('{}')
    table.dropColumn('strength')
    table.dropColumn('dexterity')
    table.dropColumn('constitution')
    table.dropColumn('intelligence')
    table.dropColumn('wisdom')
    table.dropColumn('charisma')
  })
  next()
}
