//Index file to the project
import consign from "consign";
import express from "express";
import path from "path";

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");

//Read files
consign({
  cwd: __dirname,
  locale: "en-us",
  logger: console,
  verbose: true,
})
  //include: take the main file for configuration
  .include()
  //then: load the files to use
  .then("lib/middlewares.js")
  .then("lib/boot.js")
  .then("routes")
  //into: start the aplication
  .into(app);
