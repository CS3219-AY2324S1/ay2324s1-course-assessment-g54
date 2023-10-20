/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    database: "users",
    user: "postgres",
    password: "postgres",
  },
  migrations: {
    tableName: "migrations",
  },
};
