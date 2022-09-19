module.exports = app => {
  const endereco = require("../controllers/endereco.controller.js");
  var router = require("express").Router();
  
  // Create a new endereco
  router.post("/", endereco.create); // ok
  
  // Retrieve all endereco
  router.get("/", endereco.findAll); // ok
  
  // Retrieve a single endereco with idEndereco
  router.get("/:idEndereco", endereco.findOneByIdEndereco); // ok
  
  // Retrieve a single endereco with idUsuario
  router.get("/usuario/:idUsuario", endereco.findAllByIdUsuario); // ok
  
  // Delete a endereco with idEndereco
  router.delete("/:idEndereco", endereco.deleteByEndereco); // ok
  
  // Delete a endereco with idUsuario
  router.delete("/usuario/:idUsuario", endereco.deleteByUsuario); // ok
  
  // Delete all endereco
  router.delete("/", endereco.deleteAll); // ok
  
  app.use('/api/endereco', router);
};