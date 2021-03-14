const { Cart, Product } = require("../models");
const Sequelize = require('sequelize');

const postCart = async(req,res,next)=>{     //처음 장바구니에 아이템을 담을떄 사용
    const { userID } = req.query;
    const { id : productID, quantity } = req.body;
    try{
        const product = await Product.findByPk(productID);
        let priceTemp = quantity * product.price;
        const cart = await Cart.create({
            title : product.title,
            userID,
            price : product.price,
            totalPrice : priceTemp,
            quantity
        });
        res.json(cart);
        //res.status(201).send("Success");
    }catch(e){
        console.error(e);
        next(e);
    }
}

const getAllCarts = async(req,res,next)=>{       //단순하게 장바구니 목록들을 띄울때 사용
    const { userID } = req.query;
    try{
        const cart = await Cart.findAll({ where : { userID }});
        res.status(201).json(cart);
    }catch(e){
        console.error(e);
        next(e);
    }
}

const getPrice = async(req,res,next)=>{        //장바구니에서 체크된 항목들만 가격 계산, ?query=[]
    //const { query } = req.query;
    try{
        let sum = 0;
        await Cart.sum('totalPrice').then( max => { sum = max })
        res.json({ totalPrice : sum });
    }catch(e){
        console.error(e);
        next(e);
    }
}

const deleteCart = async(req,res,next)=>{       //장바구니에서 목록 삭제시에 사용
    const { cartID } = req.params.id;
    try{
        await Cart.destroy({ where : { id : cartID}});
        res.status(201).send(" delete done");
    }catch(e){
        console.error(e);
        next(e);
    } 
}
module.exports = { postCart, getAllCarts, getPrice, deleteCart };