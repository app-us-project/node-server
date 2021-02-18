const { Order } = require("../models");

const getOrder = async(req,res,next)=>{
    try{
        const order = await Order.create({
            userID : "test2",
        });
        const result = order.id;
        res.json({ key : result});
    }catch(e){
        console.error(e);
        next(e);
    }
}

module.exports = { getOrder};