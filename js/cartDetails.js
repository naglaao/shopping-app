let products=JSON.parse(localStorage.getItem('products'));
let productId= localStorage.getItem('productId');
let itemDom = document.querySelector('.item-details')

let productDetails= products.find(item =>item.id==productId)

itemDom.innerHTML= `
<img src=${productDetails.imgUrl} alt="">
      <h2>Title: ${productDetails.title}</h2>
      <span>Size: ${productDetails.size}</span>
      <p>Description: ${productDetails.desc}</p>
      <span>Quantity: ${productDetails.qty}</span>
`;