
// ========================================
// اطلاعات ورود مدیر
// ========================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";


// ========================================
// گرفتن فرم
// ========================================

const loginForm =
    document.getElementById("adminLoginForm");

const loginMessage =
    document.getElementById("loginMessage");


// ========================================
// ورود
// ========================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById("adminUsername")
                .value
                .trim();


        const password =
            document
                .getElementById("adminPassword")
                .value;


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            window.location.href =
                "admin.html";

        } else {

            loginMessage.textContent =
                "نام کاربری یا رمز عبور اشتباه است.";

            loginMessage.style.color =
                "#b33";

        }

    }
);
