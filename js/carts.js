let productsInCart = localStorage.getItem('productsInCart')
let productDom = document.querySelector(".products");
let noProducts = document.querySelector(".noProducts");


if (productsInCart) {
    let items = JSON.parse(productsInCart)
    drwCartProductsUI(items);
}

function drwCartProductsUI(products) {
    if (JSON.parse(localStorage.getItem('productsInCart')).length === 0) {
        noProducts.style.display = 'block'
        noProducts.innerHTML = `<h2 style='text-align:center ; padding:20px; color:red'>no item in cart</h2>`
    }
    let productUI = products.map((item) => {
        return `<div class="product-item">
                    <img src=${item.imgUrl} class="product-item-img">
                
                <div class="product-item-desc">
                    <h2>${item.title}</h2>
                    <p>${item.desc}</p>
                    <span>size: ${item.size}</span><br>
                    <span>quantity: ${item.qty}</span>
                </div>
                <div class="product-item-action">
                    <button type="" class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                </div>
                </div>`
    })
    productDom.innerHTML = productUI.join('');
}


function removeFromCart(id) {
    let productsInCart = localStorage.getItem('productsInCart')
    let item = JSON.parse(productsInCart)
    let itemToDelete = item.find((item) => item.id == id)
    item.splice(item.indexOf(itemToDelete), 1)
    localStorage.setItem('productsInCart', JSON.stringify(item))
    drwCartProductsUI(item)
}