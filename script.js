// ===== ИНТЕГРАЦИЯ С ВНЕШНИМИ API =====

class APIExamples {
    constructor() {
        this.examples = {
            'jsonplaceholder': {
                name: 'JSONPlaceholder',
                endpoints: [
                    { method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts', description: 'Получить список постов' },
                    { method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts/1', description: 'Получить пост по ID' },
                    { method: 'POST', url: 'https://jsonplaceholder.typicode.com/posts', description: 'Создать новый пост' }
                ]
            },
            'reqres': {
                name: 'ReqRes',
                endpoints: [
                    { method: 'GET', url: 'https://reqres.in/api/users', description: 'Получить список пользователей' },
                    { method: 'GET', url: 'https://reqres.in/api/users/2', description: 'Получить пользователя по ID' },
                    { method: 'POST', url: 'https://reqres.in/api/users', description: 'Создать пользователя' }
                ]
            }
        };
    }
    
    renderExamples() {
        const container = document.getElementById('external-integration');
        if (!container) return;
        
        const examplesHTML = Object.entries(this.examples).map(([key, service]) => `
            <div class="api-service-card">
                <h3>${service.name}</h3>
                <div class="api-endpoints">
                    ${service.endpoints.map(endpoint => `
                        <div class="api-endpoint" data-method="${endpoint.method}" data-url="${endpoint.url}">
                            <span class="http-method ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
                            <span class="endpoint-url">${endpoint.url}</span>
                            <span class="endpoint-description">${endpoint.description}</span>
                            <button class="try-endpoint" onclick="apiExamples.tryEndpoint('${endpoint.method}', '${endpoint.url}')">
                                <i class="fas fa-play"></i> Попробовать
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        const existingExamples = container.querySelector('.api-examples');
        if (existingExamples) {
            existingExamples.innerHTML = examplesHTML;
        } else {
            const examplesSection = document.createElement('div');
            examplesSection.className = 'api-examples';
            examplesSection.innerHTML = `<h3>Примеры API для тестирования</h3>${examplesHTML}`;
            container.appendChild(examplesSection);
        }
    }
    
    async tryEndpoint(method, url) {
        // Устанавливаем значения в API тестер
        document.getElementById('api-method').value = method;
        document.getElementById('api-url').value = url;
        
        // Прокручиваем к тестеру
        document.getElementById('api-url').scrollIntoView({ behavior: 'smooth' });
        
        // Если это GET запрос, автоматически выполняем его
        if (method === 'GET') {
            setTimeout(() => {
                document.querySelector('.api-controls button').click();
            }, 500);
        }
    }
}

let apiExamples;

function initAPIExamples() {
    apiExamples = new APIExamples();
    apiExamples.renderExamples();
}

// Обновляем функцию testAPI для лучшей обработки ошибок
async function testAPI() {
    const method = document.getElementById('api-method').value;
    const url = document.getElementById('api-url').value;
    const output = document.getElementById('api-response-output');
    
    if (!url) {
        output.textContent = 'Ошибка: Введите URL API';
        return;
    }
    
    // Показываем индикатор загрузки
    output.innerHTML = '<div class="loading">Отправка запроса... <i class="fas fa-spinner fa-spin"></i></div>';
    
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        
        // Добавляем тело для POST/PUT запросов (дополнено: добавлено поле для custom body)
        if (method === 'POST' || method === 'PUT') {
            const customBody = document.getElementById('api-body') ? document.getElementById('api-body').value : JSON.stringify({
                title: 'Тестовый запрос от системного аналитика',
                body: 'Это тестовый запрос для проверки API',
                userId: 1
            }, null, 2);
            options.body = customBody;
        }
        
        const response = await fetch(url, options);
        const data = await response.json();
        
        output.textContent = JSON.stringify(data, null, 2);
        
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}\n\nПопробуйте:\n1. Проверить URL\n2. Убедиться, что CORS разрешен\n3. Использовать расширение для обхода CORS`;
        
        console.error('API Error:', error);
    }
}

// ===== ГЕНЕРАТОР ДОКУМЕНТОВ =====

class DocumentGenerator {
    constructor() {
        this.currentType = null;
        this.templates = {
            srs: this.generateSRS,
            'user-stories': this.generateUserStories,
            'api-spec': this.generateAPISpec,
            'test-cases': this.generateTestCases
        };
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Выбор типа документа
        document.querySelectorAll('.doc-type-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                this.selectType(type);
            });
        });
        
        // Изменение шаблона
        const docTemplate = document.getElementById('docTemplate');
        if (docTemplate) {
            docTemplate.addEventListener('change', () => {
                if (this.currentType) {
                    this.generate();
                }
            });
        }
    }
    
    selectType(type) {
        this.currentType = type;
        
        // Обновляем UI
        document.querySelectorAll('.doc-type-card').forEach(card => {
            card.classList.toggle('active', card.dataset.type === type);
        });
        
        const docEditor = document.getElementById('docEditor');
        if (docEditor) {
            docEditor.style.display = 'block';
        }
        this.generate();
    }
    
    generate() {
        if (!this.currentType) return;
        
        const template = document.getElementById('docTemplate').value;
        const generator = this.templates[this.currentType];
        
        if (generator) {
            const content = generator.call(this, template);
            document.getElementById('docContent').value = content;
        }
    }
    
    generateSRS(template) {
        const basic = `
SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

1. Введение
1.1. Назначение
1.2. Область действия
1.3. Определения, акронимы и сокращения
1.4. Ссылки

2. Общее описание
2.1. Перспектива продукта
2.2. Функции продукта
2.3. Пользовательские характеристики
2.4. Ограничения
2.5. Допущения и зависимости

3. Конкретные требования
3.1. Функциональные требования
3.1.1. Требования к функциям
3.1.2. Бизнес-правила
3.2. Нефункциональные требования
3.2.1. Требования к производительности
3.2.2. Требования к безопасности
3.2.3. Атрибуты качества

4. Приложения
4.1. Глоссарий
4.2. Модели анализа
`;
        
        const detailed = `
ДЕТАЛИЗИРОВАННАЯ СПЕЦИФИКАЦИЯ ТРЕБОВАНИЙ К ПО

1. ВВЕДЕНИЕ
1.1. Цели и задачи
1.2. Бизнес-требования
1.3. Масштаб проекта
1.4. Определения и терминология

2. ОБЩЕЕ ОПИСАНИЕ СИСТЕМЫ
2.1. Контекст системы
2.2. Бизнес-процессы
2.3. Пользовательские роли
2.4. Архитектура системы

3. ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
3.1. Модуль управления пользователями
   FR-001: Регистрация нового пользователя
   FR-002: Аутентификация пользователя
   FR-003: Управление профилем

3.2. Модуль обработки данных
   FR-010: Импорт данных
   FR-011: Валидация данных
   FR-012: Экспорт отчетов

4. НЕФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
4.1. Требования к производительности
   NFR-001: Время отклика < 2 секунд
   NFR-002: Поддержка 1000 одновременных пользователей

4.2. Требования к безопасности
   NFR-101: Шифрование данных
   NFR-102: Ролевая модель доступа

5. ИНТЕРФЕЙСЫ
5.1. Пользовательский интерфейс
5.2. Программные интерфейсы (API)
5.3. Аппаратные интерфейсы

6. ОГРАНИЧЕНИЯ И ЗАВИСИМОСТИ
`;
        
        return template === 'detailed' ? detailed : basic;
    }
    
    generateUserStories(template) {
        return `
ПОЛЬЗОВАТЕЛЬСКИЕ ИСТОРИИ

Формат: Как [роль], я хочу [функция], чтобы [выгода]

1. Управление пользователями
   US-001: Как новый пользователь, я хочу зарегистрироваться в системе, чтобы получить доступ к функционалу
     Критерии приемки:
     - ✓ Поля: email, пароль, подтверждение пароля
     - ✓ Валидация email
     - ✓ Пароль не менее 8 символов
     - ✓ Подтверждение по email

   US-002: Как пользователь, я хочу войти в систему, чтобы получить доступ к моим данным
     Критерии приемки:
     - ✓ Авторизация по email/пароль
     - ✓ Восстановление пароля
     - ✓ Запомнить меня

2. Управление контентом
   US-010: Как автор, я хочу создавать новые статьи, чтобы делиться знаниями
     Критерии приемки:
     - ✓ Редактор с форматированием
     - ✓ Предпросмотр
     - ✓ Сохранение черновиков

   US-011: Как читатель, я хочу искать статьи по ключевым словам, чтобы находить нужную информацию
     Критерии приемки:
     - ✓ Поиск по заголовку и содержанию
     - ✓ Фильтрация по тегам
     - ✓ Сортировка по дате/релевантности

ПРИОРИТЕТЫ:
Высокий: US-001, US-002
Средний: US-010, US-011
`;
    }
    
    generateAPISpec(template) {
        return `
СПЕЦИФИКАЦИЯ REST API

Базовый URL: https://api.example.com/v1

Аутентификация: Bearer Token

1. Ресурс: Пользователи
   GET /users - Получить список пользователей
     Параметры:
       - page (number)
       - limit (number)
       - search (string)
     Ответ: 200 OK
     {
       "data": [User],
       "pagination": {...}
     }

   POST /users - Создать пользователя
     Тело: { "name": "string", "email": "string" }
     Ответ: 201 Created

   GET /users/{id} - Получить пользователя
     Ответ: 200 OK, 404 Not Found

   PUT /users/{id} - Обновить пользователя
     Тело: { "name": "string" }
     Ответ: 200 OK, 404 Not Found

   DELETE /users/{id} - Удалить пользователя
     Ответ: 204 No Content, 404 Not Found

2. Ресурс: Статьи
   GET /articles - Получить статьи
   POST /articles - Создать статью
   GET /articles/{id} - Получить статью
   PUT /articles/{id} - Обновить статью
   DELETE /articles/{id} - Удалить статью

КОДЫ ОТВЕТОВ:
200 - Успех
201 - Создано
400 - Неверный запрос
401 - Не авторизован
403 - Запрещено
404 - Не найдено
500 - Ошибка сервера
`;
    }
    
    generateTestCases(template) {
        return `
ТЕСТОВЫЕ СЦЕНАРИИ

1. Функциональное тестирование
   TC-001: Регистрация нового пользователя
     Предусловия: Пользователь не зарегистрирован
     Шаги:
       1. Открыть страницу регистрации
       2. Заполнить валидные данные
       3. Нажать "Зарегистрироваться"
     Ожидаемый результат: 
       - Сообщение об успешной регистрации
       - Подтверждение отправлено на email

   TC-002: Попытка регистрации с существующим email
     Предусловия: Пользователь с test@example.com уже существует
     Шаги:
       1. Открыть страницу регистрации
       2. Ввести test@example.com
       3. Заполнить остальные поля
       4. Нажать "Зарегистрироваться"
     Ожидаемый результат: 
       - Сообщение об ошибке "Email уже используется"

2. Тестирование API
   TC-101: GET /users без аутентификации
     Запрос: GET /users
     Ожидаемый результат: 401 Unauthorized

   TC-102: GET /users с валидным токеном
     Запрос: GET /users (с заголовком Authorization)
     Ожидаемый результат: 200 OK с списком пользователей

КРИТЕРИИ ПРОХОЖДЕНИЯ:
- Все обязательные тесты пройдены
- Нет критических дефектов
- Соответствие требованиям > 95%
`;
    }
    
    download() {
        const content = document.getElementById('docContent').value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document-${this.currentType}-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    clear() {
        document.getElementById('docContent').value = '';
    }
}

let docGenerator;

function initDocumentGenerator() {
    docGenerator = new DocumentGenerator();
}

// ===== РАСШИРЕННЫЙ ПОИСК =====

class AdvancedSearch {
    constructor() {
        this.searchIndex = [];
        this.currentResults = [];
        this.filters = {
            type: 'all',
            category: 'all',
            difficulty: 'all'
        };
        this.init();
    }
    
    init() {
        this.buildSearchIndex();
        this.setupSearchUI();
    }
    
    buildSearchIndex() {
        const sections = document.querySelectorAll('.section');
        this.searchIndex = [];
        
        sections.forEach(section => {
            const id = section.id;
            const title = section.querySelector('h2').textContent;
            const content = section.textContent;
            const type = this.detectContentType(section);
            const category = this.detectCategory(section);
            
            this.searchIndex.push({
                id,
                title,
                content: content.substring(0, 1000), // Ограничиваем содержание для производительности
                type,
                category,
                element: section
            });
        });
    }
    
    detectContentType(section) {
        if (section.querySelector('.checklist')) return 'checklist';
        if (section.querySelector('.example')) return 'example';
        if (section.querySelector('.code-block')) return 'code';
        if (section.querySelector('.tool-card')) return 'tool';
        return 'theory';
    }
    
    detectCategory(section) {
        // Определяем категорию по ID или содержимому
        const id = section.id;
        if (id.includes('api') || id.includes('rest') || id.includes('graphql')) return 'api';
        if (id.includes('db') || id.includes('data')) return 'database';
        if (id.includes('security')) return 'security';
        if (id.includes('bpmn') || id.includes('uml')) return 'modeling';
        return 'general';
    }
    
    setupSearchUI() {
        const searchContainer = document.querySelector('.search-bar');
        if (!searchContainer) return;
        
        // Создаем расширенный поиск
        const advancedSearch = document.createElement('div');
        advancedSearch.className = 'advanced-search';
        advancedSearch.style.display = 'none';
        advancedSearch.innerHTML = this.getSearchHTML();
        
        // БЕЗОПАСНАЯ вставка
        searchContainer.appendChild(advancedSearch);
        
        // Обработчики событий
        const searchInput = searchContainer.querySelector('input');
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                advancedSearch.style.display = 'block';
            });
        }
        
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                advancedSearch.style.display = 'none';
            }
        });
        
        // Обработчики фильтров
        advancedSearch.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', () => this.performSearch());
        });
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.performSearch());
        }
    }
    
    getSearchHTML() {
        return `
            <div class="search-filters-row">
                <div class="search-filter-group">
                    <label>Тип контента</label>
                    <select id="searchType">
                        <option value="all">Все типы</option>
                        <option value="theory">Теория</option>
                        <option value="example">Примеры</option>
                        <option value="checklist">Чеклисты</option>
                        <option value="tool">Инструменты</option>
                        <option value="code">Код</option>
                    </select>
                </div>
                <div class="search-filter-group">
                    <label>Категория</label>
                    <select id="searchCategory">
                        <option value="all">Все категории</option>
                        <option value="api">API</option>
                        <option value="database">Базы данных</option>
                        <option value="security">Безопасность</option>
                        <option value="modeling">Моделирование</option>
                        <option value="general">Общее</option>
                    </select>
                </div>
            </div>
            <div id="searchResults"></div>
        `;
    }
    
    performSearch() {
        const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
        const typeFilter = document.getElementById('searchType').value;
        const categoryFilter = document.getElementById('searchCategory').value;
        
        this.filters.type = typeFilter;
        this.filters.category = categoryFilter;
        
        const results = this.searchIndex.filter(item => {
            // Фильтрация по типу и категории (исправлено truncated: полный if)
            if (typeFilter !== 'all' && item.type !== typeFilter) return false;
            if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
            
            // Поиск по термину (дополнено: с подсветкой)
            const matches = searchTerm ? item.title.toLowerCase().includes(searchTerm) || item.content.toLowerCase().includes(searchTerm) : true;
            return matches;
        });
        
        this.currentResults = results;
        this.renderResults(results, searchTerm); // Дополнено: метод для рендеринга с подсветкой
    }
    
    // Дополнено: метод для рендеринга результатов с подсветкой
    renderResults(results, term) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;
        
        if (!results.length) {
            resultsContainer.innerHTML = '<div class="search-no-results">Ничего не найдено</div>';
            return;
        }
        
        const html = results.map(item => {
            let preview = item.content.substring(0, 200);
            if (term) {
                const regex = new RegExp(term, 'gi');
                preview = preview.replace(regex, match => `<span class="search-highlight">${match}</span>`);
            }
            return `
                <div class="search-result-item">
                    <h4 class="search-result-title"><a href="#${item.id}">${item.title}</a></h4>
                    <p class="search-result-preview">${preview}...</p>
                    <div class="search-result-meta">Тип: ${item.type} | Категория: ${item.category}</div>
                </div>
            `;
        }).join('');
        
        resultsContainer.innerHTML = html;
    }
}

// Дополнено: функция для инициализации поиска
let advancedSearch;

function initAdvancedSearch() {
    advancedSearch = new AdvancedSearch();
}

// ===== ЗАКЛАДКИ ===== (существующий код сохранён, дополнено санитизацией)

function toggleBookmark(sectionId) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const btn = document.querySelector(`.bookmark-btn[data-section="${sectionId}"]`);

    if (bookmarks.includes(sectionId)) {
        bookmarks = bookmarks.filter(id => id !== sectionId);
        btn.innerHTML = `
            <i class="far fa-bookmark"></i>
            <span class="bookmark-tooltip">Добавить в закладки</span>
        `;
        btn.classList.remove('active');
    } else {
        bookmarks.push(sectionId);
        btn.innerHTML = `
            <i class="fas fa-bookmark"></i>
            <span class="bookmark-tooltip">Удалить из закладок</span>
        `;
        btn.classList.add('active');
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarksList();
    showBookmarkNotification(bookmarks.includes(sectionId), sectionId);
}

function updateBookmarksList() {
    const bookmarksList = document.getElementById('bookmarksList');
    if (!bookmarksList) return;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const noBookmarksMsg = '<li class="no-bookmarks"><i class="far fa-frown"></i> Пока нет сохраненных закладок</li>';

    bookmarksList.innerHTML = bookmarks.length ? '' : noBookmarksMsg;

    bookmarks.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        const title = section.querySelector('h2').textContent;
        const icon = section.querySelector('h2 i')?.className || 'fas fa-bookmark';
        
        const li = document.createElement('li');
        li.className = 'bookmark-item';
        li.innerHTML = `
            <a href="#${id}" class="bookmark-link">
                <i class="${icon}"></i>
                <span>${title}</span>
            </a>
            <button class="remove-bookmark" data-section="${id}" aria-label="Удалить закладку">
                <i class="fas fa-times"></i>
            </button>
        `;
        bookmarksList.appendChild(li);
    });
    
    updateBookmarksCounter();
}

function handleBookmarkRemove(event) {
    if (!event.target.closest('.remove-bookmark')) return;
    
    const sectionId = event.target.closest('.remove-bookmark').dataset.section;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(id => id !== sectionId);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    const sectionBtn = document.querySelector(`.bookmark-btn[data-section="${sectionId}"]`);
    if (sectionBtn) {
        sectionBtn.innerHTML = `
            <i class="far fa-bookmark"></i>
            <span class="bookmark-tooltip">Добавить в закладки</span>
        `;
        sectionBtn.classList.remove('active');
    }
    
    updateBookmarksList();
}

function updateBookmarksCounter() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const counter = document.querySelector('.bookmarks-counter');
    
    if (counter) {
        counter.textContent = bookmarks.length;
        counter.style.display = bookmarks.length ? 'inline-block' : 'none';
    }
}

function showBookmarkNotification(isAdded, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const title = section.querySelector('h2').textContent;
    const notification = document.createElement('div');
    notification.className = `bookmark-notification ${isAdded ? 'added' : 'removed'}`;
    notification.innerHTML = `
        <i class="${isAdded ? 'fas fa-bookmark' : 'far fa-bookmark'}"></i>
        <span>Раздел "${title}" ${isAdded ? 'добавлен в' : 'удален из'} закладок</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 10);
}

// ===== УЛУЧШЕНИЯ ПЕРВОЙ НЕДЕЛИ =====

// 1. Прогресс-бар чтения
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const progress = Math.round(scrollPercent * 100);
        
        progressBar.style.transform = `scaleX(${scrollPercent})`;
        
        if (scrollPercent > 0) {
            progressBar.classList.add('show');
        } else {
            progressBar.classList.remove('show');
        }
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
}

// 2. Режим фокусировки
function initFocusMode() {
    const focusOverlay = document.createElement('div');
    focusOverlay.className = 'focus-mode';
    
    document.body.appendChild(focusOverlay);

    window.activateFocusMode = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const content = section.cloneNode(true);
        content.className = 'focus-content';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'focus-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = deactivateFocusMode;
        
        content.appendChild(closeBtn);
        focusOverlay.innerHTML = '';
        focusOverlay.appendChild(content);
        focusOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.deactivateFocusMode = function() {
        focusOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            focusOverlay.innerHTML = '';
        }, 300);
    }

    focusOverlay.addEventListener('click', function(e) {
        if (e.target === focusOverlay) {
            deactivateFocusMode();
        }
    });
}

// 3. Быстрые действия
function initQuickActions() {
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    
    const actions = [
        { icon: 'fas fa-search', title: 'Поиск', action: () => {
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) searchInput.focus();
        }},
        { icon: 'fas fa-bookmark', title: 'Закладки', action: () => scrollToSection('bookmarks') },
        { icon: 'fas fa-expand', title: 'Режим фокусировки', action: () => activateFocusModeForCurrent() },
        { icon: 'fas fa-moon', title: 'Тема', action: () => {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }}
    ];

    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'quick-action-btn';
        btn.innerHTML = `<i class="${action.icon}"></i>`;
        btn.title = action.title;
        btn.onclick = action.action;
        quickActions.appendChild(btn);
    });

    // БЕЗОПАСНАЯ вставка в body
    if (document.body) {
        document.body.appendChild(quickActions);
    }
}

function activateFocusModeForCurrent() {
    const currentSection = getCurrentVisibleSection();
    if (currentSection) {
        activateFocusMode(currentSection.id);
    }
}

function getCurrentVisibleSection() {
    const sections = document.querySelectorAll('.section');
    for (let section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            return section;
        }
    }
    return sections[0];
}

// 4. Улучшенная система закладок
function enhanceBookmarks() {
    // Добавляем кнопки действий к разделам
    document.querySelectorAll('.section').forEach(section => {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'bookmark-actions';
        
        const focusBtn = document.createElement('button');
        focusBtn.className = 'bookmark-btn';
        focusBtn.innerHTML = '<i class="fas fa-expand"></i>';
        focusBtn.title = 'Режим фокусировки';
        focusBtn.onclick = () => activateFocusMode(section.id);
        
        const copyLinkBtn = document.createElement('button');
        copyLinkBtn.className = 'bookmark-btn';
        copyLinkBtn.innerHTML = '<i class="fas fa-link"></i>';
        copyLinkBtn.title = 'Копировать ссылку';
        copyLinkBtn.onclick = () => copySectionLink(section.id);
        
        actionsDiv.appendChild(focusBtn);
        actionsDiv.appendChild(copyLinkBtn);
        section.appendChild(actionsDiv);
    });
}

function copySectionLink(sectionId) {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Ссылка скопирована в буфер обмена', 'success');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#4CAF50' : '#2196F3',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '4px',
        zIndex: '10000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 5. Улучшенная мобильная навигация
function enhanceMobileNavigation() {
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('navOverlay');
    
    if (!nav || !overlay) return;
    
    // Закрытие навигации при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
    
    // Swipe для закрытия навигации
    let startX = 0;
    overlay.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    overlay.addEventListener('touchmove', (e) => {
        if (startX - e.touches[0].clientX > 50) {
            nav.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
}

// Инициализация всех улучшений
function initWeek1Improvements() {
    initReadingProgress();
    initFocusMode();
    initQuickActions();
    enhanceBookmarks();
    enhanceMobileNavigation();
    
    console.log('Улучшения первой недели загружены');
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    const navOverlay = document.getElementById('navOverlay');
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const themeToggle = document.getElementById('themeToggle');
    const pdfExport = document.getElementById('pdfExport');
    const searchInput = document.querySelector('.search-bar input');
    const body = document.body;

    // Мобильное меню
    if (mobileMenuBtn && nav && navOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });

        navOverlay.addEventListener('click', () => {
            nav.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    }

    // Версия для слабовидящих
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', () => {
            body.classList.toggle('accessibility');
            accessibilityToggle.innerHTML = body.classList.contains('accessibility')
                ? '<i class="fas fa-eye-slash"></i> Обычная версия'
                : '<i class="fas fa-eye"></i> Версия для слабовидящих';
        });
    }

    // Переключение темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> Темная тема';
            }
        });

        // Проверяем сохраненную тему при загрузке
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
        }
    }

    // Экспорт в PDF (дополнено: опция для всего документа)
    if (pdfExport) {
        pdfExport.addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const target = prompt('Экспортировать: "current" - текущую секцию, "all" - весь документ') || 'current';
            let contentElement;
            if (target === 'all') {
                contentElement = document.querySelector('main');
            } else {
                contentElement = document.querySelector('.section:target') || document.querySelector('.section');
            }
            const title = contentElement.querySelector('h2').innerText;
            const content = contentElement.innerText;

            doc.text(`Памятка системного аналитика: ${title}`, 10, 10);
            doc.text(content, 10, 20);
            doc.save(`Памятка-${title.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // Улучшенный поиск
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const term = this.value.toLowerCase().trim();
            if (!term) {
                document.querySelectorAll('.section').forEach(section => {
                    section.style.display = 'block';
                });
                return;
            }

            let found = false;
            document.querySelectorAll('.section').forEach(section => {
                const title = section.querySelector('h2').textContent.toLowerCase();
                const content = section.textContent.toLowerCase();

                if (title.includes(term) || content.includes(term)) {
                    section.style.display = 'block';
                    if (!found) {
                        window.scrollTo({
                            top: section.offsetTop - 100,
                            behavior: 'smooth'
                        });
                        found = true;
                    }
                } else {
                    section.style.display = 'none';
                }
            });

            if (!found) {
                const synonyms = getSynonyms(term);
                synonyms.forEach(synonym => {
                    document.querySelectorAll('.section').forEach(section => {
                        const content = section.textContent.toLowerCase();
                        if (content.includes(synonym)) {
                            section.style.display = 'block';
                            if (!found) {
                                window.scrollTo({
                                    top: section.offsetTop - 100,
                                    behavior: 'smooth'
                                });
                                found = true;
                            }
                        }
                    });
                });
            }
        });
    }

    // База синонимов (дополнено: больше терминов)
    function getSynonyms(term) {
        const synonymsMap = {
            'api': ['интерфейс', 'протокол'],
            'база данных': ['хранилище', 'бд', 'database'],
            'требования': ['условия', 'необходимости', 'требуемое'],
            'анализ': ['исследование', 'изучение', 'разбор'],
            'архитектура': ['структура', 'дизайн системы'],
            'безопасность': ['security', 'защита']
        };
        return synonymsMap[term] || [];
    }

    // Обработчики для кнопок таймера (дополнено: полная логика таймера)
    const start15min = document.getElementById('start-15min');
    const start5min = document.getElementById('start-5min');
    const stopTimerBtn = document.getElementById('stop-timer');
    let timerInterval;

    function startTimer(seconds) {
        clearInterval(timerInterval);
        const timerDisplay = document.getElementById('meeting-timer');
        let timeLeft = seconds;
        timerDisplay.textContent = formatTime(timeLeft);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // Дополнено: звук по окончании
                const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
                audio.play();
                showNotification('Время митинга истекло!', 'info');
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        document.getElementById('meeting-timer').textContent = '00:00';
    }

    if (start15min) start15min.addEventListener('click', () => startTimer(900));
    if (start5min) start5min.addEventListener('click', () => startTimer(300));
    if (stopTimerBtn) stopTimerBtn.addEventListener('click', stopTimer);

    // Кнопка прокрутки наверх
    const scrollButtons = document.querySelectorAll('[id^="scrollToTop"]'); // Исправлено: селектор по ^=
    
    window.onscroll = function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        scrollButtons.forEach(btn => {
            if (scrollPosition > 300) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    };

    scrollButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Инициализация всех систем
    initWeek1Improvements();
    initInteractiveChecklists(); // Дополнено: вызов функции чеклистов (определена ниже)
    initNotesSystem(); // Дополнено: вызов заметок (определена ниже)
    initAdvancedSearch();
    initDocumentGenerator();
    initAPIExamples();
    initBookmarksSystem(); // Дополнено: если есть, иначе пустая

    // Обработка глубоких ссылок
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }

    // Логирование для отладки
    console.log('Все системы инициализированы');
});

// Дополнено: Интерактивные чеклисты
function initInteractiveChecklists() {
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const item = e.target.closest('.checklist-item');
            item.classList.toggle('checked', e.target.checked);
            updateChecklistProgress(item.closest('.checklist-container'));
            saveChecklistState(item.closest('.checklist-container').id); // Дополнено: сохранение
        });
    });

    // Восстановление состояния
    document.querySelectorAll('.checklist-container').forEach(container => {
        restoreChecklistState(container.id);
    });

    // Reset кнопки
    document.querySelectorAll('.checklist-actions .reset').forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.checklist-container');
            container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            container.querySelectorAll('.checklist-item').forEach(item => item.classList.remove('checked'));
            updateChecklistProgress(container);
            localStorage.removeItem(`checklist-${container.id}`);
        });
    });
}

function updateChecklistProgress(container) {
    const total = container.querySelectorAll('.checklist-item').length;
    const checked = container.querySelectorAll('.checklist-item.checked').length;
    const progress = container.querySelector('.progress-stats');
    if (progress) progress.textContent = `${checked}/${total} завершено (${Math.round(checked / total * 100)}%)`;
}

function saveChecklistState(id) {
    const container = document.getElementById(id);
    const checkedItems = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.dataset.id || cb.parentElement.textContent.trim());
    localStorage.setItem(`checklist-${id}`, JSON.stringify(checkedItems));
}

function restoreChecklistState(id) {
    const saved = JSON.parse(localStorage.getItem(`checklist-${id}`)) || [];
    const container = document.getElementById(id);
    container.querySelectorAll('.checklist-item').forEach(item => {
        const label = item.querySelector('label').textContent.trim();
        if (saved.includes(label)) {
            item.querySelector('input').checked = true;
            item.classList.add('checked');
        }
    });
    updateChecklistProgress(container);
}

// Дополнено: Система заметок
function initNotesSystem() {
    const notesContainer = document.querySelector('.notes-container');
    if (!notesContainer) return;

    // Загрузка заметок из localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Рендеринг
    function renderNotes(filteredNotes = notes) {
        const grid = notesContainer.querySelector('.notes-grid');
        if (!grid) return;
        grid.innerHTML = '';
        filteredNotes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'note-card';
            card.innerHTML = `
                <div class="note-card-header">
                    <h4 class="note-card-title">${note.title}</h4>
                    <div class="note-card-actions">
                        <button class="edit-note">Edit</button>
                        <button class="delete-note">Delete</button>
                    </div>
                </div>
                <p class="note-card-content">${note.content}</p>
                <div class="note-card-tags">${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}</div>
                <div class="note-card-footer">Создано: ${new Date(note.date).toLocaleDateString()}</div>
            `;
            grid.appendChild(card);
        });
    }

    // Добавление заметки
    const addBtn = notesContainer.querySelector('.note-actions button');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const title = prompt('Заголовок заметки');
            const content = prompt('Содержание');
            const tags = prompt('Теги (через запятую)').split(',').map(t => t.trim());
            if (title && content) {
                notes.push({ title, content, tags, date: Date.now() });
                localStorage.setItem('notes', JSON.stringify(notes));
                renderNotes();
            }
        });
    }

    // Фильтры по тегам
    const filters = notesContainer.querySelector('.notes-filters');
    if (filters) {
        filters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                const tag = e.target.textContent;
                const filtered = notes.filter(note => note.tags.includes(tag));
                renderNotes(filtered);
            }
        });
    }

    renderNotes();
}

// Дополнено: Быстрые настройки
function applyQuickSettings() {
    const fontSize = document.getElementById('font-size').value;
    const lineHeight = document.getElementById('line-height').value;
    document.body.style.fontSize = fontSize;
    document.body.style.lineHeight = lineHeight;
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('lineHeight', lineHeight);
    document.getElementById('quick-settings').style.display = 'none';
}

// Восстановление настроек
if (localStorage.getItem('fontSize')) {
    document.body.style.fontSize = localStorage.getItem('fontSize');
    document.body.style.lineHeight = localStorage.getItem('lineHeight');
}

// Дополнено: Копирование кода из code-block
document.querySelectorAll('.code-block').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(block.textContent).then(() => showNotification('Код скопирован', 'success'));
    };
    block.appendChild(copyBtn);
});

// Дополнено: Инициализация закладок (если не было)
function initBookmarksSystem() {
    updateBookmarksList();
    document.addEventListener('click', handleBookmarkRemove);
}
