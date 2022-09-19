module.exports = app => {
  const usuarios = require("../controllers/usuario.controller.js");
  var router = require("express").Router();
  
  // Create a new usuario
  router.post("/", usuarios.create); // ok
  
  // Retrieve all usuarios
  router.get("/", usuarios.findAll); // ok
  
  // Retrieve a single usuario with email
  router.get("/:email", usuarios.findOne); // ok
  
  // Retrive a single usuario with id
  router.get("/id/:id", usuarios.findOneById); // ok
  
  // Retrive a single usuario with id
  router.get("/cadastro/:email/:cadastro", usuarios.findOneByEmailAndCadastro); // ok
  
  // Delete a usuario with email
  router.delete("/:email", usuarios.delete); // ok
  
  // Delete all usuarios
  router.delete("/", usuarios.deleteAll); // ok
  
  app.use('/api/usuario', router);
};