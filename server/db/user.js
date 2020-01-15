const { STRING, UUIDV4, INTEGER } = require("sequelize");
const db = require("./database");

const User = db.define("user", {
  id: {
    type: UUIDV4
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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

module.exports = User;
