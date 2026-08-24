
// =========================
// Elements
// =========================


const orderIdInput =
document.querySelector("#orderId");


const searchBtn =
document.querySelector("#searchOrder");


const orderResult =
document.querySelector("#orderResult");









// =========================
// Search Order
// =========================


searchBtn.addEventListener(
"click",
function(){





const id =

Number(
orderIdInput.value.trim()
);








if(!id){



orderResult.innerHTML = `


<p>

لطفاً شماره سفارش را وارد کنید

</p>


`;



return;


}








const orders =


JSON.parse(

localStorage.getItem("orders")

)

|| [];









const order =

orders.find(function(item){



return item.id === id;



});









if(!order){



orderResult.innerHTML = `


<div class="order-card">


<h3>

❌ سفارش پیدا نشد

</h3>


<p>

شماره سفارش صحیح نیست

</p>


</div>


`;



return;


}









orderResult.innerHTML = `



<div class="order-card">



<h3>

✅ سفارش پیدا شد

</h3>





<p>

شماره سفارش:

${order.id}

</p>





<p>

نام مشتری:

${order.customer}

</p>





<p>

وضعیت سفارش:

<strong>

${order.status}

</strong>

</p>





<p>

مبلغ:

${order.total}

تومان

</p>





<h4>

محصولات:

</h4>






${

order.items.map(function(item){



return `



<p>

${item.name}

×

${item.quantity}

</p>



`;



}).join("")

}





</div>



`;






});