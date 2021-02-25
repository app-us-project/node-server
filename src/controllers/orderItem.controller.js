const { OrderItem, Order } = require('../models');

const getOrderItem = async(req,res,next) =>{
    const { id } = req.params;
    try{
        const orderItems = await OrderItem.findOne({ where :{ id }});
        if(!orderItems) res.json({message : "item not found"});
        res.json(orderItems);
    }catch(e){
        console.error(e);
        next(e);
    }
}

const postOrderItem = async(req,res,next) =>{
    const { id : orderID } = req.params;
    const {productName, productImage, count, price} = req.body;
    try{
        const order = await Order.findOne({ where : { orderID }});
        if(!order) res.json({ message : "order not found"});
        const orderItem = await OrderItem.create({
            productName,
            productImage,
            count,
            price,
            orderID,
        });
        order.addOrderItems(orderItem);
        res.json({ state: "success", item : orderItem});
    }catch(e){
        console.error(e);
        next(e);
    }
}

const cancelOrderItem = async(req,res,next) =>{     //상품을 결제 후에 취소할때 호출되는 함수 
    try{
        const orderItems = await OrderItem.findOne({ where : { id : `${req.params.id}`}});
        if(!orderItems) res.status(400).json({ message : "notExisted"})
        if(!orderItems.state) res.status(400).json({message : "alreadyDone"});
        else{
            await orderItems.update({
                state : false,
            })
            const canceledPrice = orderItems.price;
            const orderID = orderItems.orderID;
            const order = await Order.findByPk(orderID);
            const changedPrice = (+order.entirePrice) - (+canceledPrice);
            const changedTotalPrice = (+order.totalPrice) - (+canceledPrice);
            order.update({ entirePrice : changedPrice , totalPrice : changedTotalPrice});
            res.json({ message : "order canceled", changedTotalPrice });
        }
    }catch(e){
        console.error(e);
        next(e);
    }
}
module.exports = { getOrderItem,postOrderItem,cancelOrderItem };