const { OrderItem, Order } = require('../models');

const postOrderItem = async(req,res,next) =>{
    try{
        const order = await Order.findOne({ where : { id : `${req.params.id}`}});
        if(!order) res.json({ message : "order not found"});
        const {productName, productImage, count, price} = req.body;
        const orderItem = await OrderItem.create({
            productName,
            productImage,
            count,
            price,
        });
        order.addOrderItems(orderItem);
        res.json({ state: "success"});
    }catch(e){
        console.error(e);
        next(e);
    }
}

module.exports = { postOrderItem};