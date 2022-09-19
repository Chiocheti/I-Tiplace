const Fornecedor = require("../models/fornecedor.model.js");
// Create and Save a new Fornecedor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Fornecedor
  const fornecedor = new Fornecedor({
    idFornecedor: req.body.idFornecedor,
    nomeFantasia: req.body.nomeFantasia,
    cnpj: req.body.cnpj,
    telefone: req.body.telefone,
    hora_abre: req.body.hora_abre,
    hora_fecha: req.body.hora_fecha,
  });
  // Save Fornecedor in the database
  Fornecedor.create(fornecedor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fornecedor."
      });
    else res.send(data);
  });
};

// Retrieve all Fornecedores from the database (with condition).
exports.findAll = (req, res) => {
  Fornecedor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Fornecedores."
      });
    else res.send(data);
  });
};

// Find a single Fornecedor with a idFornecedor
exports.findOneById = (req, res) => {
  Fornecedor.findById(req.params.idFornecedor, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found fornecedor with idFornecedor ${req.params.idFornecedor}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving fornecedor with idFornecedor " + req.params.idFornecedor
        });
      }
    } else res.send(data);
  });
};

// Update a Fornecedor identified by the emailUsuario in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Fornecedor.updateById(
    req.params.idFornecedor,
    new Fornecedor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Fornecedor with idFornecedor ${req.params.idFornecedor}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Fornecedor with idFornecedor " + req.params.idFornecedor
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Fornecedor with the specified idFornecedor in the request
exports.delete = (req, res) => {
  Fornecedor.remove(req.params.idFornecedor, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Fornecedor with idFornecedor ${req.params.idFornecedor}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Fornecedor with idFornecedor " + req.params.idFornecedor
        });
      }
    } else res.send({ message: `Fornecedor was deleted successfully!` });
  });
};

// Delete all Fornecedores from the database.
exports.deleteAll = (req, res) => {
  Fornecedor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Fornecedores."
      });
    else res.send({ message: `All Fornecedores were deleted successfully!` });
  });
};