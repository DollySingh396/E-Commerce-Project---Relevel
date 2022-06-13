/**
 * This file contains controller logic for Product page.
 * Everytime a CRUD operation come for the product, methods defined
 * in this controller will be executed
 */

const { response } = require("express");
const { request } = require("express");
const { product } = require("../models")
const db = require('../models');
const Product = db.product;
const Op =  db.Sequelize.Op;

//POST request - insert a new product in product table

exports.create = (request, response) => {

    const product = {
        name: request.body.name,
        description: request.body.description,
        cost: request.body.cost,
        categoryId: request.body.categoryId
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
    let minCost = req.query.minCost;
    let maxCost = req.query.maxCost;
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
    }
    else if(minCost && maxCost){
        promise = Product.findAll({
            where: {
                cost:{
                    [Op.gte] : minCost,
                    [Op.lte] : maxCost
                }
            }
        })
    } 
    else if(minCost){
        promise = Product.findAll({
            where: {
                cost:{
                    [Op.gte] : minCost
                }
            }
        })
    } 
    else if(maxCost){
        promise = Product.findAll({
            where: {
                cost:{
                    [Op.lte] : maxCost
                }
            }
        })
    } 
    else {
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

 exports.update = (request, response) => {
    const product = {
        name: request.body.name,
        description: request.body.description,
        cost: request.body.cost,
        categoryId: request.body.categoryId
    }

    const productId = request.params.id;

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
                    response.status(200).send(product);
                })
                .catch(err => {
                    response.status(500).send({
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
            console.log(err);
            response.status(500).send({
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

/**
 *  Get request to fetch all products under a specific category
 */

exports.getProductsUnderCategory = (request, response) => {

    const categoryId = parseInt(request.params.categoryId);

    Product.findAll({
        where: {
            categoryId : categoryId
        }
    })
    .then( products => {
        response.status(200).send(products);
    })
    .catch( error => {
        response.status(500).send({
            message : " Some Internal error while fetching the products based on category Id."
        })
    })

}

