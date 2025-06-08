function getProductById(product, host){
    
    //const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    //const product = await response.json();
    if(Object.keys(product).length > 0){
        
        const str = product.category.split(' ').join('%20');
        product.urlcat=`${str}`; 
        product.url=`${product.id}`;   
        product.image = host + product.image; 
        return product;
    }
    return {};
}

export default getProductById;