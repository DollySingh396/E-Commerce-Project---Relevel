/* 
*    Creating this file to create User schema
*
*    User fields:
*    1. id
*    2. username
*    3. email
*    4. password
*/
/* 
*    exporting this whole function which is returning User Object
*/

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};