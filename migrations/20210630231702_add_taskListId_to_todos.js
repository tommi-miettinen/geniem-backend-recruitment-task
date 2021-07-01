const { tables } = require("../constants");

exports.up = function (knex) {
  return knex.schema.table(tables.TODO_TABLE, (table) => {
    table
      .integer("todoListId")
      .unsigned()
      .references("id")
      .inTable(tables.TODO_LIST_TABLE)
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table(tables.TODO_TABLE, (table) => {
    table.dropColumn("todoListId");
  });
};
