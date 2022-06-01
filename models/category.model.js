/* 
*    Creating this file to create category schema
*
*    Category fields:
*    1. id
*    2. name
*    3. description
*/

/* 
*    exporting this whole function which is returning Category Object
*/

module.exports = (sequelize, Sequelize) => {

    const Category = sequelize.define("category", 
    {
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
        }

    });

    return Category;
}
