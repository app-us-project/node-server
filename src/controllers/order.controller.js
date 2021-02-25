const { Order } = require("../models");

const getOrder = async(req,res,next)=>{     //처음 주문이 들어갔을때 주문 key값을 반환
    const {userID} = req.query;
    try{
        const date = new Date();
        const array = [];
        array.push(date.getFullYear());
        array.push(date.getMonth());
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
    const { id } = req.params;
    try{
        const order = await Order.findPk(id);
        if(!order) res.stauts(400).json({ message : "wrong order number"});     //만약 조회하려는 주문번호가 없다면 잘못되었음을 출력
        const orderItems = await order.getOrderItems();
        const date = order.createdAt;
        res.json({data : date,  items : orderItems});
    }catch(e){
        console.error(e);
        next(e);
    }
}

const getEntirePrice = async(req,res,next) =>{      //최종 결제 금액을 계산
    const { id } = req.params;
    try{
        const order = await Order.findPk(id);
        if(!order) res.status(400).json({message : "wrong order number"});
        const orderItems = await order.getOrderItems({
            attributes : ['price'],
        });
        let result = 0;;
        for( let item in orderItems){
            result += (orderItems[item].dataValues.price); 
        }
        let deliveryPrice = 2500;               //배송 비용
        await order.update({
            entirePrice : result+(+deliveryPrice),
        })
        res.json({ total_price: `${result+ (+deliveryPrice)}`});
    }catch(e){
        console.error(e);
        next(e);
    }
}

const confirmOrder = async(req,res,next) =>{        //주문 최종 확인 페이지
    try{
        const order = await Order.findOne({ where : { id : `${req.params.id}`}, attributes:['id', 'createdAt', 'entirePrice'],});
        if(!order) res.json({message : "wrong order number"});
        res.json(order);
    }catch(e){
        console.error(e);
        next(e);
    }
}
module.exports = { getOrder, getAllOrders, getEntirePrice, confirmOrder};