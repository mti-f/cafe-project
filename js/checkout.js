
// ========================================
// دریافت سبد خرید
// ========================================

let cart = JSON.parse(
    localStorage.getItem("cartItems")
) || [];


// ========================================
// گرفتن عناصر HTML
// ========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutMessage =
    document.getElementById("checkoutMessage");


// ========================================
// نمایش سبد خرید
// ========================================

function renderCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;


    // اگر سبد خالی بود

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>سبد خرید شما خالی است.</p>";

        checkoutTotal.textContent =
            "۰ تومان";

        return;
    }


    // نمایش محصولات

    cart.forEach(function(item) {

        const price =
            Number(
                String(item.price)
                    .replace(/[^\d]/g, "")
            );

        const itemTotal =
            price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className =
            "checkout-item";


        div.innerHTML = `

            <span>
                ${item.name}
            </span>

            <span>
                ${item.quantity} عدد
            </span>

            <strong>
                ${itemTotal.toLocaleString("fa-IR")} تومان
            </strong>

        `;


        checkoutItems.appendChild(div);

    });


    checkoutTotal.textContent =
        total.toLocaleString("fa-IR") +
        " تومان";
}


// ========================================
// ثبت سفارش
// ========================================

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            checkoutMessage.textContent =
                "سبد خرید شما خالی است.";

            checkoutMessage.style.color =
                "red";

            return;
        }


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const address =
            document.getElementById(
                "customerAddress"
            ).value.trim();


        if (!name || !phone || !address) {

            checkoutMessage.textContent =
                "لطفاً تمام اطلاعات را وارد کنید.";

            checkoutMessage.style.color =
                "red";

            return;
        }


        // محاسبه مبلغ

        let total = 0;


        cart.forEach(function(item) {

            const price =
                Number(
                    String(item.price)
                        .replace(/[^\d]/g, "")
                );

            total +=
                price * item.quantity;

        });


        // ساخت سفارش

        const order = {

            id: Date.now(),

            customerName: name,

            customerPhone: phone,

            customerAddress: address,

            items: cart,

            total: total,

            date:
                new Date().toLocaleString(
                    "fa-IR"
                )

        };


        // دریافت سفارش‌های قبلی

        let orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        // اضافه کردن سفارش جدید

        orders.push(order);


        // ذخیره سفارش‌ها

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        // خالی کردن سبد

        localStorage.removeItem(
            "cartItems"
        );


        // پیام موفقیت

        checkoutMessage.textContent =
            "🎉 سفارش شما با موفقیت ثبت شد.";

        checkoutMessage.style.color =
            "green";


        // غیرفعال کردن فرم

        checkoutForm.reset();


        cart = [];

        renderCheckout();

    }
);


// ========================================
// اجرای اولیه
// ========================================

renderCheckout();
