const { STRING, TEXT, FLOAT } = require("sequelize");
const db = require("./database");

const Plant = db.define("plant", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: FLOAT,
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  size: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [["small", "medium", "large"]]
    }
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
});

module.exports = Plant;
