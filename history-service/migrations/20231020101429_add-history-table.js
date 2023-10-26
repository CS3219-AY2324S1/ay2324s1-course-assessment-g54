/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("history", function (table) {
    table.uuid("user_id").primary();
    table.text("name").notNullable();
    table.text("question_id").notNullable().unique();
    table.text("title").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("history");
}


