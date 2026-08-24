
// ========================================
// گرفتن سفارش‌ها
// ========================================

let orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];


// ========================================
// عناصر HTML
// ========================================

const ordersContainer =
    document.getElementById("ordersContainer");

const orderCount =
    document.getElementById("orderCount");

const clearOrdersBtn =
    document.getElementById("clearOrders");


// ========================================
// نمایش سفارش‌ها
// ========================================

function renderOrders() {

    ordersContainer.innerHTML = "";

    orderCount.textContent =
        orders.length;


    // اگر سفارشی وجود نداشت

    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <div class="no-orders">
                هنوز سفارشی ثبت نشده است.
            </div>
        `;

        return;
    }


    // نمایش سفارش‌ها

    orders.forEach(function(order, index) {

        const card =
            document.createElement("div");

        card.className =
            "order-card";


        let itemsHTML = "";


        order.items.forEach(function(item) {

            itemsHTML += `
                <div class="order-item">
                    <span>
                        ${item.name}
                    </span>

                    <span>
                        ${item.quantity} عدد
                    </span>
                </div>
            `;

        });


        card.innerHTML = `

            <div class="order-header">

                <h3>
                    سفارش #${index + 1}
                </h3>

                <span>
                    ${order.date}
                </span>

            </div>


            <div class="customer-info">

                <p>
                    👤 <strong>مشتری:</strong>
                    ${order.customerName}
                </p>

                <p>
                    📞 <strong>تلفن:</strong>
                    ${order.customerPhone}
                </p>

                <p>
                    📍 <strong>آدرس:</strong>
                    ${order.customerAddress}
                </p>

            </div>


            <div class="order-products">

                <h4>
                    محصولات سفارش
                </h4>

                ${itemsHTML}

            </div>


            <div class="order-footer">

                <strong>
                    مبلغ کل:
                    ${Number(order.total)
                        .toLocaleString("fa-IR")}
                    تومان
                </strong>

                <button
                    class="delete-order"
                    onclick="deleteOrder(${index})"
                >
                    حذف سفارش
                </button>

            </div>

        `;


        ordersContainer.appendChild(card);

    });

}


// ========================================
// حذف یک سفارش
// ========================================

function deleteOrder(index) {

    const confirmed =
        confirm(
            "آیا از حذف این سفارش مطمئن هستید؟"
        );


    if (!confirmed) {
        return;
    }


    orders.splice(index, 1);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    renderOrders();

}


// ========================================
// حذف همه سفارش‌ها
// ========================================

clearOrdersBtn.addEventListener(
    "click",
    function() {

        if (orders.length === 0) {
            return;
        }


        const confirmed =
            confirm(
                "همه سفارش‌ها حذف شوند؟"
            );


        if (!confirmed) {
            return;
        }


        orders = [];


        localStorage.removeItem(
            "orders"
        );


        renderOrders();

    }
);


// ========================================
// اجرای اولیه
// ========================================

renderOrders();