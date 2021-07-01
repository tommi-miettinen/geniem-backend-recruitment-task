import { Model } from "objection";
import { tables } from "../../constants";

export default class TodoList extends Model {
  static tableName = tables.TODO_LIST_TABLE;

  readonly id!: number;
  userId: number;

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
    },
  };
}
