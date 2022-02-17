// Открытие и закрытие всех модальных окон

// Все кнопки вызова модального окна на странице должны иметь класс .modal__get
const modalLinks = document.querySelectorAll('.modal__get');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

// Тоже самое время, что мы задаем в transition модальному окну 
const timeout = 500;

if (modalLinks.length > 0) {
    // Проверяем есть ли на странице модальные окна
    for (let index = 0; index < modalLinks.length; index++) {
        const modalLink = modalLinks[index];
        modalLink.addEventListener('click', function (e) {
            // При клике из значения атрибута href убирается #
            const modalName = modalLink.getAttribute('href').replace('#', '');
            // Получение имени Модального окна
            const curentModal = document.getElementById(modalName);
            // На выбранный объект применяется функция открытия модального окна
            modalOpen(curentModal);
            console.log('Пользователь открыл попап');
            // Запрет перезагрузки страницы
            e.preventDefault();
        });
    }
}

// Для закрытия модального окна всеми объектами, имеющими класс modal__close
const modalCloseIcon = document.querySelectorAll('.modal__close');
if (modalCloseIcon.length > 0) {
    for (let index = 0; index < modalCloseIcon.length; index++) {
        const el = modalCloseIcon[index];
        el.addEventListener('click', function (e) {
            modalClose(el.closest('.modal'));
            console.log('Пользователь закрыл попап');
            e.preventDefault();
        })
    }
}

// Открытие модального окна 

function modalOpen(curentModal) {
    // Ищем объект currentModal, описанный выше (собственно модальное окно), и проверяем открыто ли оно
    if (curentModal && unlock) {
        const modalActive = document.querySelector('.modal--active');
        if (modalActive) {
            // Если есть открытые модальные окна на данный момент, то они будут закрыты
            modalClose(modalActive, false);
        } else {
            // Блокируем body, чтобы убрать скролл
            bodyLock();
        }
        // Добавляем Модальному окну класс для его отображения
        curentModal.classList.add('modal--active');
        curentModal.addEventListener('click', function (e) {
            // Если у нажатого объекта нет родителя .modal__content, тогда мы его закрываем (чтобы можно было закрыть
            // окно при клике куда угодно)
            if (!e.target.closest('.modal__content')) {
                modalClose(e.target.closest('.modal'));
            }
        });
    }
}

function modalClose(modalActive, doUnlock = true) {
    if (unlock) {
        modalActive.classList.remove('modal--active');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    // Получение ширины скролла = ширина вьюпорта - ширина обьектов, находящихся внутри
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    // Получение всех объектов с классом lockPadding, а это все фиксированные объекты, у которых нужно предотвратить сдвиг (например, шапка)

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    // Присвоение значения ширины скролла в виде паддинга справа body
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    // Исключение двойных нажатий
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {

    // Появление скролла только после того, как закончится анимация
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Маска для телефона
var selector = document.querySelectorAll("input[type='tel']");

var im = new Inputmask("+7(999)-999-99-99");

im.mask(selector);

