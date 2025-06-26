// Скрипт для загрузки карточек
let page = 0;
const pageSize = 2; // Количество карточек, загружаемых за один раз
let isLoading = false;

const loadMoreCards = () => {
    if (isLoading) return;

    isLoading = true;

    fetch('scripts/main/cards.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards-container');
            // Вычисляем, начиная с какой карточки загружать
            const startIndex = (page * pageSize) % data.length;
            const cardsToLoad = data.slice(startIndex, startIndex + pageSize);

            // Если карточки не хватает, добавляем из начала
            if (cardsToLoad.length < pageSize) {
                const remainingCards = pageSize - cardsToLoad.length;
                const beginningCards = data.slice(0, remainingCards);
                cardsToLoad.push(...beginningCards);
            }

            cardsToLoad.forEach(card => {
                const col = document.createElement('div');
                col.className = 'col';
                col.innerHTML = `
                    <div class="card h-100">
                        <a href="#">
                            <img src="${card.image}" class="card-img-top img-fluid" alt="${card.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${card.title}</h5>
                                <p class="card-text">${card.description}</p>
                                <div class="mt-auto">
                                    <a href="#" class="btn btn-primary">Читать далее</a>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                container.appendChild(col);
            });

            page++;
            isLoading = false;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            isLoading = false;
        });
};

const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreCards();
    }
};

// Загрузить первые карточки
document.addEventListener('DOMContentLoaded', loadMoreCards);
window.addEventListener('scroll', onScroll);

// Переключатель
const themeSwitch = document.getElementById('themeSwitch');
const savedTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-bs-theme', savedTheme);
themeSwitch.checked = savedTheme === 'light';

themeSwitch.addEventListener('change', function () {
    const newTheme = this.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});