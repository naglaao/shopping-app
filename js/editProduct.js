// // setup variable

let products= JSON.parse(localStorage.getItem('products'))||productsDB
let productId= JSON.parse(localStorage.getItem('editProduct'))
let getProduct= products.find(i=> i.id===productId)
let productName = document.getElementById('product-name')
let productDesc = document.getElementById('product-desc')
let productSize = document.getElementById('product-size')
let updateForm = document.getElementById('update-form')
let inputFile = document.getElementById('uploade-img')
let productSizeValue;
let productImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSize.value = getProduct.size;
productImage = getProduct.imgUrl;
       

// Events
productSize.addEventListener('change', getProductSize);
updateForm.addEventListener('submit', updateProductFun);
inputFile.addEventListener('change', uploadImg)

//  functions
function getProductSize(e) {
    productSizeValue = e.target.value;
}


function updateProductFun(e) {
    e.preventDefault();

    getProduct.title =productName.value ;
     getProduct.desc=productDesc.value ;
     getProduct.size=productSize.value ;
     getProduct.imgUrl=productImage ;
           

         localStorage.setItem('products', JSON.stringify(products));
setTimeout(() => {
    window.location.href = 'index.html';
    
}, 500)


}

// uploadImg
function uploadImg() {
    
    let file = this.files[0];
    getImageBase64(file);
    let types = ['image/jpeg', 'image/png'];
    if (types.indexOf(file.type) == -1) {
        alert('type not supported')
        return;
    }
    if (file.size > 2 * 1024) {
        alert('size not exced 2MG')
        return;
    }

    // productImage=URL.createObjectURL(file);
}

function getImageBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        productImage = reader.result;
    };

    reader.onerror = function () {
        alert('Err !!');
    };
}