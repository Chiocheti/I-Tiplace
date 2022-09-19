const config = require("../../config.json");

module.exports = {
    HOST: config.host,
    USER: config.user,
    PASSWORD: config.password,
    DB: config.database
  };