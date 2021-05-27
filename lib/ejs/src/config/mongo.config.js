import mongodbconfig from "../private/mongodb.private.json";
//Config of mongobd vatiables
let user = mongodbconfig.user;
let password = mongodbconfig.password;
const mongodb = {
  database: {
    databaseName: "UserRegister",
    local_url: "mongodb://localhost:27017",
    web: `mongodb+srv://${user}:${password}@cluster0-x3ldm.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  },
};

module.exports = mongodb;
