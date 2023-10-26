/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("history", function (table) {
    table.uuid("user_id").notNullable();
    table.integer("question_id").notNullable();
    table.datetime("attempt_datetime").notNullable().defaultTo(knex.fn.now());
    table.text("attempt").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("history");
}


