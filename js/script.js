// =========================
// Elements
// =========================


const mobileBtn = document.querySelector("#mobileBtn");
const nav = document.querySelector("#nav");

const menuBtn = document.querySelector("#menuBtn");

const darkModeBtn = document.querySelector("#darkModeBtn");

const searchInput = document.querySelector("#searchInput");

const filterButtons = document.querySelectorAll(".filters button");

const products = document.querySelectorAll(".item");




// =========================
// Mobile Menu
// =========================


if(mobileBtn){

mobileBtn.addEventListener("click",()=>{

    nav.classList.toggle("active");

});

}



// =========================
// Scroll Menu
// =========================


if(menuBtn){

menuBtn.addEventListener("click",()=>{


document.querySelector("#menu")
.scrollIntoView({

behavior:"smooth"

});


});


}





// =========================
// Dark Mode
// =========================


if(darkModeBtn){


darkModeBtn.addEventListener("click",()=>{


document.body.classList.toggle("dark");


if(document.body.classList.contains("dark")){


localStorage.setItem(
"darkMode",
"on"
);


darkModeBtn.textContent="☀️";


}else{


localStorage.setItem(
"darkMode",
"off"
);


darkModeBtn.textContent="🌙";


}



});


}




if(localStorage.getItem("darkMode")==="on"){


document.body.classList.add("dark");


if(darkModeBtn){

darkModeBtn.textContent="☀️";

}


}






// =========================
// Search & Filter
// =========================


let currentCategory="all";

let currentSearch="";





function filterProducts(){


products.forEach(function(item){



const category =
item.dataset.category;



const name =
item.querySelector("h3")
.textContent
.toLowerCase();





const categoryMatch =

currentCategory==="all" ||

category===currentCategory;





const searchMatch =

name.includes(currentSearch);






if(categoryMatch && searchMatch){


item.style.display="flex";


}else{


item.style.display="none";


}




});


}






filterButtons.forEach(function(button){



button.addEventListener("click",function(){



currentCategory =
button.dataset.category;





filterButtons.forEach(function(btn){

btn.classList.remove("active");

});




button.classList.add("active");



filterProducts();




});


});







if(searchInput){


searchInput.addEventListener("input",function(){



currentSearch =
searchInput.value.toLowerCase();



filterProducts();



});


}








// =========================
// Toast
// =========================


const toast =
document.querySelector("#toast");




function showToast(message){



if(!toast) return;



toast.textContent = message;


toast.classList.add("show");



setTimeout(()=>{


toast.classList.remove("show");


},2000);





}









// =========================
// Cart System
// =========================



const cartItems =
document.querySelector("#cartItems");

const cartCount =
document.querySelector("#cartCount");


const headerCartCount =
document.querySelector("#headerCartCount");


const cartTotal =
document.querySelector("#cartTotal");


const clearCart =
document.querySelector("#clearCart");



let cart =

JSON.parse(
localStorage.getItem("cartItems")
)

|| [];








function saveCart(){


localStorage.setItem(

"cartItems",

JSON.stringify(cart)

);


}







function convertPrice(price){


return Number(

price

.replace(" تومان","")

.replace(",","")

);


}









function renderCart(){



if(!cartItems) return;



cartItems.innerHTML="";



let total=0;

let count=0;




cart.forEach(function(product,index){



const price =
convertPrice(product.price);



total +=
price * product.quantity;


count +=
product.quantity;






const div =
document.createElement("div");



div.innerHTML = `


<span>

${product.name}

<br>

${product.price}

×

${product.quantity}

</span>


`;







const minus =
document.createElement("button");


minus.textContent="-";



minus.onclick=function(){



if(product.quantity>1){


product.quantity--;


}else{


cart.splice(index,1);


}



saveCart();

renderCart();


};








const plus =
document.createElement("button");


plus.textContent="+";



plus.onclick=function(){


product.quantity++;


saveCart();

renderCart();


};








const remove =
document.createElement("button");


remove.textContent="حذف";



remove.onclick=function(){



cart.splice(index,1);


saveCart();

renderCart();



};






div.appendChild(minus);

div.appendChild(plus);

div.appendChild(remove);



cartItems.appendChild(div);





});





if(cartCount){

cartCount.textContent=count;

}



if(headerCartCount){

headerCartCount.textContent=count;

}



if(cartTotal){

cartTotal.textContent=total;

}




}










// =========================
// Add To Cart
// =========================



const addButtons =
document.querySelectorAll(".add-to-cart");





addButtons.forEach(function(button){



button.addEventListener("click",function(){



const item =
button.closest(".item");



const name =
item.querySelector("h3")
.textContent;



const price =
item.querySelector("span")
.textContent;






const exist =
cart.find(function(product){


return product.name===name;


});






if(exist){


exist.quantity++;


}else{


cart.push({

name:name,

price:price,

quantity:1

});


}





saveCart();


renderCart();



showToast(
name+" به سبد اضافه شد"
);



});



});









// =========================
// Clear Cart
// =========================



if(clearCart){


clearCart.addEventListener("click",()=>{


cart=[];


saveCart();


renderCart();


showToast(
"سبد خرید خالی شد"
);



});


}









// =========================
// Checkout
// =========================



const checkoutBtn =
document.querySelector("#checkoutBtn");



if(checkoutBtn){


checkoutBtn.addEventListener("click",()=>{


if(cart.length===0){


showToast(
"سبد خرید خالی است"
);


return;


}



window.location.href="checkout.html";


});


}









// =========================
// Contact Form
// =========================


const contactForm =
document.querySelector("#contactForm");


const formMessage =
document.querySelector("#formMessage");



if(contactForm){



contactForm.addEventListener("submit",function(e){


e.preventDefault();



const name =
document.querySelector("#name").value.trim();


const email =
document.querySelector("#email").value.trim();


const message =
document.querySelector("#message").value.trim();





if(
name==="" ||
email==="" ||
message===""
){


formMessage.textContent =
"لطفاً همه فیلدها را پر کنید";


return;


}




formMessage.textContent =
"پیام شما ارسال شد ✅";


contactForm.reset();



});


}









// =========================
// Close Mobile Menu
// =========================



document.querySelectorAll("nav a")
.forEach(function(link){



link.addEventListener("click",()=>{


nav.classList.remove("active");


});


});









// =========================
// Start
// =========================



renderCart();

filterProducts();