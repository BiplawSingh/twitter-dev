import express from "express";
import { connect } from "./config/database.js";
import { PORT } from "./config/server-config.js"
import passport from "passport";
import { passportAuth } from "./config/jwt-middleware.js"

import apiRoutes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log("Server started");
  await connect();
});
