const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors")
const port = 5000
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bptoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json())
app.use(cors())


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("Ema-jhon").collection("Products");
    app.post("/addProducts",(req, res)=>{
        const productsDetails = req.body;
        // console.log(productsDetails);
        productsCollection.insertMany(productsDetails)
        .then(result => {
            res.send(result.insertedCount)
            console.log(insertedCount);
        })
    })

    app.get("/products",(req , res)=>{
        productsCollection.find({}).limit(20) // limit for showing data only 20 array;
        .toArray((err, documents)=>{
            console.log(documents);
            res.send(documents)
        })
    })

    app.get("/product/:key",(req , res)=>{
        productsCollection.find({key:req.params.key})
        .toArray((err, documents)=>{
            res.send(documents[0])  
        })
    })

    app.post("/productFromKeys",(req , res)=>{
        const productKeys = req.body;
        productsCollection.find({key:{ $in: productKeys}})
        .toArray((err, documents)=>{
            console.log(documents);
            // res.send(documents)
        })
    })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})