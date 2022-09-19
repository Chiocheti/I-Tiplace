const Usuario = require("../models/usuario.model.js");
// Create and Save a new Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Usuario
  const usuario = new Usuario({
    email: req.body.email,
    cadastro: req.body.cadastro,
  });
  // Save Usuario in the database
  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Usuario."
      });
    else res.send(data);
  });
};

// Retrieve all Usuarios from the database (with condition).
exports.findAll = (req, res) => {
  const cadastro = req.query.cadastro;
  Usuario.getAll(cadastro, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Usuarios."
      });
    else res.send(data);
  });
};

// Find a single Usuario with a email
exports.findOne = (req, res) => {
  Usuario.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found usuario with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving usuario with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};
// Find one by email and cadastro
exports.findOneByEmailAndCadastro = (req, res) => {
  Usuario.findByEmailAndCadastro(req.params.email, req.params.cadastro, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found usuario with email ${req.params.email} and cadastro ${req.params.cadastro}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving usuario with email " + req.params.email + " and cadastro " + req.params.cadastro
        });
      }
    } else res.send(data);
  });
};

// Find a single Usuario with a Id
exports.findOneById = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found usuario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving usuario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a Usuario with the specified email in the request
exports.delete = (req, res) => {
  Usuario.remove(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Usuario with email " + req.params.email
        });
      }
    } else res.send({ message: `Usuario was deleted successfully!` });
  });
};

// Delete all Usuarios from the database.
exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Usuarios."
      });
    else res.send({ message: `All Usuarios were deleted successfully!` });
  });
};