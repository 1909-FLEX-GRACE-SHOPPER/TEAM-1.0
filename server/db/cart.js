const { STRING, INTEGER, FLOAT, UUID, UUIDV4, DATE } = require("sequelize");
const db = require("./database");

const Cart = db.define("cart", {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    total: {
        type: FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
            notEmpty: true,
            isIn: [["pending", "checkedOut"]]
        }
    },
    purchaseDate: {
        type: DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    }
    // shipTo: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: false
    //     }
    // }
});

module.exports = Cart;
