const sql = require("./db.js");
// constructor
const Fornecedor = function (fornecedor) {
  this.idFornecedor = fornecedor.idFornecedor;
  this.nomeFantasia = fornecedor.nomeFantasia;
  this.cnpj = fornecedor.cnpj;
  this.telefone = fornecedor.telefone;
  this.hora_abre = fornecedor.hora_abre;
  this.hora_fecha = fornecedor.hora_fecha;
};

Fornecedor.create = (newFornecedor, result) => {
  sql.query("INSERT INTO fornecedor SET ?", newFornecedor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Fornecedor: ", { ...newFornecedor });
    result(null, { ...newFornecedor });
  });
};

Fornecedor.findById = (idFornecedor, result) => {
  sql.query(`SELECT * FROM fornecedor WHERE idFornecedor = '${idFornecedor}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found fornecedor: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Fornecedor with the idFornecedor
    result({ kind: "not_found" }, null);
  });
};

Fornecedor.findByEmail = (idFornecedor, result) => {
  sql.query(`SELECT * FROM fornecedor WHERE idFornecedor = '${idFornecedor}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found fornecedor: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Fornecedor with the idFornecedor
    result({ kind: "not_found" }, null);
  });
};

Fornecedor.getAll = (result) => {
  let query = "SELECT * FROM fornecedor";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Fornecedor: ", res);
    result(null, res);
  });
};


Fornecedor.updateById = (idFornecedor, fornecedor, result) => {
  sql.query(
    "UPDATE fornecedor SET nomeFantasia = ? , cnpj = ? , telefone = ?  , hora_abre = ? , hora_fecha = ? WHERE idFornecedor = ?",
    [fornecedor.nomeFantasia, fornecedor.cnpj, fornecedor.telefone, fornecedor.hora_abre, fornecedor.hora_fecha, idFornecedor],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Fornecedor with the idFornecedor
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Fornecedor: ", { ...fornecedor.nomeFantasia, ...fornecedor.cnpj, ...fornecedor.telefone, ...fornecedor.hora_abre, ...fornecedor.hora_fecha });
      result(null, { ...fornecedor.nomeFantasia, ...fornecedor.cnpj, ...fornecedor.telefone, ...fornecedor.hora_abre, ...fornecedor.hora_fecha });
    }
  );
};

Fornecedor.remove = (idFornecedor, result) => {
  sql.query("DELETE FROM fornecedor WHERE idFornecedor = ?", idFornecedor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Fornecedor with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted fornecedor with idFornecedor: ", idFornecedor);
    result(null, res);
  });
};

Fornecedor.removeAll = result => {
  sql.query("DELETE FROM fornecedor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} fornecedores`);
    result(null, res);
  });
};
module.exports = Fornecedor;