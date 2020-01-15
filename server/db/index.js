//DATABASE

const db = require("./database");
const Plant = require("./plant");
const Guest = require("./guest");
const User = require("./user");

Plant.belongsTo(Guest);
Guest.hasMany(Plant);

Plant.belongsTo(User);
User.hasMany(Plant);

module.exports = {
  db,
  Plant,
  Guest,
  User
};
