document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    // Сохранение данных
    localStorage.setItem(username, JSON.stringify({ email, password }));

    alert("Регистрация успешна!");
    window.location.href = "index.html";
});
