import { urlMap } from "../globals/globalStore.js";

function getCat(categories){
    const categoryArr = [];
    //const response = await fetch('https://fakestoreapi.com/products/categories');
    //const categories = await response.json();
    //const categories = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'jjj', 'kkk']
     
     if(categories.length > 0){
         //categoryArr.splice(0, categoryArr.length);
         categoryArr.push({name:'All', url:`All`});
         for(let item of categories){
            const str = item.category.split(' ').join('%20');
            urlMap.set(`htp-${str}`, `${item.category}`);
            categoryArr.push({name:item.category, url:`${str}`});
         }
     }
     console.log('cat');
     urlMap.set('htp-All', 'All')
     urlMap.set('basket', 'Корзина');
     urlMap.set('politic', 'Политика Безопасности');
     urlMap.set('contract', 'Условия Соглашения');
     //const dataJS = JSON.stringify(categoryArr);
     //console.log(dataJS);
     return categoryArr;
 }

 export default getCat;