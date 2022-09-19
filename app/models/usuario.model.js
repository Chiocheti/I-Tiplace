const sql = require("./db.js");
// constructor
const Usuario = function (usuario) {
  this.email = usuario.email;
  this.cadastro = usuario.cadastro;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM usuario WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Usuario with the email
    result({ kind: "not_found" }, null);
  });
};

Usuario.findByEmailAndCadastro = (email, cadastro, result) => {
  sql.query(`SELECT * FROM usuario WHERE email = '${email}' and cadastro = '${cadastro}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Usuario with the email and usuario
    result({ kind: "not_found" }, null);
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Usuario with the email
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (cadastro, result) => {
  let query = "SELECT * FROM usuario";
  if (cadastro) {
    query += ` WHERE cadastro LIKE '%${cadastro}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.remove = (email, result) => {
  sql.query("DELETE FROM usuario WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Usuario with the email
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted usuario with email: ", email);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};
module.exports = Usuario;