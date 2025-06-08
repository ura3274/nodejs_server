//import { urlMap } from "../globals/globalStore.js";

function getProducts(products=[], host){

    const newProdArr = [];

    if(products.length > 0){
        for(let item of products){
            const str = item.category.split(' ').join('%20');
            const img = host + item.image;
           // urlMap.set(`${item.id}`, `${item.title}`);
            newProdArr.push({id:item.id, title:item.title, price:item.price, urlcat:`${str}`, url:`${item.id}`, 
                             category:item.category, description: item.description, image:item.image});
            
            
        }  
    }

    return newProdArr;
}

export default getProducts;
