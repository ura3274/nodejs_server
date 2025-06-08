async function onBasketAdd(prodId){
    
  const res = await fetch('/basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({id:parseInt(prodId)})
      });
  const data = await res.json();
  console.log(data);
  document.querySelector('.basket').textContent = data.total;
}