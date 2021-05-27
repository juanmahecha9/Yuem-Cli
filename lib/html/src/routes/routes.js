//Configuration of routes into the project
import indexCtrl from "../controller/controller.js";

module.exports = (app) => {
  app.get("/", indexCtrl.renderYuem);
  app.get("/yuem", indexCtrl.response);
};
