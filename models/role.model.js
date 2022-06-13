/* 
*    Creating this file to create Role schema
*
*    Role fields:
*    1. id
*    2. name
*    
*/
/* 
*    exporting this whole function which is returning Role Object
*/

module.exports = (sequelize, Sequelize) => {

    const Role = sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    
    return Role;
};