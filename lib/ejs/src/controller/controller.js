import data from "../common/config.rende.index"

//controllers
const indexCtrl = {};

//Here you place the functions that perform each request.
//To generate more order, different driver files can be set up.

indexCtrl.renderYuem = (req, res) => {
  //Get controller
  res.render("index", data)
};



//Exportar
module.exports = indexCtrl;
