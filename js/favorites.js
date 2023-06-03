
let productsInCart = localStorage.getItem('productsInCart')
let productDom = document.querySelector(".products");
let noFavorit = document.querySelector(".noProducts");

function drwFavoritesProductsUI(allProducts=[]) {
    if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0);
    let products=JSON.parse(localStorage.getItem('productsFavorite'))|| allProducts;
    let productUI = products.map((item) => {
        return `<div class="product-item">
                    <img src="${item.imgUrl}" class="product-item-img">
                
                <div class="product-item-desc">
                    <h2>${item.title}</h2>
                    <p>Lorem ipsum dolor ipi</p>
                    <span>size: ${item.size}</span><br>
                    <span>quantity: ${item.qty}</span>
                </div>
                <div class="product-item-action">
                    <button type="" class="add-to-cart"onclick=removeFromCart(${item.id}) >Remove From Favorit</button>
                </div>
                </div>`
    })
    productDom.innerHTML = productUI.join('');
}
drwFavoritesProductsUI()


function removeFromCart(id) {
    let productsFavorite = localStorage.getItem('productsFavorite')
    if(productsFavorite){
    let item = JSON.parse(productsFavorite)
    let itemToDelete = item.find((item) => item.id == id)
    item.splice(item.indexOf(itemToDelete), 1)
    localStorage.setItem('productsFavorite', JSON.stringify(item))
    drwFavoritesProductsUI(item)
    }
}