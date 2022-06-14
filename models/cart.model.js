/* 
*    Creating this file to create cart schema
*
*    Cart fields:
*    1. id
*    2. cost
*/

module.exports = (sequelize, Sequelize) => {

    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cost: {
            type: Sequelize.INTEGER
        }
    });
    return Cart;
}