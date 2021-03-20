const { Order, OrderItem } = require("../models");

const getOrder = async(req,res,next)=>{     //처음 주문이 들어갔을때 주문 key값을 반환
    const {id : userID} = req.auth;
    try{
        const date = new Date();
        const array = [];
        array.push(date.getFullYear());
        array.push(date.getMonth()+1);
        array.push(date.getDate());
        array.push(date.getHours());
        array.push(date.getMinutes());
        array.push(date.getSeconds());
        array.push(date.getMilliseconds());
        const orderID = array.join("");
        const order = await Order.create({
            userID ,           //나중에 jwt 토큰을 사용해서 받는다
            orderID,
        });
        const result = order.orderID;
        res.json({ key : result});
    }catch(e){
        console.error(e);
        next(e);
    }
}

const getAllOrders = async(req,res,next)=>{     //주문 목록이나 주문 내역 확인시에 사용
    const {id : userID} = req.auth;
    try{
        const object = {};
        let orders = await Order.findAll({ where : { userID }});
        for( let order in orders){
            const temp = orders[order].orderID;
            const items = await OrderItem.findAll({where : {orderID : temp}})
            object[`${temp}`]= items;
        }
        return res.json(object);
    }catch(e){
        console.error(e);
        next(e);
    }
}

const getEntirePrice = async(req,res,next) =>{      //최종 결제 금액을 계산
    const { id } = req.params;
    try{
        const order = await Order.findByPk(id);
        if(!order) res.status(400).json({message : "wrong order number"});
        const result = order.entirePrice; 
        const deliveryPrice = 2500;               //배송 비용
        const totalPrice = 2500 + order.entirePrice;
        await order.update({ deliveryPrice, totalPrice});
        res.json({ total_price: `${totalPrice}`});
    }catch(e){
        console.error(e);
        next(e);
    }
}

const confirmOrder = async(req,res,next) =>{        //주문 최종 확인 페이지
    try{
        const order = await Order.findOne({ where : { orderID : `${req.params.id}`}, attributes:['orderID', 'totalPrice'],});
        const date = new Date();
        let string = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
        console.log(`string : ${string}`);
        if(!order) res.json({message : "wrong order number"});
        res.json({order, date : `${string}`});
    }catch(e){
        console.error(e);
        next(e);
    }
}
module.exports = { getOrder, getAllOrders, getEntirePrice, confirmOrder};