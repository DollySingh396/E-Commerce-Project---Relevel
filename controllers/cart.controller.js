
const db = require("../models");
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;

exports.create = (request, response) => {

    const cart = {
        userId: request.userId // this userId is we are getting from middlewares after decoding
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
                cost: cost
            })
        })
    })
}