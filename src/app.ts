require("dotenv").config();
const Knex = require("knex");

import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import routes from "./routes";
import { Model } from "objection";
import { errorHandler } from "./errorHandler";

// Initialize knex the SQL query builder.
const knexConfig = require("../knexfile");

export const knex = Knex(knexConfig.development);

// Create or migrate the database:
knex.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knex);

const app = express()
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(routes)
  .use(errorHandler)
  .set("json spaces", 2);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Todo app listening at port %s", port);
});
