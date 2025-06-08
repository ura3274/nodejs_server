import express from 'express';
const app = express();
import 'dotenv/config';
import mysql from 'mysql2';
import { readFileSync } from 'fs';
import getCat from './scripts/getCategory.js';
import getProducts from './scripts/getProducts.js';
import getProductById from './scripts/getProductById.js';
import { categoryArr, productArr, newProdArr, globalBasketArr, urlMap } from './globals/globalStore.js';

app.use(express.static('public'));
app.use(express.json());

const sqlPool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  }).promise();

const onBasketItemAdd = (prodId, prodQuant)=>{
    if(productArr.length > 0){
    for(let item of productArr){
        if(item.id === prodId){
            if(globalBasketArr.length > 0){
                let flag = true;
                for(let item1 of globalBasketArr){
                    if(item1.id === prodId){
                        item1.quantity += prodQuant;
                        flag = false;
                    }
                }
                if(flag){globalBasketArr.push({...item, quantity:prodQuant});}
            }else{
                globalBasketArr.push({...item, quantity:prodQuant});
            }
        }
    }
}else{console.log('нечего добавлять')}   
}

/*app.get("/getdata", async function(request, response){
    console.log(request.query.category);
    const productArr = getProducts((await sqlPool.query("SELECT * FROM products WHERE category=? LIMIT ?", [request.query.category, Number(request.query.limit)]))[0], process.env.IMG_HOST);
    let html = await ejs.renderFile('views/render.ejs', {
        productlist: productArr
    });
    //console.log(html);
    response.send(html);
});*/

/*app.get("/", function(request, response){

    response.send("<script> window.location.href = `http://localhost:3000/main?width=${window.innerWidth}`;</script>");
});*/

app.get("/main", async function(request, response){
    const date = new Date('2023-09-01');
    const categoryArr = getCat((await sqlPool.query("SELECT DISTINCT category FROM products"))[0]);
    const newProdArr = getProducts((await sqlPool.query("SELECT * FROM products WHERE isnew=?",["true"]))[0], process.env.IMG_HOST);

    response.json({catDTO:categoryArr, prodDTO:newProdArr});
});



app.get("/basket", function(request, response){
    console.log(urlMap);
    
});

app.post("/basket", function(request, response){
    console.log(request.body.id);
    const addId = request.body.id;
    //const addQuant = request.body.quantity;
    onBasketItemAdd(addId, 1);
    response.json({total:globalBasketArr.length});
});

app.get("/product/:id", async function(request, response){
    const dataProd = getProductById(((await sqlPool.query("SELECT * FROM products WHERE id=?", [request.params.id]))[0])[0], process.env.IMG_HOST);
    response.json(dataProd);
});

app.get("/main/:category", async function(request, response){
   //const htm = readFileSync('./views/cart.ejs',{encoding: 'utf-8'});
    
    const categoryArr = getCat((await sqlPool.query("SELECT DISTINCT category FROM products"))[0]);
    const productArr = getProducts((await sqlPool.query("SELECT * FROM products WHERE category=? LIMIT ?", [request.params.category, Number(request.query.limit)]))[0], process.env.IMG_HOST);
    const url = `/${request.params.category}`;
    const str = request.params.category.split("'").join('%27');
    response.json([categoryArr, productArr]);
     
});

app.get("/*", function(request, response){

    response.status(404).send("error 404");
});


app.listen(3006, ()=>{console.log('Server started on port 3006')});