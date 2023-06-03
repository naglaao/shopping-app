
// Define Product
let productDom = document.querySelector(".products");
let products = productsDB;

// draw Products in index by map data ()
let drwProductsUI;
(drwProductsUI = function (products = []) {
    let productUI = products.map((item) => {
        return `<div class="product-item" style='border:${item.isMe==="Y"? "2px solid red": ""}'>
                    <img src=${item.imgUrl} class="product-item-img">
                
                <div class="product-item-desc">
                    <a  onclick='saveItemData(${item.id})'>${item.title}</a>
                    <p>${item.desc}</p>
                    <span>size: ${item.size}</span>
                    ${item.isMe==="Y" && "<button class = 'edit-product' onclick =' editProduct("+item.id+")'>Edit Product</button>" }
                    </div>   
                <div class="product-item-action">
                    <button type="" class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
                    <i class="far fa-heart" style="font-weight: 900 ;color:${item.liked == true ? 'red' : ''}" onclick="addToFavorit(${item.id})"></i>
                </div>
                </div>`
    })
    productDom.innerHTML = productUI.join('');
})(JSON.parse(localStorage.getItem('products')) || products);


 
// Define add to Cart



function addedToCart(id) {
    if (localStorage.getItem("username")) {
        let products = JSON.parse(localStorage.getItem('products')) || products;
        let cartCountDom = document.querySelector('#cart-count');
        let product = products.find((item) => item.id === id);
        let isProductInCart = addedItem.some((i) => i.id === product.id);
        if (isProductInCart) {
            addedItem = addedItem.map((p) => {
                if (p.id === product.id) p.qty += 1;
                return p;
            });
        } else {
            addedItem.push(product)
        }
        // UI
        cartproductDom.innerHTML = '';
        addedItem.forEach(item => {

            cartproductDom.innerHTML += `<p>${item.title}   <span class= 'Qty-style'> Quantity :${item.qty}</span></p>`;
        })
        // save data
        localStorage.setItem('productsInCart', JSON.stringify(addedItem));
        // Add counter of items
        let cartCount = document.querySelectorAll('.carts-products div p');
        cartCountDom.style.display = "block";
        cartCountDom.innerHTML = cartCount.length;
        // window.location.href = "cartproduct.html"
    }
    else {
        window.location.href = "login.html"
    }

}

function getUniqueArr(arr, filterType) {
    let unique = arr
        .map((item) => item[filterType])
        .map((item, i, final) => final.indexOf(item) === i && i)
        .filter((item) => arr[item])
        .map(item => arr[item]);
    return unique;
}




function saveItemData(id) {
    localStorage.setItem('productId', id);
    window.location.href = 'cartDetails.html';
}
//Define search
let input = document.getElementById('search');

input.addEventListener('keyup', function (e) {
    search(e.target.value, JSON.parse(localStorage.getItem('products')));

    if (e.target.value.trim() === '')
        drwProductsUI(JSON.parse(localStorage.getItem('products')));
});
function search(title, myArry) {
    //    let arr = myArry.filter(item => {
    //     return item.title.toLowerCase().includes(title.toLowerCase());

    let arr = myArry.filter(item => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drwProductsUI(arr);

}


// Define Favorit
let favoritItem = localStorage.getItem('productsFavorite')
    ? JSON.parse(localStorage.getItem('productsFavorite'))
    : [];


function addToFavorit(id) {
    if (localStorage.getItem("username")) {
        let choosenItem = products.find((item) => item.id === id);
        choosenItem.liked = true;
        favoritItem = [...favoritItem, choosenItem]
        let uniqueProducts = getUniqueArr(favoritItem, "id");
        localStorage.setItem('productsFavorite', JSON.stringify(uniqueProducts));
        products.map(item => {
            if (item.id === choosenItem.id) {
                item.liked = true;
            }
        })
        localStorage.setItem('products', JSON.stringify(products));
        drwProductsUI(products);
    }
    else {
        window.location.href = "login.html"
    }

}



// ===== Filter ====
let sizeFilter=document.getElementById('size-filter')

sizeFilter.addEventListener('change',getProductFilterBySize)

function getProductFilterBySize(e)
{
    let val=e.target.value;
    let products =JSON.parse(localStorage.getItem('products'))|| products;
    if(val==='all'){
        drwProductsUI(products)

    }
    else {
        products=products.filter(i=>i.size===val)
        drwProductsUI(products)
    }
}

// edit product
function editProduct(id){
    localStorage.setItem('editProduct',id)
    
}