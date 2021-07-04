import { Model } from "objection";
import { tables } from "../../constants";

export default class User extends Model {
  static tableName = tables.USER_TABLE;

  readonly id!: number;
  username: string;
  password: string;
  name?: string;

  static jsonSchema = {
    type: "object",
    required: ["username"],

    properties: {
      id: { type: "integer" },
      username: { type: "string", minLength: 1, maxLength: 255 },
      name: { type: "string", minLength: 1, maxLength: 255 },
      password: { type: "string", minLength: 1, MaxLength: 255 },
    },
  };
}
