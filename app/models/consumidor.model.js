const sql = require("./db.js");
// constructor
const Consumidor = function (consumidor) {
  this.idConsumidor = consumidor.idConsumidor;
  this.nome = consumidor.nome;
  this.cpf = consumidor.cpf;
  this.telefone = consumidor.telefone;
};

Consumidor.create = (newConsumidor, result) => {
  sql.query("INSERT INTO consumidor SET ?", newConsumidor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created consumidor: ", { ...newConsumidor });
    result(null, { ...newConsumidor });
  });
};

Consumidor.findById = (idConsumidor, result) => {
  sql.query(`SELECT * FROM consumidor WHERE idConsumidor = '${idConsumidor}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found consumidor: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Consumidor with the idConsumidor
    result({ kind: "not_found" }, null);
  });
};

Consumidor.getAll = (result) => {
  let query = "SELECT * FROM consumidor";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("consumidor: ", res);
    result(null, res);
  });
};

Consumidor.updateById = (idConsumidor, consumidor, result) => {
  sql.query(
    "UPDATE consumidor SET nome = ? , cpf = ? , telefone = ? WHERE idConsumidor = ?",
    [consumidor.nome, consumidor.cpf, consumidor.telefone, idConsumidor],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Consumidor with the idConsumidor
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Consumidor: ", { ...consumidor.nome, ...consumidor.cpf, ...consumidor.telefone });
      result(null, { ...consumidor.nome, ...consumidor.cpf, ...consumidor.telefone });
    }
  );
};

Consumidor.remove = (idConsumidor, result) => {
  sql.query("DELETE FROM consumidor WHERE idConsumidor = ?", idConsumidor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Consumidor with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted consumidor with idConsumidor: ", idConsumidor);
    result(null, res);
  });
};

Consumidor.removeAll = result => {
  sql.query("DELETE FROM consumidor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} consumidores`);
    result(null, res);
  });
};
module.exports = Consumidor;