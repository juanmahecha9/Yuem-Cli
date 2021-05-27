import on_off from "../database/mongodb";
module.exports = (app) => {
  //Initialization of mongoDB
  on_off("OFF", 1);
  // 1 is to select the local db, and on is turn on the db

  app.listen(app.get("port"), () => {
    console.log("server running at http://localhost:" + app.get("port"));
  });
};
