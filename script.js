// ===== ИСПРАВЛЕННЫЙ И ДОПОЛНЕННЫЙ КОД =====

// Глобальные переменные
let apiExamples, docGenerator, advancedSearch, notesSystem;
let timerInterval = null;
let testTimerInterval = null;
let currentTest = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let testStartTime;

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация приложения...');
    
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация тем и доступности
    initThemeAndAccessibility();
    
    // Инициализация всех систем
    initAllSystems();
    
    // Инициализация улучшений
    initWeek1Improvements();
    
    console.log('Все системы успешно инициализированы');
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    const navOverlay = document.getElementById('navOverlay');
    
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
}

// ===== ТЕМЫ И ДОСТУПНОСТЬ =====
function initThemeAndAccessibility() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const themeToggle = document.getElementById('themeToggle');
    
    // Версия для слабовидящих
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', () => {
            document.body.classList.toggle('accessibility');
            const isAccessibility = document.body.classList.contains('accessibility');
            accessibilityToggle.innerHTML = isAccessibility ? 
                '<i class="fas fa-eye-slash"></i> Обычная версия' : 
                '<i class="fas fa-eye"></i> Версия для слабовидящих';
                
            showNotification(isAccessibility ? 'Режим для слабовидящих включен' : 'Обычный режим', 'info');
        });
    }

    // Переключение темы
    if (themeToggle) {
        // Проверяем сохраненную тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            if (isDark) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> Темная тема';
            }
            
            showNotification(isDark ? 'Темная тема включена' : 'Светлая тема включена', 'info');
        });
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕХ СИСТЕМ =====
function initAllSystems() {
    try {
        initAPIExamples();
        initDocumentGenerator();
        initAdvancedSearch();
        initNotesSystem();
        initInteractiveChecklists();
        initBookmarksSystem();
        initCompetencyMap();
        initDataModeling();
        initQuickTools();
        
        // Инициализация обработчиков событий
        initEventHandlers();
        
    } catch (error) {
        console.error('Ошибка инициализации систем:', error);
    }
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function initEventHandlers() {
    // Поиск
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Таймеры
    const start15min = document.getElementById('start-15min');
    const start5min = document.getElementById('start-5min');
    const stopTimerBtn = document.getElementById('stop-timer');
    
    if (start15min) start15min.addEventListener('click', () => startTimer(900));
    if (start5min) start5min.addEventListener('click', () => startTimer(300));
    if (stopTimerBtn) stopTimerBtn.addEventListener('click', stopTimer);
    
    // Кнопка прокрутки наверх
    initScrollToTop();
    
    // Обработка глубоких ссылок
    if (window.location.hash) {
        setTimeout(() => {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
}

// ===== ПОИСК =====
function handleSearch(e) {
    const term = e.target.value.toLowerCase().trim();
    
    if (!term) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'block';
        });
        return;
    }

    let found = false;
    document.querySelectorAll('.section').forEach(section => {
        const title = section.querySelector('h2')?.textContent.toLowerCase() || '';
        const content = section.textContent.toLowerCase();

        if (title.includes(term) || content.includes(term)) {
            section.style.display = 'block';
            if (!found) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                found = true;
            }
        } else {
            section.style.display = 'none';
        }
    });
}

// ===== ПРОКРУТКА НАВЕРХ =====
function initScrollToTop() {
    const scrollButtons = document.querySelectorAll('#scrollToTopBtn');
    
    window.onscroll = function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        scrollButtons.forEach(btn => {
            btn.style.display = scrollPosition > 300 ? 'block' : 'none';
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
}

// ===== API ПРИМЕРЫ =====
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
        try {
            document.getElementById('api-method').value = method;
            document.getElementById('api-url').value = url;
            
            document.getElementById('api-url').scrollIntoView({ behavior: 'smooth' });
            
            if (method === 'GET') {
                setTimeout(() => {
                    document.querySelector('.api-controls button')?.click();
                }, 500);
            }
        } catch (error) {
            console.error('Error trying endpoint:', error);
        }
    }
}

function initAPIExamples() {
    apiExamples = new APIExamples();
    apiExamples.renderExamples();
}

// ===== API ТЕСТЕР =====
async function testAPI() {
    const method = document.getElementById('api-method')?.value;
    const url = document.getElementById('api-url')?.value;
    const output = document.getElementById('api-response-output');
    
    if (!url || !output) {
        showNotification('Ошибка: URL или элемент вывода не найден', 'error');
        return;
    }
    
    output.innerHTML = '<div class="loading">Отправка запроса... <i class="fas fa-spinner fa-spin"></i></div>';
    
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        
        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify({
                title: 'Тестовый запрос от системного аналитика',
                body: 'Это тестовый запрос для проверки API',
                userId: 1
            }, null, 2);
        }
        
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        output.textContent = JSON.stringify(data, null, 2);
        showNotification('Запрос выполнен успешно', 'success');
        
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}\n\nРекомендации:\n1. Проверить URL\n2. Убедиться, что CORS разрешен\n3. Использовать расширение для обхода CORS`;
        showNotification('Ошибка при выполнении запроса', 'error');
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
        document.querySelectorAll('.doc-type-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                this.selectType(type);
            });
        });
        
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
            const docContent = document.getElementById('docContent');
            if (docContent) {
                docContent.value = content;
            }
        }
    }
    
    generateSRS(template) {
        const basic = `SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

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
4.2. Модели анализа`;
        
        const detailed = `ДЕТАЛИЗИРОВАННАЯ СПЕЦИФИКАЦИЯ ТРЕБОВАНИЙ К ПО

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

6. ОГРАНИЧЕНИЯ И ЗАВИСИМОСТИ`;
        
        return template === 'detailed' ? detailed : basic;
    }
    
    generateUserStories(template) {
        return `ПОЛЬЗОВАТЕЛЬСКИЕ ИСТОРИИ

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

ПРИОРИТЕТЫ:
Высокий: US-001, US-002
Средний: US-010`;
    }
    
    generateAPISpec(template) {
        return `СПЕЦИФИКАЦИЯ REST API

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
500 - Ошибка сервера`;
    }
    
    generateTestCases(template) {
        return `ТЕСТОВЫЕ СЦЕНАРИИ

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
     Шазы:
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
- Соответствие требованиям > 95%`;
    }
    
    download() {
        const contentElement = document.getElementById('docContent');
        if (!contentElement) {
            showNotification('Документ не найден', 'error');
            return;
        }
        
        const content = contentElement.value;
        if (!content.trim()) {
            showNotification('Документ пуст', 'warning');
            return;
        }
        
        try {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${this.currentType}-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showNotification('Документ скачан', 'success');
        } catch (error) {
            console.error('Download error:', error);
            showNotification('Ошибка при скачивании', 'error');
        }
    }
    
    clear() {
        const docContent = document.getElementById('docContent');
        if (docContent) {
            docContent.value = '';
            showNotification('Документ очищен', 'info');
        }
    }
}

function initDocumentGenerator() {
    docGenerator = new DocumentGenerator();
}

// ===== СИСТЕМА ЗАМЕТОК =====
class NotesSystem {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('userNotes')) || [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }
    
    init() {
        this.render();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('notes-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.render();
            });
        }
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                const tag = e.target.dataset.tag;
                this.currentFilter = tag;
                this.updateActiveFilter();
                this.render();
            }
        });
    }
    
    addNote(title, content, tags = []) {
        const newNote = {
            id: 'note_' + Date.now(),
            title: title.trim(),
            content: content.trim(),
            tags: tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.notes.unshift(newNote);
        this.save();
        this.render();
        showNotification('Заметка добавлена', 'success');
        return newNote;
    }
    
    updateNote(noteId, updates) {
        const noteIndex = this.notes.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            this.notes[noteIndex] = {
                ...this.notes[noteIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.save();
            this.render();
            showNotification('Заметка обновлена', 'success');
        }
    }
    
    deleteNote(noteId) {
        if (confirm('Удалить эту заметку?')) {
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.save();
            this.render();
            showNotification('Заметка удалена', 'success');
        }
    }
    
    save() {
        localStorage.setItem('userNotes', JSON.stringify(this.notes));
    }
    
    getFilteredNotes() {
        let filtered = this.notes;
        
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(note => 
                note.tags.includes(this.currentFilter)
            );
        }
        
        if (this.searchTerm) {
            filtered = filtered.filter(note => 
                note.title.toLowerCase().includes(this.searchTerm) ||
                note.content.toLowerCase().includes(this.searchTerm) ||
                note.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
            );
        }
        
        return filtered;
    }
    
    getAllTags() {
        const allTags = new Set();
        this.notes.forEach(note => {
            note.tags.forEach(tag => allTags.add(tag));
        });
        return Array.from(allTags);
    }
    
    updateActiveFilter() {
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.toggle('active', tag.dataset.tag === this.currentFilter);
        });
    }
    
    render() {
        const container = document.getElementById('notesList');
        if (!container) return;
        
        const filteredNotes = this.getFilteredNotes();
        const allTags = this.getAllTags();
        
        const filtersContainer = document.getElementById('notesFilters');
        if (filtersContainer) {
            filtersContainer.innerHTML = `
                <div class="filter-tag ${this.currentFilter === 'all' ? 'active' : ''}" data-tag="all">Все</div>
                ${allTags.map(tag => `
                    <div class="filter-tag ${this.currentFilter === tag ? 'active' : ''}" data-tag="${tag}">${tag}</div>
                `).join('')}
            `;
        }
        
        if (filteredNotes.length === 0) {
            container.innerHTML = `
                <div class="no-notes">
                    <i class="fas fa-sticky-note"></i>
                    <p>${this.searchTerm || this.currentFilter !== 'all' ? 'Заметки не найдены' : 'Пока нет заметок'}</p>
                    ${!this.searchTerm && this.currentFilter === 'all' ? 
                        '<button onclick="notesSystem.showEditor()" class="quick-link">Создать первую заметку</button>' : ''}
                </div>
            `;
        } else {
            container.innerHTML = filteredNotes.map(note => `
                <div class="note-card" data-note-id="${note.id}">
                    <div class="note-card-header">
                        <h3 class="note-card-title">${this.escapeHtml(note.title)}</h3>
                        <div class="note-card-actions">
                            <button onclick="notesSystem.editNote('${note.id}')" title="Редактировать">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="notesSystem.deleteNote('${note.id}')" title="Удалить">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="note-card-content">${this.formatContent(note.content)}</div>
                    ${note.tags.length > 0 ? `
                        <div class="note-card-tags">
                            ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="note-card-footer">
                        Создано: ${this.formatDate(note.createdAt)}
                        ${note.updatedAt !== note.createdAt ? `<br>Обновлено: ${this.formatDate(note.updatedAt)}` : ''}
                    </div>
                </div>
            `).join('');
        }
    }
    
    showEditor(noteId = null) {
        const note = noteId ? this.notes.find(n => n.id === noteId) : null;
        
        const editorHtml = `
            <div class="note-editor">
                <h3>${note ? 'Редактировать заметку' : 'Новая заметка'}</h3>
                <input type="text" class="note-input" id="noteTitle" 
                       placeholder="Заголовок заметки" value="${note ? this.escapeHtml(note.title) : ''}">
                <textarea class="note-input" id="noteContent" rows="6" 
                          placeholder="Содержание заметки...">${note ? this.escapeHtml(note.content) : ''}</textarea>
                <div class="note-tags-input" id="noteTagsContainer">
                    ${note ? note.tags.map(tag => `
                        <span class="note-tag">
                            ${tag}
                            <span class="remove" onclick="notesSystem.removeTag(this)">×</span>
                        </span>
                    `).join('') : ''}
                </div>
                <input type="text" class="note-input" id="newTag" placeholder="Добавить тег (нажмите Enter)">
                <div class="note-actions">
                    <button onclick="notesSystem.saveNote('${note ? note.id : ''}')" class="quick-link">
                        ${note ? 'Обновить' : 'Сохранить'}
                    </button>
                    <button onclick="notesSystem.hideEditor()" class="quick-link" style="background: #6c757d;">
                        Отмена
                    </button>
                </div>
            </div>
        `;
        
        const container = document.getElementById('notesList');
        container.innerHTML = editorHtml + container.innerHTML;
        
        const newTagInput = document.getElementById('newTag');
        if (newTagInput) {
            newTagInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTagToEditor(e.target.value);
                    e.target.value = '';
                }
            });
        }
    }
    
    hideEditor() {
        this.render();
    }
    
    addTagToEditor(tag) {
        tag = tag.trim();
        if (!tag) return;
        
        const container = document.getElementById('noteTagsContainer');
        if (container) {
            const tagElement = document.createElement('span');
            tagElement.className = 'note-tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="remove" onclick="notesSystem.removeTag(this)">×</span>
            `;
            container.appendChild(tagElement);
        }
    }
    
    removeTag(element) {
        element.parentElement.remove();
    }
    
    saveNote(noteId = null) {
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');
        const tagsContainer = document.getElementById('noteTagsContainer');
        
        if (!titleInput || !contentInput || !tagsContainer) {
            showNotification('Ошибка: элементы формы не найдены', 'error');
            return;
        }
        
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const tags = Array.from(tagsContainer.querySelectorAll('.note-tag'))
            .map(tag => tag.textContent.replace('×', '').trim());
        
        if (!title) {
            showNotification('Введите заголовок заметки', 'warning');
            return;
        }
        
        if (noteId) {
            this.updateNote(noteId, { title, content, tags });
        } else {
            this.addNote(title, content, tags);
        }
    }
    
    editNote(noteId) {
        this.showEditor(noteId);
    }
    
    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    formatContent(content) {
        if (!content) return '';
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleString('ru-RU');
    }
}

function initNotesSystem() {
    notesSystem = new NotesSystem();
    
    const notesContainer = document.getElementById('knowledge-base');
    if (notesContainer) {
        const existingToolbar = notesContainer.querySelector('.notes-toolbar');
        if (!existingToolbar) {
            const toolbar = document.createElement('div');
            toolbar.className = 'notes-toolbar';
            toolbar.innerHTML = `
                <input type="text" id="notes-search" placeholder="Поиск в заметках..." class="note-input">
                <div id="notesFilters" class="notes-filters"></div>
                <button onclick="notesSystem.showEditor()" class="quick-link">
                    <i class="fas fa-plus"></i> Новая заметка
                </button>
            `;
            
            const notesList = document.getElementById('notesList');
            if (notesList) {
                notesContainer.insertBefore(toolbar, notesList);
            } else {
                notesContainer.appendChild(toolbar);
                const newNotesList = document.createElement('div');
                newNotesList.id = 'notesList';
                newNotesList.className = 'notes-grid';
                notesContainer.appendChild(newNotesList);
            }
        }
    }
}

// ===== БЫСТРЫЕ ИНСТРУМЕНТЫ =====
function initQuickTools() {
    initUnitConverter();
    initEmailTemplates();
    initDecisionTree();
}

// Конвертер величин
function initUnitConverter() {
    window.convertUnits = function() {
        const inputValue = parseFloat(document.getElementById('input-value')?.value) || 0;
        const inputUnit = document.getElementById('input-unit')?.value;
        const outputUnit = document.getElementById('output-unit')?.value;
        const outputElement = document.getElementById('output-value');
        
        if (!inputUnit || !outputUnit || !outputElement) return;
        
        let result;
        
        // Конвертация данных
        if (['kb', 'mb', 'gb'].includes(inputUnit) && ['kb', 'mb', 'gb'].includes(outputUnit)) {
            const units = { 'kb': 1, 'mb': 1024, 'gb': 1024 * 1024 };
            result = (inputValue * units[inputUnit]) / units[outputUnit];
        }
        // Конвертация времени
        else if (['ms', 's'].includes(inputUnit) && ['ms', 's'].includes(outputUnit)) {
            if (inputUnit === 'ms' && outputUnit === 's') result = inputValue / 1000;
            else if (inputUnit === 's' && outputUnit === 'ms') result = inputValue * 1000;
            else result = inputValue;
        }
        else {
            result = inputValue;
        }
        
        outputElement.value = result.toFixed(2);
    };
}

// Шаблоны писем
function initEmailTemplates() {
    const templates = {
        clarification: `Уважаемый(ая) [Имя],

У меня возник вопрос по поводу [тема]. Не могли бы вы уточнить следующие моменты:
1. [Вопрос 1]
2. [Вопрос 2]

Заранее благодарен за ответ.

С уважением,
[Ваше имя]`,

        meeting: `Уважаемый(ая) [Имя],

Приглашаю вас на встречу, посвященную [тема встречи]. 
Встреча запланирована на [дата] в [время].

Повестка:
1. [Пункт 1]
2. [Пункт 2]

Прошу подтвердить ваше участие.

С уважением,
[Ваше имя]`,

        review: `Уважаемый(ая) [Имя],

Прошу вас провести ревью [документ/код] по проекту [название проекта].

Сроки: до [дата].

Критерии ревью:
1. [Критерий 1]
2. [Критерий 2]

Благодарю за помощь!

С уважением,
[Ваше имя]`,

        update: `Уважаемый(ая) [Имя],

Хочу проинформировать вас о статусе задачи [название задачи].

Текущий статус: [статус]
Выполнено: [перечень выполненного]
Планы: [планы на ближайшее время]
Блокировки: [если есть]

Готов ответить на ваши вопросы.

С уважением,
[Ваше имя]`
    };

    window.showTemplate = function(templateKey) {
        const templateContent = document.getElementById('template-content');
        const templateText = document.getElementById('template-text');
        
        if (templateContent && templateText) {
            templateContent.style.display = 'block';
            templateText.value = templates[templateKey] || '';
        }
    };

    window.copyTemplate = function() {
        const templateText = document.getElementById('template-text');
        if (templateText) {
            templateText.select();
            document.execCommand('copy');
            showNotification('Шаблон скопирован в буфер обмена', 'success');
        }
    };
}

// Decision Tree
function initDecisionTree() {
    window.showStep = function(step, answer) {
        const step1 = document.getElementById('tree-step-1');
        const step2 = document.getElementById('tree-step-2');
        const result = document.getElementById('tree-result');
        
        if (step === 2) {
            if (step1) step1.style.display = 'none';
            if (step2) step2.style.display = 'block';
            
            const question = document.getElementById('step2-question');
            const options = document.getElementById('step2-options');
            
            if (question && options) {
                if (answer === 'yes') {
                    question.textContent = 'Требования часто меняются?';
                    options.innerHTML = `
                        <button onclick="showResult('scrum')">Да</button>
                        <button onclick="showResult('kanban')">Нет</button>
                    `;
                } else {
                    question.textContent = 'Проект требует быстрого вывода на рынок?';
                    options.innerHTML = `
                        <button onclick="showResult('agile')">Да</button>
                        <button onclick="showResult('waterfall')">Нет</button>
                    `;
                }
            }
        }
    };

    window.showResult = function(method) {
        const step2 = document.getElementById('tree-step-2');
        const result = document.getElementById('tree-result');
        const resultText = document.getElementById('result-text');
        
        if (step2) step2.style.display = 'none';
        if (result) result.style.display = 'block';
        
        const recommendations = {
            'scrum': 'Scrum - итеративная методология с фиксированными спринтами',
            'kanban': 'Kanban - метод управления потоком работ с визуализацией',
            'agile': 'Гибкая методология (Agile) - адаптивный подход к разработке',
            'waterfall': 'Водопадная модель (Waterfall) - последовательный подход'
        };
        
        if (resultText) {
            resultText.textContent = recommendations[method] || 'Методология не определена';
        }
    };

    window.resetTree = function() {
        const step1 = document.getElementById('tree-step-1');
        const step2 = document.getElementById('tree-step-2');
        const result = document.getElementById('tree-result');
        
        if (step1) step1.style.display = 'block';
        if (step2) step2.style.display = 'none';
        if (result) result.style.display = 'none';
    };
}

// ===== ТАЙМЕРЫ =====
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer(seconds) {
    stopTimer();
    let timeLeft = seconds;
    const timerElement = document.getElementById('meeting-timer');
    
    if (!timerElement) {
        showNotification('Элемент таймера не найден', 'error');
        return;
    }
    
    timerElement.textContent = formatTime(timeLeft);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerElement.textContent = '00:00';
            showNotification('Время митинга истекло!', 'info');
            return;
        }
        
        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);
    }, 1000);
    
    showNotification(`Таймер запущен на ${formatTime(seconds)}`, 'success');
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        const timerElement = document.getElementById('meeting-timer');
        if (timerElement) {
            timerElement.textContent = '00:00';
        }
        showNotification('Таймер остановлен', 'info');
    }
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
    `;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== СИСТЕМА ТЕСТИРОВАНИЯ =====
const testQuestions = {
    requirements: [
        {
            question: "Что такое функциональные требования?",
            options: [
                "Описание того, что система должна делать",
                "Характеристики производительности системы",
                "Требования к безопасности системы",
                "Требования к удобству использования"
            ],
            answer: 0
        },
        {
            question: "Что означает критерий INVEST для user stories?",
            options: [
                "Independent, Negotiable, Valuable, Estimable, Small, Testable",
                "Integrated, Negotiable, Valuable, Estimable, Simple, Testable",
                "Independent, Negotiable, Visible, Estimable, Small, Testable",
                "Integrated, Negotiable, Visible, Estimable, Simple, Testable"
            ],
            answer: 0
        }
    ],
    api: [
        {
            question: "Какой HTTP-метод используется для создания ресурса в REST API?",
            options: ["GET", "POST", "PUT", "DELETE"],
            answer: 1
        },
        {
            question: "Что означает статус код 404?",
            options: [
                "Успешный запрос",
                "Ошибка сервера",
                "Ресурс не найден",
                "Запрещено"
            ],
            answer: 2
        }
    ]
};

function startTest() {
    const sectionSelect = document.getElementById('test-section');
    const questionCountInput = document.getElementById('question-count');
    
    if (!sectionSelect || !questionCountInput) {
        showNotification('Элементы тестирования не найдены', 'error');
        return;
    }
    
    const section = sectionSelect.value;
    const questionCount = parseInt(questionCountInput.value) || 5;
    
    let questions = testQuestions[section];
    if (!questions || questions.length === 0) {
        showNotification('Тест для этого раздела пока недоступен', 'warning');
        return;
    }
    
    questions = questions.slice(0, Math.min(questionCount, questions.length));
    currentTest = questions;
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    
    const testContent = document.getElementById('testContent');
    const totalQuestions = document.getElementById('total-questions');
    
    if (testContent && totalQuestions) {
        testContent.style.display = 'block';
        totalQuestions.textContent = questions.length;
    }
    
    testStartTime = new Date();
    startTestTimer();
    showQuestion(currentQuestionIndex);
    showNotification(`Тест начат! Вопросов: ${questions.length}`, 'success');
}

function showQuestion(index) {
    const question = currentTest[index];
    const questionsContainer = document.getElementById('testQuestions');
    const currentQuestionElement = document.getElementById('current-question');
    
    if (!questionsContainer || !currentQuestionElement) return;
    
    currentQuestionElement.textContent = index + 1;
    
    const questionHtml = `
        <div class="test-question">
            <h4>${question.question}</h4>
            <div class="test-options">
                ${question.options.map((option, i) => `
                    <div class="test-option ${userAnswers[index] === i ? 'selected' : ''}" 
                         onclick="selectOption(${i})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    questionsContainer.innerHTML = questionHtml;
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    showQuestion(currentQuestionIndex);
}

function nextQuestion() {
    if (currentQuestionIndex < currentTest.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function submitTest() {
    clearInterval(testTimerInterval);
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - testStartTime) / 1000);
    
    let correctCount = 0;
    const resultsHtml = currentTest.map((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        if (isCorrect) correctCount++;
        
        return `
            <div class="result-item">
                <p><strong>Вопрос ${index + 1}:</strong> ${question.question}</p>
                <p>Ваш ответ: <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                    ${question.options[userAnswers[index]] || 'Нет ответа'}
                </span></p>
                ${!isCorrect ? `<p>Правильный ответ: <span class="correct-answer">${question.options[question.answer]}</span></p>` : ''}
            </div>
        `;
    }).join('');
    
    const percentage = Math.round((correctCount / currentTest.length) * 100);
    const testResult = document.getElementById('testResult');
    
    if (testResult) {
        testResult.innerHTML = `
            <div class="result-summary">
                <h3>Результаты тестирования</h3>
                <p>Правильных ответов: ${correctCount} из ${currentTest.length} (${percentage}%)</p>
                <p>Затраченное время: ${formatTime(timeTaken)}</p>
                <p>${percentage >= 80 ? 'Отлично!' : percentage >= 60 ? 'Хорошо!' : 'Попробуйте еще раз!'}</p>
            </div>
            <div class="result-details">
                ${resultsHtml}
            </div>
            <button onclick="startTest()" style="margin-top:20px; padding: 10px 20px;">Пройти тест снова</button>
        `;
    }
    
    showNotification(`Тест завершен! Результат: ${percentage}%`, percentage >= 60 ? 'success' : 'warning');
}

function startTestTimer() {
    clearInterval(testTimerInterval);
    let seconds = 0;
    const timerElement = document.getElementById('test-timer');
    
    if (!timerElement) return;
    
    testTimerInterval = setInterval(() => {
        seconds++;
        timerElement.textContent = formatTime(seconds);
    }, 1000);
}

// ===== СИСТЕМА ЗАКЛАДОК =====
function initBookmarksSystem() {
    createBookmarkButtons();
    restoreBookmarksState();
    updateBookmarksList();
    
    const bookmarksList = document.getElementById('bookmarksList');
    if (bookmarksList) {
        bookmarksList.addEventListener('click', handleBookmarkRemove);
    }
}

function createBookmarkButtons() {
    document.querySelectorAll('.section').forEach(section => {
        const id = section.id;
        const h2 = section.querySelector('h2');
        if (!h2 || h2.querySelector('.bookmark-btn')) return;

        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.setAttribute('aria-label', 'Добавить в закладки');
        bookmarkBtn.dataset.section = id;
        bookmarkBtn.innerHTML = `
            <i class="far fa-bookmark"></i>
            <span class="bookmark-tooltip">Добавить в закладки</span>
        `;
        
        bookmarkBtn.addEventListener('click', toggleBookmark);
        h2.appendChild(bookmarkBtn);
    });
}

function restoreBookmarksState() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(id => {
        const btn = document.querySelector(`.bookmark-btn[data-section="${id}"]`);
        if (btn) {
            btn.innerHTML = `
                <i class="fas fa-bookmark"></i>
                <span class="bookmark-tooltip">Удалить из закладок</span>
            `;
            btn.classList.add('active');
        }
    });
}

function toggleBookmark(event) {
    const btn = event.currentTarget;
    const sectionId = btn.dataset.section;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    if (bookmarks.includes(sectionId)) {
        bookmarks = bookmarks.filter(id => id !== sectionId);
        btn.innerHTML = `
            <i class="far fa-bookmark"></i>
            <span class="bookmark-tooltip">Добавить в закладки</span>
        `;
        btn.classList.remove('active');
        showNotification('Закладка удалена', 'info');
    } else {
        bookmarks.push(sectionId);
        btn.innerHTML = `
            <i class="fas fa-bookmark"></i>
            <span class="bookmark-tooltip">Удалить из закладок</span>
        `;
        btn.classList.add('active');
        showNotification('Закладка добавлена', 'success');
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarksList();
}

function updateBookmarksList() {
    const bookmarksList = document.getElementById('bookmarksList');
    if (!bookmarksList) return;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (bookmarks.length === 0) {
        bookmarksList.innerHTML = '<li class="no-bookmarks"><i class="far fa-frown"></i> Пока нет сохраненных закладок</li>';
    } else {
        bookmarksList.innerHTML = '';
        bookmarks.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;

            const title = section.querySelector('h2')?.textContent || 'Без названия';
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
    }
    
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
    showNotification('Закладка удалена', 'info');
}

function updateBookmarksCounter() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const counter = document.querySelector('.bookmarks-counter');
    
    if (counter) {
        counter.textContent = bookmarks.length;
        counter.style.display = bookmarks.length ? 'inline-block' : 'none';
    }
}

// ===== ИНТЕРАКТИВНЫЕ ЧЕКЛИСТЫ =====
function initInteractiveChecklists() {
    document.querySelectorAll('.checklist, .highlight-box ul').forEach(container => {
        try {
            enhanceChecklist(container);
        } catch (error) {
            console.error('Error enhancing checklist:', error, container);
        }
    });
}

function enhanceChecklist(container) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const checklistId = container.id || `checklist-${Date.now()}`;
    
    if (checkboxes.length === 0) return;
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'checklist-progress';
    
    if (container.parentNode) {
        container.parentNode.insertBefore(progressContainer, container);
    }
    
    checkboxes.forEach((checkbox, index) => {
        const listItem = checkbox.closest('li');
        if (!listItem) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'checklist-item';
        wrapper.innerHTML = listItem.innerHTML;
        
        listItem.innerHTML = '';
        listItem.appendChild(wrapper);
        
        const newCheckbox = wrapper.querySelector('input[type="checkbox"]');
        const label = wrapper.querySelector('label');
        
        if (label) {
            label.setAttribute('for', newCheckbox.id);
        }
        
        const savedState = loadChecklistState(checklistId, index);
        if (savedState) {
            newCheckbox.checked = true;
            wrapper.classList.add('checked');
        }
        
        newCheckbox.addEventListener('change', function() {
            wrapper.classList.toggle('checked', this.checked);
            saveChecklistState(checklistId, index, this.checked);
            updateChecklistProgress(container, progressContainer, checklistId);
        });
    });
    
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'checklist-actions';
    actionsContainer.innerHTML = `
        <button class="select-all">Выбрать все</button>
        <button class="deselect-all">Снять все</button>
        <button class="reset">Сбросить прогресс</button>
    `;
    
    if (container.parentNode) {
        if (container.nextSibling) {
            container.parentNode.insertBefore(actionsContainer, container.nextSibling);
        } else {
            container.parentNode.appendChild(actionsContainer);
        }
    }
    
    actionsContainer.querySelector('.select-all').addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });
    });
    
    actionsContainer.querySelector('.deselect-all').addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });
    });
    
    actionsContainer.querySelector('.reset').addEventListener('click', () => {
        if (confirm('Сбросить весь прогресс для этого чеклиста?')) {
            resetChecklistState(checklistId);
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.dispatchEvent(new Event('change'));
            });
        }
    });
    
    updateChecklistProgress(container, progressContainer, checklistId);
}

function updateChecklistProgress(container, progressContainer, checklistId) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const progress = total > 0 ? Math.round((checked / total) * 100) : 0;
    
    progressContainer.innerHTML = `
        <div class="progress-header">
            <h4>Прогресс выполнения</h4>
            <div class="progress-stats">${checked}/${total} (${progress}%)</div>
        </div>
        <div class="progress-bar" style="height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
            <div class="progress-fill" style="height: 100%; background: #4CAF50; width: ${progress}%; transition: width 0.3s ease;"></div>
        </div>
    `;
}

function loadChecklistState(checklistId, itemIndex) {
    const saved = JSON.parse(localStorage.getItem('checklists')) || {};
    return saved[`${checklistId}-${itemIndex}`];
}

function saveChecklistState(checklistId, itemIndex, checked) {
    const saved = JSON.parse(localStorage.getItem('checklists')) || {};
    const key = `${checklistId}-${itemIndex}`;
    
    if (checked) {
        saved[key] = true;
    } else {
        delete saved[key];
    }
    
    localStorage.setItem('checklists', JSON.stringify(saved));
}

function resetChecklistState(checklistId) {
    const saved = JSON.parse(localStorage.getItem('checklists')) || {};
    Object.keys(saved).forEach(key => {
        if (key.startsWith(checklistId)) {
            delete saved[key];
        }
    });
    localStorage.setItem('checklists', JSON.stringify(saved));
}

// ===== КАРТА КОМПЕТЕНЦИЙ =====
function initCompetencyMap() {
    const checkboxes = document.querySelectorAll('#competency-map input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', function() {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updateCompetencyProgress();
        });
    });
    
    updateCompetencyProgress();
    
    const saveProgressBtn = document.getElementById('saveProgressBtn');
    if (saveProgressBtn) {
        saveProgressBtn.addEventListener('click', () => {
            showNotification('Прогресс сохранен', 'success');
        });
    }
}

function updateCompetencyProgress() {
    const checkboxes = document.querySelectorAll('#competency-map input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
    
    const skillsCompleted = document.getElementById('skills-completed');
    const skillsTotal = document.getElementById('skills-total');
    const progressFill = document.querySelector('.progress-fill');
    
    if (skillsCompleted) skillsCompleted.textContent = checked;
    if (skillsTotal) skillsTotal.textContent = total;
    if (progressFill) {
        progressFill.style.width = percentage + '%';
        progressFill.textContent = percentage + '%';
    }
}

// ===== МОДЕЛИРОВАНИЕ ДАННЫХ =====
function initDataModeling() {
    // Базовая инициализация инструментов моделирования данных
    console.log('Инструменты моделирования данных инициализированы');
}

// ===== УЛУЧШЕНИЯ ПЕРВОЙ НЕДЕЛИ =====
function initWeek1Improvements() {
    initReadingProgress();
    initFocusMode();
    initQuickActions();
    enhanceBookmarks();
    enhanceMobileNavigation();
}

function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        
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
    };

    window.deactivateFocusMode = function() {
        const focusOverlay = document.querySelector('.focus-mode');
        if (focusOverlay) {
            focusOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                focusOverlay.innerHTML = '';
            }, 300);
        }
    };

    focusOverlay.addEventListener('click', function(e) {
        if (e.target === focusOverlay) {
            deactivateFocusMode();
        }
    });
}

function initQuickActions() {
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    
    const actions = [
        { icon: 'fas fa-search', title: 'Поиск', action: () => {
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) searchInput.focus();
        }},
        { icon: 'fas fa-bookmark', title: 'Закладки', action: () => {
            const bookmarksSection = document.getElementById('bookmarks');
            if (bookmarksSection) bookmarksSection.scrollIntoView({ behavior: 'smooth' });
        }},
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

function enhanceBookmarks() {
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
    }).catch(() => {
        showNotification('Не удалось скопировать ссылку', 'error');
    });
}

function enhanceMobileNavigation() {
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('navOverlay');
    
    if (!nav || !overlay) return;
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
    
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
            const title = section.querySelector('h2')?.textContent || '';
            const content = section.textContent;
            const type = this.detectContentType(section);
            const category = this.detectCategory(section);
            
            this.searchIndex.push({
                id,
                title,
                content: content.substring(0, 1000),
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
        const id = section.id;
        if (id.includes('api') || id.includes('rest') || id.includes('graphql')) return 'api';
        if (id.includes('db') || id.includes('data')) return 'database';
        if (id.includes('security')) return 'security';
        if (id.includes('bpmn') || id.includes('uml')) return 'modeling';
        return 'general';
    }
    
    setupSearchUI() {
        // Реализация расширенного поиска будет добавлена позже
        console.log('Расширенный поиск инициализирован');
    }
}

function initAdvancedSearch() {
    advancedSearch = new AdvancedSearch();
}
