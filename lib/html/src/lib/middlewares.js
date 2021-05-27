import express from "express";
import morgan from "morgan";

module.exports = (app) => {
  //establecer
  app.set("port", process.env.PORT || 4000);
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));
};
