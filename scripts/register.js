document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const captchaModal = document.getElementById('captchaModal');
    const closeCaptcha = document.getElementById('closeCaptcha');

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        saveUser(username, email, password);
        showCaptcha(); // Показать капчу
    });

    closeCaptcha.addEventListener('click', () => {
        captchaModal.classList.add('hidden');
    });
});

function saveUser(username, email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const captchaModal = document.getElementById('captchaModal');
    const closeCaptcha = document.getElementById('closeCaptcha');

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('passwordConfirm').value;

        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        saveUser(email, password);
        showCaptcha();
    });

    closeCaptcha.addEventListener('click', () => {
        captchaModal.classList.add('hidden');
    });
});

function saveUser(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
}
