const { tables } = require("../constants");

exports.up = function (knex) {
  return knex.schema.createTable(tables.TODO_LIST_TABLE, (table) => {
    table.increments("id").primary();
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tables.TODO_LIST_TABLE);
};
