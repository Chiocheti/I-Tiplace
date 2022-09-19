const sql = require("./db.js");
// constructor
const Endereco = function (endereco) {
  this.idUsuario = endereco.idUsuario;
  this.cep = endereco.cep;
  this.numero = endereco.numero;
  this.rua = endereco.rua;
  this.bairro = endereco.bairro;
  this.cidade = endereco.cidade;
  this.estado = endereco.estado;
};

Endereco.create = (newEndereco, result) => {
  sql.query("INSERT INTO endereco SET ?", newEndereco, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created endereco: ", { ...newEndereco });
    result(null, { ...newEndereco });
  });
};

Endereco.findByIdUsuario = (idUsuario , result) => {
  sql.query("SELECT * FROM endereco WHERE idUsuario = ? " , idUsuario , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tutorials: ", res);
    result(null, res);
  });
};

Endereco.findByIdEndereco = (idEndereco, result) => {
  sql.query(`SELECT * FROM endereco WHERE idEndereco = '${idEndereco}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found endereco: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found endereco with the idUsuario
    result({ kind: "not_found" }, null);
  });
};

Endereco.getAll = (result) => {
  let query = "SELECT * FROM endereco";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("endereco: ", res);
    result(null, res);
  });
};

Endereco.removeByEndereco = (idEndereco, result) => {
  sql.query("DELETE FROM endereco WHERE idEndereco = ?", idEndereco, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found endereco with the idEndereco
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted endereco with idEndereco: ", idEndereco);
    result(null, res);
  });
};

Endereco.removeByUsuario = (idUsuario, result) => {
  sql.query("DELETE FROM endereco WHERE idUsuario = ?", idUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("deleted endereco with idUsuario: ", idUsuario);
    result(null, res);
  });
};

Endereco.removeAll = result => {
  sql.query("DELETE FROM endereco", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} endereco`);
    result(null, res);
  });
};
module.exports = Endereco;