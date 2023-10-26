const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Product').then(()=>{ console.log("connected")}).catch((err)=>{console.log(err)    });

const product=mongoose.Schema({
    pid:Number,
    pname:String,
    price:Number
});

const Product=mongoose.model('Product',product);

app.post('/api/save',async (req,res)=>{
    const product=await Product(req.body)
    await product.save();
    res.status(200).json(product);
})

app.get('/api/prod',async (req,res)=>{
        const prod=await Product.find();
        res.json(prod);
})

app.listen(5000,()=>{
    console.log("server listening");
})