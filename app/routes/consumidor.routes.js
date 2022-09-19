module.exports = app => {
  const consumidor = require("../controllers/consumidor.controller.js");
  var router = require("express").Router();
  
  // Create a new consumidor
  router.post("/", consumidor.create); // OK
  
  // Retrieve all consumidor
  router.get("/", consumidor.findAll); // OK
  
  // Retrieve a single consumidor with idConsumidor
  router.get("/:idConsumidor", consumidor.findOneById); // OK
  
  // Update a consumidor with idConsumidor
  router.put("/:idConsumidor", consumidor.update); // OK
  
  // Delete a consumidor with idConsumidor
  router.delete("/:idConsumidor", consumidor.delete); // ok
  
  // Delete all consumidor
  router.delete("/", consumidor.deleteAll); // ok
  
  app.use('/api/consumidor', router);
};
