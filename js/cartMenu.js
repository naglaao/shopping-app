let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];
let cartproductDom = document.querySelector('.carts-products div ');

let cartCountDom = document.querySelector('#cart-count');
let shoppingCartIconOpen = document.querySelector(".shoppingCart");
let cartproducMenu = document.querySelector('.carts-products');


//check if there is item in localStorage
(function cartMenuData() {

    if (addedItem) {
        addedItem.map((item) => {
            cartproductDom.innerHTML += `<p>${item.title}</p>`;

        })
        cartCountDom.style.display='block'
        cartCountDom.innerHTML += addedItem.length;
    }
})();

// open cart & close
shoppingCartIconOpen.addEventListener('click', openCartMenu);
function openCartMenu() {
    if (cartproductDom.innerHTML != "") {
        if (cartproducMenu.style.display == "block") {
            cartproducMenu.style.display = "none";

        } else {
            cartproducMenu.style.display = "block";
        }
    }

}
