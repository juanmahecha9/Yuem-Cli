import User from "../rules/encrypt.password";
import jwt from "jsonwebtoken";
import errors from "../../common/error/errors.register.database";
import s_key from "../../security/jwt.key.json";
const authFunctions = {};

//Creation of users
authFunctions.createUser = async (req, res) => {
  //create with mongo
  const { name, userName, email, password } = req.body;
  const data = new User({
    name,
    userName,
    email,
    password,
  });

  await data.save((err, newData) => {
    if (err) {
      res.status(500).send(errors.state500);
    } else {
      if (!newData) {
        res.status(200).send(errors.state400);
      } else {
        const token = jwt.sign({ _id: newData._id }, s_key.jwt.secret_key);
        res.status(200).send({
          status: "Nueva data",
          token: token,
          producto: newData,
          statusCode: 200,
        });
      }
    }
  });
};

//Show users
authFunctions.showData = (req, res) => {
  // View de users collection
  User.find((err, findedData) => {
    if (err) {
      res.status(500).send(errors.state500);
    } else {
      if (!findedData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: "Registros realizados",
          Data: findedData,
          statusCode: 200,
        });
      }
    }
  });
};

//Upgrade data users
authFunctions.upgradeData = (req, res) => {
  let Id = req.params.id;
  let newData = req.body; // in this case will can be the password
  User.findByIdAndUpdate(Id, newData, (err, upgradeData) => {
    if (err) {
      res.status(500).send(errors.state500);
    } else {
      if (!upgradeData) {
        res.status(200).send(errors.state500);
      } else {
        res.status(200).send({
          status: "Upgrade user!",
          data: newData,
          statusCode: 200,
        });
      }
    }
  });
};

//Delete Data by ID
delateData = (req, res) => {
  let dataId = req.params.id;
  User.findByIdAndDelete(dataId, (err, deleteData) => {
    if (err) {
      res.status(500).send(errors.state500);
    } else {
      if (!deleteData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: "Delete user!",
          Data: deleteData,
          statusCode: 200,
        });
      }
    }
  });
};

//Delete all users
authFunctions.dropAll = async (req, res) => {
  await User.remove((err, findedData) => {
    if (err) {
      res.status(500).send(errors.state500);
    } else {
      if (!findedData) {
        res.status(200).send(errors.state400);
      } else {
        res.status(200).send({
          status: "Data",
          Data: findedData,
          statusCode: 200,
        });
      }
    }
  });
};

//Login
authFunctions.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Not registered");

  if (user) {
    user.compararPassword(password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch == true) {
        const token = jwt.sign({ _id: user._id }, s_key.jwt.secret_key);
        const name = user.name;
        // localStorage.setItem("usuario", user.name);
        return res.status(200).send({
          value: "Valid Password",
          token: token,
          name: name,
          id: user._id,
        });
      }
      if (isMatch != true) return res.status(401).send("Invalid Password");
    });
  }
};

//verify Json Web Token
authFunctions.verifyToken = (req, res, next) => {
  //create the authentication header
  if (!req.headers.authorization) {
    return res.status(401).send("No autorizado");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).sen("Not authorized");
  }
  const data = jwt.verify(token, s_key.jwt.secret_key);
  req.userId = data._id;
  next();
};

module.exports = authFunctions;
