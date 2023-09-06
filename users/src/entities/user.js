const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "text",
    },
  },
});
