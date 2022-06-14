/**
 * 
 *  This file will contain the routing logic for the Cart controller page
 * 
 */
const { authjwt} = require("../middlewares");
const cartController = require("../controllers/cart.controller");

module.exports = function(app) {
    
    // Route for the POST request, when user creates a cart
    app.post("/ecom/api/v1/carts", [authjwt.verifyToken], cartController.create);

    // Route for the PUT request, when user updates a cart
    app.put("/ecom/api/v1/carts/:id", [authjwt.verifyToken], cartController.update);

    // Route for the GET request, when user get cart details
    app.get("/ecom/api/v1/carts/:cartId", [authjwt.verifyToken], cartController.getCart);

}