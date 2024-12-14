document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin") {
        alert("Добро пожаловать, администратор!");
        window.location.href = "index.html";
    } else {
        alert("Неверные данные!");
    }
});
