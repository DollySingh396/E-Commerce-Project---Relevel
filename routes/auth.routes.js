/**
 * 
 *  This file will contain the routing logic for the Authentication controller page
 * 
 */
const authController = require("../controllers/auth.controller");

module.exports = function(app) {
    
    // Route for the POST request, when user signup for the first time
    app.post("/ecom/api/v1/auth/signup", [], authController.signup);

    // Route for the POST request, when user signin
    app.post("/ecom/api/v1/auth/signin", authController.signin);
}