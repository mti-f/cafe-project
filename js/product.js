// =========================
// گرفتن id محصول از URL
// =========================

const params = new URLSearchParams(
    window.location.search
);

const productId = params.get("id");



// =========================
// لیست محصولات
// =========================

const products = {

    espresso: {

        name: "اسپرسو",

        price: "80000 تومان",

        image: "images/espresso.PNG",

        description:
            "یک اسپرسوی قوی و خوش‌عطر با طعم اصیل قهوه؛ مناسب برای شروع یک روز پرانرژی."

    },


    latte: {

        name: "لاته",

        price: "120000 تومان",

        image: "images/latte.PNG",

        description:
            "ترکیبی دلنشین از اسپرسو، شیر گرم و فوم شیر که طعمی نرم و دلچسب دارد."

    },


    cappuccino: {

        name: "کاپوچینو",

        price: "130000 تومان",

        image: "images/cappuccino.PNG",

        description:
            "ترکیبی خوشمزه از اسپرسو، شیر گرم و فوم شیر با طعمی متعادل و دلپذیر."

    },


    cake: {

        name: "کیک شکلاتی",

        price: "150000 تومان",

        image: "images/cake.PNG",

        description:
            "کیک شکلاتی تازه و خوشمزه با طعم غنی شکلات؛ انتخابی عالی برای کنار قهوه."

    },


    "ice-coffee": {

        name: "آیس کافی",

        price: "140000 تومان",

        image: "images/ice-coffee.png",

        description:
            "نوشیدنی خنک و دلچسب تهیه‌شده از قهوه و شیر، مناسب برای روزهای گرم."

    }

};



// =========================
// پیدا کردن محصول
// =========================

const product = products[productId];



// اگر محصول پیدا نشد

if (!product) {

    document.body.innerHTML = `

        <div style="
            text-align:center;
            padding:100px 20px;
            font-family:Arial;
        ">

            <h2>
                ❌ محصول پیدا نشد
            </h2>

            <br>

            <a href="index.html">
                بازگشت به فروشگاه
            </a>

        </div>

    `;

    throw new Error("Product not found");

}



// =========================
// نمایش اطلاعات محصول
// =========================

const productImage =
    document.querySelector("#productImage");

const productName =
    document.querySelector("#productName");

const productDescription =
    document.querySelector("#productDescription");

const productPrice =
    document.querySelector("#productPrice");



productImage.innerHTML = `

    <img
        src="${product.image}"
        alt="${product.name}"
    >

`;



productName.textContent =
    product.name;



productDescription.textContent =
    product.description;



productPrice.textContent =
    product.price;



// =========================
// افزودن به سبد خرید
// =========================

const addButton =
    document.querySelector("#addProduct");



addButton.addEventListener("click", function () {


    let cart = JSON.parse(
        localStorage.getItem("cartItems")
    ) || [];


    const existingProduct =
        cart.find(function (item) {

            return item.name === product.name;

        });



    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }



    localStorage.setItem(
        "cartItems",
        JSON.stringify(cart)
    );



    alert(
        product.name +
        " به سبد خرید اضافه شد ✅"
    );

});



// =========================
// محصولات مشابه
// =========================

function showRelatedProducts() {


    const container =
        document.querySelector("#relatedProducts");


    if (!container) return;


    container.innerHTML = "";



    Object.keys(products)

        .filter(function (id) {

            return id !== productId;

        })

        .forEach(function (id) {


            const item =
                products[id];



            container.innerHTML += `

                <div
                    class="related-card"
                    onclick="location.href='product.html?id=${id}'"
                >

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.price}
                    </p>

                </div>

            `;

        });

}



showRelatedProducts();



// =========================
// سیستم امتیاز
// =========================

const stars =
    document.querySelectorAll("#stars span");


const ratingResult =
    document.querySelector("#ratingResult");



const ratingKey =
    "rating_" + productId;



const savedRating =
    localStorage.getItem(ratingKey);



// =========================
// نمایش ستاره‌ها
// =========================

function showStars(rate) {


    stars.forEach(function (star) {


        const starRate =
            Number(star.dataset.rate);



        if (starRate <= rate) {

            star.textContent = "★";

            star.style.color = "#c49a6c";

        } else {

            star.textContent = "☆";

            star.style.color = "#ccc";

        }

    });

}



// =========================
// انتخاب امتیاز
// =========================

stars.forEach(function (star) {


    star.addEventListener(
        "click",
        function () {


            const rate =
                Number(star.dataset.rate);



            showStars(rate);



            localStorage.setItem(
                ratingKey,
                rate
            );



            ratingResult.textContent =
                "امتیاز شما: " +
                rate +
                " از 5 ⭐";

        }
    );

});



// =========================
// امتیاز قبلی
// =========================

if (savedRating) {


    const rate =
        Number(savedRating);


    showStars(rate);


    ratingResult.textContent =
        "امتیاز شما: " +
        rate +
        " از 5 ⭐";

}
