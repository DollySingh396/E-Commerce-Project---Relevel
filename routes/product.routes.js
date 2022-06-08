/**
 * 
 *  This file will contain the routing logic for the Product controller page
 * 
 */

const productController = require('../controllers/product.controller');

module.exports = function(app) {

    // Route for the POST request, to create a new product
    app.post("/ecom/api/v1/products", productController.create);

    // Route for the GET request, to fetch all products
    app.get("/ecom/api/v1/products", productController.findAll)

    // Route for the GET request, to fetch a product based on product id
    app.get("/ecom/api/v1/products/:id", productController.findOne)

    // Route for the PUT request, to update a product based on product id 
    app.put("/ecom/api/v1/products/:id", productController.update);

    // Route for the DELETE request, to delete a product based on id
    app.delete("/ecom/api/v1/products/:id", productController.delete);
}