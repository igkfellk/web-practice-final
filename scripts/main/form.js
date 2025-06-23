// Обработка формы обратной связи
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    alert('Сообщение отправлено! Спасибо за ваше обращение.');
    this.reset();
});