
let productDom = document.querySelector(".products");
let noProducts = document.querySelector(".noProducts");

let drwProductsUI;
(drwProductsUI = function (products = []) {
    let myProducts =products.filter((item)=>item.isMe==="Y");
   if(myProducts.length!=0){
    let productUI = myProducts.map((item) => {
        return `<div class="product-item" style='border:${item.isMe==="Y"? "2px solid red": ""}'>
                    <img src=${item.imgUrl} class="product-item-img">
                
                <div class="product-item-desc">
                    <a  onclick='saveItemData(${item.id})'>${item.title}</a>
                    <p>${item.desc}</p>
                    <span>size: ${item.size}</span>
                    <button class = 'edit-product' onclick ='editProduct(${item.id})'>Edit Product</button>
                    <br>
                    <button class = 'edit-product' onclick ='deleteProduct(${item.id})'>Delete Product</button>
                   
                    </div>   
                
                </div>`
    })
    productDom.innerHTML = productUI.join('');
}
else{
    noProducts.innerHTML = `<h2 style='text-align:center; color:red'>You have no product</h2>`
    }
})(JSON.parse(localStorage.getItem('products')) || productsDB);



// edit product
function editProduct(id){
    localStorage.setItem('editProduct',id)
    window.location.href = "editProduct.html"
}
// delete product
function deleteProduct(id){
    let products = JSON.parse(localStorage.getItem('products')) || productsDB;
    let myProducts = products.filter((item)=>item.isMe === "Y");
    let filtered = myProducts.filter((i)=>i.id !== id);
    let clickedItem = myProducts.find(i => i.id===id)
    products=products.filter(i=>i.id !==clickedItem.id)
    localStorage.setItem('products',JSON.stringify(products))
    
    drwProductsUI(filtered);

}