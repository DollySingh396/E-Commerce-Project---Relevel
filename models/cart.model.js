/* 
*    Creating this file to create cart schema
*
*    Cart fields:
*    1. id
*    
*/

module.exports = (sequelize, Sequelize) => {

    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type : Sequelize.STRING,
            allowNull : false
        }
        
    });
    return Cart;
}