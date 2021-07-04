require("dotenv").config();

import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as knex from "knex";
import routes from "./routes";
import { Model } from "objection";
import { errorHandler } from "./errorHandler";

// Initialize knex the SQL query builder.
const knexConfig = require("../knexfile");

export const knexInstance = knex(knexConfig.development);

// Create or migrate the database:
knexInstance.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knexInstance);

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(routes)
  .use(errorHandler)
  .set("json spaces", 2);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Todo app listening at port %s", port);
});
