/* 
*    Creating this file to create Product schema
*
*    Category fields:
*    1. id
*    2. name
*    3. description
*    4. cost
*/

/* 
*    exporting this whole function which is returning Product Object
*/
module.exports = (sequelize, Sequelize) => {

    const Product = sequelize.define("product", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true

            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
            },
            cost: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'products'
        });
    return Product;
}
