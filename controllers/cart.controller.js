
const { response } = require("express");
const { request } = require("express");
const db = require("../models");
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;
const { STATUS } = require('../configs/cart.status.config')

exports.create = (request, response) => {

    const cart = {
        userId: request.userId, // this userId is we are getting from middlewares after decoding
        status: STATUS.CREATION
    }

    Cart.create(cart)
        .then(cart => {
            response.status(201).send(cart);
        })
        .catch(error => {
            response.status(500).send({
                message: "Some internal server error happened"
            })
        })
}

exports.update = (request, response) => {

    const cartId = request.params.id;

    Cart.findByPk(cartId)
    .then(cart => {
            Product.findAll({
                where: {
                    id: request.body.productIds
                }
            })
            .then(items => {
                
                    if (!items) {
                        response.status(400).send({
                            message: "Items trying to add does not exist"
                        })
                    }

                    cart.setProducts(items)
                        .then(() => {
                            var cost = 0;
                            const ProductSelected = [];
                            cart.getProducts().then(products => {
                                
                                    for (let i = 0; i < products.length; i++) {
                                        cost = cost + products[i].cost;
                                        ProductSelected.push({
                                            id: products[i].id,
                                            name: products[i].name,
                                            cost: products[i].cost
                                        });
                                    }
                            
                            response.status(200).send({
                                id: cart.id,
                                ProductSelected: ProductSelected,
                                cost: cost
                            })
                        })
                    })
                })
            .catch(error => {
            response.status(500).send({
                message: "Some Internal server error happened while fetching Products Details "
            })
        })

    })
    .catch(error => {
        response.status(500).send({
            message: "Some Internal server error happened while fetching carts Details "
        })
    })

}


exports.getCart = (request, response) => {

    Cart.findByPk(req.params.cartId)
    .then(cart => {
        var cost = 0;
        const ProductSelected = [];
        cart.getProducts()
        .then(products => {

            for(i = 0; i < products.length; i++) {
                cost = cost + products[i].cost;
                ProductSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                });
            }

            res.status(200).send({
                id: cart.id,
                productSelected: ProductSelected,
                cost: cost,
                status: cart.status
            })
        })
    })
}

exports.delete = (request, response) => {

    const cartId = request.params.cartId;

    Cart.destroy({
        where: {
            id: cartId
        }
    })
    .then(result => {
        response.status(200).send({
            message: "Successfully deleted the cart"
        })
    })
    .catch( error => {
        response.status(500).send({
            message: "Some internal error while deleting the cart"
        })
    })
}

exports.changeCartStatus = ( request, response ) => {

    const cart = {
        id: request.params.cartId,
        status: request.params.status,
        userId : request.userId
    };


    const cartId = request.params.cartId

    Cart.update(cart, {
        where: {
            id: cartId
        }
    })
    .then( updatedCart => {
        cart.findByPk(cartId)
        .then( cart => {
            response.status(200).send(cart);
        })
        .catch(error => {
            response.status(500).send({
                message: "Some internal error while fetching the cart based on id"
            })
        })

    })
    .catch( error => {
        response.status(500).send({
            message: "Some internal error while updating the cart status based on id"
        })
    })
}