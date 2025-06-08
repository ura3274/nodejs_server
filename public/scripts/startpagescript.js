console.log('script');
    let cartMoveStep = 0;
    let minicartMoveStep = 0;
    let minicartInnerDivWidth = 0;
    let cartInnerDivWidth = 0;
    let cartWidth = 0;
    let minicartWidth = 0;


    const view = document.querySelector('.startpage');
    const cart = document.querySelector('.cart');
    const cartOuter = document.querySelector('.sp-cart-outerdiv');
    const cartInner = document.querySelector('.sp-cart-innerdiv');
    
    const miniCart = document.querySelector('.sp-minicart');
    const miniCartOuter = document.querySelector('.sp-minicart-outerdiv');
    const miniCartInner = document.querySelector('.sp-minicart-innerdiv');
    spview.style.display = 'block';

    cartWidth = cart.getBoundingClientRect().width+25;
    minicartWidth = miniCart.getBoundingClientRect().width+25;
    const cartQuantity = Math.floor(view.getBoundingClientRect().width/cartWidth);
    const minicartQuantity = Math.floor(view.getBoundingClientRect().width/minicartWidth);

    cartInnerDivWidth = (cartWidth)*10;
    cartOuter.style = `width:${(cartWidth)*cartQuantity}px;`;
    cartInner.style = `width: ${cartInnerDivWidth}px;`;

    minicartInnerDivWidth = (minicartWidth)*10;    
    miniCartOuter.style = `width:${minicartWidth*minicartQuantity}px;`;
    miniCartInner.style = `width: ${minicartInnerDivWidth}px;`;
    
    const interval = setInterval(()=>{
        if(minicartMoveStep > -(minicartInnerDivWidth-(minicartWidth*minicartQuantity))){
        minicartMoveStep -= minicartWidth;
        miniCartInner.style.transform = `translate(${minicartMoveStep}px, 0px)`;
        }else{
            minicartMoveStep = 0;
            miniCartInner.style.transform = `translate(${minicartMoveStep}px, 0px)`; 
        }
    },5000);

    function moveLeft(){
        cartMoveStep -= cartWidth;
        console.log(cartMoveStep);
        const elem = document.querySelector('.sp-cart-innerdiv');
        elem.style.transform = `translate(${cartMoveStep}px, 0px)`;
        console.log(elem.getBoundingClientRect().x);
        if(cartMoveStep < -(cartInnerDivWidth-(cartWidth*cartQuantity))){
            cartMoveStep = 0;
            elem.style.transform = `translate(${cartMoveStep}px, 0px)`;
        }
    }
    function moveRight(){
        if(cartMoveStep != 0){
        cartMoveStep += cartWidth;
        const elem = document.querySelector('.sp-cart-innerdiv');
        elem.style.transform = `translate(${cartMoveStep}px, 0px)`;
        console.log(elem.getBoundingClientRect().x);
        }
    }