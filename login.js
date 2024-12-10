document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin" && password === "admin") {
        alert("Добро пожаловать админ");
    } else {
        alert("Успешный вход!");
    }
});
