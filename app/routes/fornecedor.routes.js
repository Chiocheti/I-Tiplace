module.exports = app => {
  const fornecedor = require("../controllers/fornecedor.controller.js");
  var router = require("express").Router();
  
  // Create a new fornecedor
  router.post("/", fornecedor.create); // OK
  
  // Retrieve all fornecedores
  router.get("/", fornecedor.findAll); // OK
  
  // Retrieve a single fornecedor with id
  router.get("/:idFornecedor", fornecedor.findOneById); // OK
  
  // Update a fornecedor with id
  router.put("/:idFornecedor", fornecedor.update); // OK
  
  // Delete a fornecedor with id
  router.delete("/:idFornecedor", fornecedor.delete); // OK
  
  // Delete all fornecedores
  router.delete("/", fornecedor.deleteAll); // OK
  
  app.use('/api/fornecedor', router);
};