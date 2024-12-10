function Accumulator(startingValue) {
    this.value = startingValue;

    // Метод read запрашивает число и добавляет к текущему значению
    this.read = function() {
        let newValue = parseFloat(prompt("Введите число для добавления в корзину:", "0"));
        if (!isNaN(newValue)) {
            this.value += newValue;
            alert(`Текущее значение: ${this.value}`);
        } else {
            alert("Некорректное значение");
        }
    };
}

// Пример использования
let cartAccumulator = new Accumulator(0);

// Добавить кнопку для вызова read метода в HTML:
document.body.innerHTML += `<button onclick="cartAccumulator.read()">Добавить в корзину</button>`;
