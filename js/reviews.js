// =========================
// Reviews System
// =========================


// عناصر صفحه

const reviewsContainer =
document.querySelector("#reviewContainer");


const reviewName =
document.querySelector("#reviewName");


const reviewText =
document.querySelector("#reviewText");


const stars =
document.querySelectorAll(".stars span");


const addReview =
document.querySelector("#addReview");


const reviewMessage =
document.querySelector("#reviewMessage");





let selectedRating = 0;



let reviews =

JSON.parse(

localStorage.getItem("reviews")

)

|| [];









// =========================
// انتخاب امتیاز
// =========================


stars.forEach(function(star){


star.addEventListener(
"click",
function(){


selectedRating =

Number(
star.dataset.rate
);



stars.forEach(function(item){


if(
Number(item.dataset.rate)
<= selectedRating
){


item.textContent="⭐";


}else{


item.textContent="☆";


}



});



});



});









// =========================
// ذخیره نظرات
// =========================


function saveReviews(){


localStorage.setItem(

"reviews",

JSON.stringify(reviews)

);


}









// =========================
// نمایش نظرات
// =========================


function renderReviews(){



if(!reviewsContainer)
return;



reviewsContainer.innerHTML="";





reviews.forEach(function(review){



const card =

document.createElement("div");



card.className =
"review-card";




card.innerHTML = `


<h3>

${review.name}

</h3>



<p>

${review.text}

</p>



<span>

${"⭐".repeat(review.rating)}

</span>


`;





reviewsContainer.appendChild(card);



});



}









// =========================
// ثبت نظر
// =========================


addReview.addEventListener(
"click",
function(){



const name =

reviewName.value.trim();



const text =

reviewText.value.trim();






if(

name === "" ||

text === "" ||

selectedRating === 0

){


reviewMessage.textContent =

"لطفاً نام، نظر و امتیاز را وارد کنید";


return;


}








const newReview = {


name:name,


text:text,


rating:selectedRating


};







reviews.push(newReview);



saveReviews();



renderReviews();







reviewMessage.textContent =

"نظر شما ثبت شد ✅";





reviewName.value="";


reviewText.value="";



selectedRating=0;



stars.forEach(function(star){


star.textContent="☆";


});




});








// اجرای اولیه

renderReviews();