const Endereco = require("../models/endereco.model.js");
// Create and Save a new Endereco
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Endereco
  const endereco = new Endereco({
    idUsuario: req.body.idUsuario,
    cep: req.body.cep,
    numero: req.body.numero,
    rua: req.body.rua,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
  });

  // Save Endereco in the database
  Endereco.create(endereco, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the endereco."
      });
    else res.send(data);
  });
};

// Retrieve all endereco from the database (with condition).
exports.findAll = (req, res) => {
  Endereco.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Endereco."
      });
    else res.send(data);
  });
};

// Find a single Endereco with a idUsuario
exports.findAllByIdUsuario = (req, res) => {
  Endereco.findByIdUsuario(req.params.idUsuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found endereco with idUsuario ${req.params.idUsuario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving endereco with idUsuario " + req.params.idUsuario
        });
      }
    } else res.send(data);
  });
};

// Find a single Endereco with a idEndereco
exports.findOneByIdEndereco = (req, res) => {
  Endereco.findByIdEndereco(req.params.idEndereco, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found endereco with idEndereco ${req.params.idEndereco}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving endereco with idEndereco " + req.params.idEndereco
        });
      }
    } else res.send(data);
  });
};

// Find a single Endereco with a idEndereco
exports.findOneByIdEndereco = (req, res) => {
  Endereco.findByIdEndereco(req.params.idEndereco, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found endereco with idEndereco ${req.params.idEndereco}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving endereco with idEndereco " + req.params.idEndereco
        });
      }
    } else res.send(data);
  });
};

// Delete a Endereco with the specified idEndereco in the request
exports.deleteByEndereco = (req, res) => {
  Endereco.removeByEndereco(req.params.idEndereco, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Endereco with idEndereco ${req.params.idEndereco}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Endereco with idEndereco " + req.params.idEndereco
        });
      }
    } else res.send({ message: `Endereco was deleted successfully!` });
  });
};

// Delete a Endereco with the specified idUsuario in the request
exports.deleteByUsuario = (req, res) => {
  Endereco.removeByUsuario(req.params.idUsuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Endereco with idUsuario ${req.params.idUsuario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Endereco with idUsuario " + req.params.idUsuario
        });
      }
    } else res.send({ message: `Endereco was deleted successfully!` });
  });
};

// Delete all Endereco from the database.
exports.deleteAll = (req, res) => {
  Endereco.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Endereco."
      });
    else res.send({ message: `All Endereco were deleted successfully!` });
  });
};