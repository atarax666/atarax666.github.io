// Функция для обрезки строки
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 1) + "…";
    }
    return str;
}

// Пример использования
let longText = "Это очень длинный текст, который нужно обрезать для отображения.";
let truncatedText = truncate(longText, 20);
console.log(truncatedText); // "Это очень длинный т…"
