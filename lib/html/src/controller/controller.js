import data from "../common/config.rende.index"

//controllers
const indexCtrl = {};

//Here you place the functions that perform each request.
//To generate more order, different driver files can be set up.

indexCtrl.renderYuem = (req, res) => {
  //Get controller
  res.render("index")
};

indexCtrl.response = (req, res) =>{
  res.json(data)
}


//Exportar
module.exports = indexCtrl;
