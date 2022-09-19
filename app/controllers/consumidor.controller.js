const Consumidor = require("../models/consumidor.model.js");
// Create and Save a new Consumidor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Consumidor
  const consumidor = new Consumidor({
    idConsumidor: req.body.idConsumidor,
    nome: req.body.nome,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
  });
  // Save Consumidor in the database
  Consumidor.create(consumidor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Consumidor."
      });
    else res.send(data);
  });
};

// Retrieve all Consumidores from the database (with condition).
exports.findAll = (req, res) => {
  Consumidor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Consumidores."
      });
    else res.send(data);
  });
};

exports.findOneById = (req, res) => {
  Consumidor.findById(req.params.idConsumidor, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found consumidor with id ${req.params.idConsumidor}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving consumidor with idConsumidor " + req.params.idConsumidor
        });
      }
    } else res.send(data);
  });
};

// Update a Consumidor identified by the idConsumidor in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Consumidor.updateById(
    req.params.idConsumidor,
    new Consumidor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Consumidor with idConsumidor ${req.params.idConsumidor}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Consumidor with idConsumidor " + req.params.idConsumidor
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Consumidor with the specified idConsumidor in the request
exports.delete = (req, res) => {
  Consumidor.remove(req.params.idConsumidor, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consumidor with idConsumidor ${req.params.idConsumidor}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Consumidor with idConsumidor " + req.params.idConsumidor
        });
      }
    } else res.send({ message: `Consumidor was deleted successfully!` });
  });
};

// Delete all Consumidores from the database.
exports.deleteAll = (req, res) => {
  Consumidor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Consumidores."
      });
    else res.send({ message: `All Consumidores were deleted successfully!` });
  });
};