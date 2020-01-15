const { STRING, UUID, UUIDV4, INTEGER } = require("sequelize");
const db = require("./database");

const Guest = db.define("guest", {
  id: {
    type: UUIDV4
  },
  mailingAddress: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddress: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  creditCardNum: {
    type: INTEGER,
    validate: {
      isCreditCard: true
    }
  }
});

module.exports = Guest;
