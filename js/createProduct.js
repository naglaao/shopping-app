// setup variable

let productName = document.getElementById('product-name')
let productDesc = document.getElementById('product-desc')
let productSize = document.getElementById('product-size')
let createForm = document.getElementById('create-form')
let inputFile = document.getElementById('uploade-img')
let productSizeValue;
let productImage;

// Events
productSize.addEventListener('change', getProductSize);
createForm.addEventListener('submit', createProductFun);
inputFile.addEventListener('change', uploadImg)

// functions
function getProductSize(e) {
    productSizeValue = e.target.value;
}


function createProductFun(e) {
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem('products')) || productsDB;
    let nameValue = productName.value;
    let descValue = productDesc.value;

    if (nameValue && descValue) {

        let obj = {
            id: allProducts ? allProducts.length + 1 : 1,
            qty: 1,
            imgUrl: productImage,
            size: productSizeValue,
            title: nameValue,
            desc: descValue,
            isMe:"Y",


        };
        let newProducts = allProducts ? [...allProducts, obj] : [obj];
        localStorage.setItem('products', JSON.stringify(newProducts));
        productDesc.value = '';
        productSize.value = '';
        productName.value = '';
        productImage = '';
        setTimeout(() => {
           window.location.href='index.html';
        }, 500)
  
    }
    else {
        alert('Enter Data')
    }
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