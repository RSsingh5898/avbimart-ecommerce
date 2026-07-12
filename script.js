/*====================================
 AVBHI MART
 script.js - Part 3A
====================================*/

const dailyuse = [
{
    id:01,
    name:"mamaearth",
    price:129,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_cKgNhL861nCSNlazCPMNPq-NwnedFTS07FilqqlKfQ&s=10"
},
{
    id:02,
    name:"Hair Oil",
    price:49,
    image:"https://i.ebayimg.com/images/g/ZNgAAOSwOBxl-tmS/s-l1200.jpg"
},
{
    id:03,
    name:"Lipton",
    price:99,
    image:"https://images.ctfassets.net/e8bhhtr91vp3/DJia3AeL6uZFtTE0KiPMs/1c8ba182e2d9be59391305459b30c9ef/Lipton-website_Mobile-Green-Teas.webp?w=800&q=50"
},
{
    id:04,
    name:"Amul Milk",
    price:120,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAmt9XmImDHAuKfJFrtVXDddZ-VRfa26_FRijAo3eTTmPzLBrNJ2sbIKp&s=10"
}
];
/*===============================*/

const clothesProducts = [
{
    id:1,
    name:"Men's T-Shirt",
    price:499,
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
},
{
    id:2,
    name:"Casual Hoodie",
    price:899,
    image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
},
{
    id:3,
    name:"Denim Jacket",
    price:1499,
    image:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500"
},
{
    id:4,
    name:"Cotton Shirt",
    price:699,
    image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500"
}
];

const groceryProducts = [
{
    id:5,
    name:"Fresh Apple",
    price:199,
    image:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500"
},
{
    id:6,
    name:"Rice Bag",
    price:899,
    image:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500"
},
{
    id:7,
    name:"Cooking Oil",
    price:249,
    image:"https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg"
},
{
    id:8,
    name:"Milk Pack",
    price:60,
    image:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500"
}
];

const shoesProducts = [
{
    id:9,
    name:"Running Shoes",
    price:1999,
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
},
{
    id:10,
    name:"Sports Shoes",
    price:2499,
    image:"https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500"
},
{
    id:11,
    name:"Sneakers",
    price:1799,
    image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
},
{
    id:12,
    name:"Leather Shoes",
    price:2999,
    image:"https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500"
}
];

/*=========================
AUTO SLIDER
=========================*/

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide(){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

setInterval(changeSlide,3000);

/*=========================
RENDER PRODUCTS
=========================*/

function createCard(product){

return `

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-content">

<h3 class="product-title">${product.name}</h3>

<div class="product-rating">

★★★★★

</div>

<h2 class="product-price">

₹${product.price}

</h2>

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

}
document.getElementById("dailyuse").innerHTML =
dailyuse.map(createCard).join("");

document.getElementById("clothes-products").innerHTML =
clothesProducts.map(createCard).join("");

document.getElementById("grocery-products").innerHTML =
groceryProducts.map(createCard).join("");

document.getElementById("shoes-products").innerHTML =
shoesProducts.map(createCard).join("");

/*=========================
ALL PRODUCTS
=========================*/

const allProducts = [
...dailyuse,    
...clothesProducts,
...groceryProducts,
...shoesProducts
];

/*=========================
CART ARRAY
=========================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*==============================
 CART OPEN / CLOSE
==============================*/

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");

cartBtn.onclick = () => {
    cartSidebar.classList.add("active");
};

closeCart.onclick = () => {
    cartSidebar.classList.remove("active");
};

/*==============================
 ADD TO CART
==============================*/

function addToCart(id){

    const product = allProducts.find(item => item.id === id);

    const exist = cart.find(item => item.id === id);

    if(exist){

        exist.qty++;

    }else{

        cart.push({
            ...product,
            qty:1
        });

    }

    saveCart();

    renderCart();

}

/*==============================
 SAVE CART
==============================*/

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/*==============================
 CART COUNT
==============================*/

function updateCount(){

    const count = cart.reduce(
        (sum,item)=>sum+item.qty,
        0
    );

    document.getElementById("cart-count").innerHTML = count;

}

/*==============================
 TOTAL PRICE
==============================*/

function updateTotal(){

    const total = cart.reduce(
        (sum,item)=>sum+(item.price*item.qty),
        0
    );

    document.getElementById("total-price").innerHTML = total;

}

/*==============================
 RENDER CART
==============================*/

function renderCart(){

    const container = document.getElementById("cart-items");

    container.innerHTML = "";

    cart.forEach(item=>{

        container.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="qty-box">

<button class="qty-btn"
onclick="decrease(${item.id})">-</button>

<span>${item.qty}</span>

<button class="qty-btn"
onclick="increase(${item.id})">+</button>

</div>

<button class="remove-btn"
onclick="removeItem(${item.id})">

Remove

</button>

</div>

</div>

`;

    });

    updateCount();

    updateTotal();

}

/*==============================
 PAGE LOAD
==============================*/

renderCart();
/*=========================================
 INCREASE QUANTITY
=========================================*/

function increase(id){

    const item = cart.find(product => product.id === id);

    if(item){
        item.qty++;
    }

    saveCart();
    renderCart();

}

/*=========================================
 DECREASE QUANTITY
=========================================*/

function decrease(id){

    const item = cart.find(product => product.id === id);

    if(!item) return;

    if(item.qty > 1){

        item.qty--;

    }else{

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();
    renderCart();

}

/*=========================================
 REMOVE PRODUCT
=========================================*/

function removeItem(id){

    cart = cart.filter(product => product.id !== id);

    saveCart();
    renderCart();

}

/*=========================================
 EMPTY CART MESSAGE
=========================================*/

function renderCart(){

    const container = document.getElementById("cart-items");

    if(cart.length === 0){

        container.innerHTML = `
            <div style="text-align:center;padding:50px 20px;">
                <h2>🛒</h2>
                <h3>Your Cart is Empty</h3>
                <p>Add products to continue shopping.</p>
            </div>
        `;

        updateCount();
        updateTotal();
        return;
    }

    container.innerHTML = "";

    cart.forEach(item => {

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="qty-box">

                    <button class="qty-btn" onclick="decrease(${item.id})">-</button>

                    <span>${item.qty}</span>

                    <button class="qty-btn" onclick="increase(${item.id})">+</button>

                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    updateCount();
    updateTotal();

}

/*=========================================
 CHECKOUT
=========================================*/

document.querySelector(".checkout").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Cart data save karo
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    // Checkout page par jao
    window.location.href = "checkout.html";

});

/*=========================================
 INITIAL LOAD
=========================================*/

renderCart();