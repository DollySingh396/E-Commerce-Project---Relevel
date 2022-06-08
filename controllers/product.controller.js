/**
 * This file contains controller logic for Product page.
 * Everytime a CRUD operation come for the product, methods defined
 * in this controller will be executed
 */

const req = require('express/lib/request');
const db = require('../models');
const Product = db.product;

//POST request - insert a new product in product table

exports.create = (request, response) => {

    /**
     *  Validation of request body
     */
    if( !request.body.name) {
        response.status(400).send( {
            message: "Name of the product can't be empty !"
        });
        return;
    }

    if( !request.body.cost) {
        response.status(400).send( {
            message: "Cost of the product can't be empty !"
        });
        return;
    }

    const product = {
        name: request.body.name,
        description: request.body.description,
        cost: request.body.cost
    }

    Product.create(product)
    .then( product => {
        console.log(`Product Name: [${product.name}] got inserted in DB.`)
        response.status(200).send(product);
    })
    .catch( error => {
        console.log(`Issue in inserting product name: [${product.name}]. Error Message:  ${error}`);
        response.status(500).send( {
            message: "Some Internal Error while storing the product."
        })
    })

}

// GET request - get a list of all products

exports.findAll = (req, res) => {
    let productName = req.query.name;
    let promise;
    /**
     * if user is searching from category name then if part will execute
     */
    if (productName) {
        promise = Product.findAll({
            where: {
                name: productName
            }
        })
    } else {
        promise = Product.findAll();

    }

    promise
        .then(products => {
            res.status(200).send(products);
        })
        .catch(err => {
            res.status(500).send({
                meassage: "Some internal error while fetching products details."
            })
        })

}

/**
 * Get a Product based on id 
 */

 exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
        .then(product => {
            if(!product){
                // if product id is not present in table then page not found error 
                return res.status(404).send({
                    message: "Product is not found."
                })
            }
            //if product id is present in table then simply give details of that product
                res.status(200).send(product);
            
        })
        .catch(err => {
            res.status(500).send({
                message: "Some internal server error while fetching the product deatils using id."
            })
        })

}


/**
 * PUT - Update the exitsing product 
 */

 exports.update = (req, res) => {

    if( !request.body.name) {
        response.status(400).send( {
            message: "Name of the product can't be empty !"
        });
        return;
    }

    if( !request.body.cost) {
        response.status(400).send( {
            message: "Cost of the product can't be empty !"
        });
        return;
    }

    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost 
    }

    const productId = req.params.id;

    Product.update(product, {
        where: {
            id: productId
        }
    })
        .then(updatedProduct => {
            /**
             * category details updated successfully 
             * now find the updated category details by id
             * if fetching is successfull then wil handle and send the response to client
             * if error occur then catch will handle the error
             */

            Product.findByPk(productId)
                .then(product => {
                    res.status(200).send(product);
                })
                .catch(err => {
                    res.status(500).send({
                        /**
                         * using this catch if after successfully updating the category 
                         * then fetching the updated details to send as response to the client
                         * if in fetching the details some error occur then this catch will handle it
                         */
                        message: "Some internal serevr error while fetching the updated category details by id"
                    })
                })
        })
        .catch(err => {
            res.status(500).send({
                /**
                 * using this catch if the updation operation fails 
                 * then sending the msg as response to the client
                 */
                message: "Some internal serevr error while updating the category details by id"
            })

        })

}

/**
 * Delete - to delete a product using id
 */

 exports.delete = (request, response) => {

    const productId = request.params.id;

    Product.destroy({
        where: {
            id: productId
        }
    })
        .then(result => {
            response.status(200).send({
                message: "Product is deleted successfully."
            })
        })
        .catch(error => {
            response.status(500).send({
                message: "Some internal error while deleting the product based on id."
            })
        })
}


