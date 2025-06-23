// Кнопка "Наверх"
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (!backToTopBtn) return;
    
    // Создаем наблюдатель за скроллом
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Если верх страницы не виден, показываем кнопку
                backToTopBtn.classList.add('visible');
            } else {
                // Если верх страницы виден, скрываем кнопку
                backToTopBtn.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Срабатывает, когда 10% элемента видны
    });
    
    // Наблюдаем за элементом вверху страницы
    const header = document.querySelector('header');
    if (header) observer.observe(header);
    
    // Плавный скролл вверх
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});