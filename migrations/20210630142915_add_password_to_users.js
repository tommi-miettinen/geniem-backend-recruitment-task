const { tables } = require("../constants");

exports.up = function (knex) {
  return knex.schema.table(tables.USER_TABLE, (table) => {
    table.string("password");
  });
};

exports.down = function (knex) {
  return knex.schema.table(tables.USER_TABLE, (table) => {
    table.dropColumn("password");
  });
};
