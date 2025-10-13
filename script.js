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
        document.getElementById('docTemplate').addEventListener('change', () => {
            if (this.currentType) {
                this.generate();
            }
        });
    }
    
    selectType(type) {
        this.currentType = type;
        
        // Обновляем UI
        document.querySelectorAll('.doc-type-card').forEach(card => {
            card.classList.toggle('active', card.dataset.type === type);
        });
        
        document.getElementById('docEditor').style.display = 'block';
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
        
        searchContainer.appendChild(advancedSearch);
        
        // Обработчики событий
        const searchInput = searchContainer.querySelector('input');
        searchInput.addEventListener('focus', () => {
            advancedSearch.style.display = 'block';
        });
        
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                advancedSearch.style.display = 'none';
            }
        });
        
        // Обработчики фильтров
        advancedSearch.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', () => this.performSearch());
        });
        
        searchInput.addEventListener('input', () => this.performSearch());
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
            // Фильтрация по типу и категории
            if (typeFilter !== 'all' && item.type !== typeFilter) return false;
            if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
            
            // Поиск по тексту
            if (!searchTerm) return true;
            
            return item.title.toLowerCase().includes(searchTerm) ||
                   item.content.toLowerCase().includes(searchTerm);
        });
        
        this.currentResults = results;
        this.displayResults(results, searchTerm);
    }
    
    displayResults(results, searchTerm) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>Ничего не найдено</p>
                    <p>Попробуйте изменить критерии поиска</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = `
            <div class="search-results-info">
                Найдено: ${results.length} результатов
            </div>
            ${results.map(item => this.formatResultItem(item, searchTerm)).join('')}
        `;
    }
    
    formatResultItem(item, searchTerm) {
        const preview = this.getTextPreview(item.content, searchTerm);
        
        return `
            <div class="search-result-item" data-section="${item.id}">
                <h4 class="search-result-title">
                    <a href="#${item.id}" onclick="advancedSearch.navigateToResult('${item.id}')">
                        ${this.highlightText(item.title, searchTerm)}
                    </a>
                </h4>
                <div class="search-result-preview">${preview}</div>
                <div class="search-result-meta">
                    <span class="badge">${item.type}</span>
                    <span class="badge">${item.category}</span>
                </div>
            </div>
        `;
    }
    
    getTextPreview(text, searchTerm, length = 150) {
        if (!searchTerm) return text.substring(0, length) + '...';
        
        const index = text.toLowerCase().indexOf(searchTerm);
        if (index === -1) return text.substring(0, length) + '...';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + searchTerm.length + 100);
        let preview = text.substring(start, end);
        
        if (start > 0) preview = '...' + preview;
        if (end < text.length) preview = preview + '...';
        
        return this.highlightText(preview, searchTerm);
    }
    
    highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    navigateToResult(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            section.classList.add('highlight-animation');
            setTimeout(() => {
                section.classList.remove('highlight-animation');
            }, 2000);
        }
        
        // Скрываем результаты поиска
        document.querySelector('.advanced-search').style.display = 'none';
    }
}

let advancedSearch;

function initAdvancedSearch() {
    advancedSearch = new AdvancedSearch();
}

// Объявляем глобальные переменные
let timerInterval = null;
let testTimerInterval = null;

// Основные функции для работы с таймером
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer(seconds) {
    console.log(`Запуск таймера на ${seconds} секунд`);
    clearInterval(timerInterval);
    let timeLeft = seconds;
    const timerElement = document.getElementById('meeting-timer');

    if (!timerElement) {
        console.error('Элемент #meeting-timer не найден');
        alert('Ошибка: Элемент таймера не найден в HTML');
        return;
    }

    timerElement.textContent = formatTime(timeLeft);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerElement.textContent = '00:00';
            alert('Время митинга истекло!');
            return;
        }

        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);
    }, 1000);
}

function stopTimer() {
    console.log('Остановка таймера');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        const timerElement = document.getElementById('meeting-timer');
        if (timerElement) {
            timerElement.textContent = '00:00';
        }
    }
}

// ===== ИНТЕРАКТИВНЫЕ ЧЕКЛИСТЫ =====

function initInteractiveChecklists() {
    // Обработка всех чеклистов на странице
    document.querySelectorAll('.checklist, .highlight-box ul').forEach(container => {
        enhanceChecklist(container);
    });
}

function enhanceChecklist(container) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const checklistId = container.id || `checklist-${Date.now()}`;
    
    if (checkboxes.length === 0) return;
    
    // Создаем контейнер для прогресса
    const progressContainer = document.createElement('div');
    progressContainer.className = 'checklist-progress';
    
    // Добавляем прогресс перед чеклистом
    container.parentNode.insertBefore(progressContainer, container);
    
    // Обертываем каждый пункт
    checkboxes.forEach((checkbox, index) => {
        const listItem = checkbox.closest('li');
        if (!listItem) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'checklist-item';
        wrapper.innerHTML = listItem.innerHTML;
        
        // Заменяем содержимое li
        listItem.innerHTML = '';
        listItem.appendChild(wrapper);
        
        // Обновляем чекбокс
        const newCheckbox = wrapper.querySelector('input[type="checkbox"]');
        const label = wrapper.querySelector('label');
        
        if (label) {
            label.setAttribute('for', newCheckbox.id);
        }
        
        // Загружаем сохраненное состояние
        const savedState = loadChecklistState(checklistId, index);
        if (savedState) {
            newCheckbox.checked = true;
            wrapper.classList.add('checked');
        }
        
        // Обработчик изменения
        newCheckbox.addEventListener('change', function() {
            wrapper.classList.toggle('checked', this.checked);
            saveChecklistState(checklistId, index, this.checked);
            updateChecklistProgress(container, progressContainer, checklistId);
        });
    });
    
    // Добавляем кнопки действий
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'checklist-actions';
    actionsContainer.innerHTML = `
        <button class="select-all">Выбрать все</button>
        <button class="deselect-all">Снять все</button>
        <button class="reset">Сбросить прогресс</button>
    `;
    
    container.parentNode.insertBefore(actionsContainer, container.nextSibling);
    
    // Обработчики для кнопок
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
    
    // Инициализируем прогресс
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

// ===== УЛУЧШЕННАЯ СИСТЕМА ЗАМЕТОК =====

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
        // Поиск по заметкам
        const searchInput = document.getElementById('notes-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.render();
            });
        }
        
        // Фильтры по тегам
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
        }
    }
    
    deleteNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.save();
        this.render();
    }
    
    save() {
        localStorage.setItem('userNotes', JSON.stringify(this.notes));
    }
    
    getFilteredNotes() {
        let filtered = this.notes;
        
        // Фильтрация по тегу
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(note => 
                note.tags.includes(this.currentFilter)
            );
        }
        
        // Поиск
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
        
        // Рендерим фильтры
        const filtersContainer = document.getElementById('notesFilters');
        if (filtersContainer) {
            filtersContainer.innerHTML = `
                <div class="filter-tag ${this.currentFilter === 'all' ? 'active' : ''}" data-tag="all">Все</div>
                ${allTags.map(tag => `
                    <div class="filter-tag ${this.currentFilter === tag ? 'active' : ''}" data-tag="${tag}">${tag}</div>
                `).join('')}
            `;
        }
        
        // Рендерим заметки
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
        
        // Обработчик добавления тегов
        document.getElementById('newTag').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTagToEditor(e.target.value);
                e.target.value = '';
            }
        });
    }
    
    hideEditor() {
        this.render();
    }
    
    addTagToEditor(tag) {
        tag = tag.trim();
        if (!tag) return;
        
        const container = document.getElementById('noteTagsContainer');
        const tagElement = document.createElement('span');
        tagElement.className = 'note-tag';
        tagElement.innerHTML = `
            ${tag}
            <span class="remove" onclick="notesSystem.removeTag(this)">×</span>
        `;
        container.appendChild(tagElement);
    }
    
    removeTag(element) {
        element.parentElement.remove();
    }
    
    saveNote(noteId = null) {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();
        const tags = Array.from(document.getElementById('noteTagsContainer').querySelectorAll('.note-tag'))
            .map(tag => tag.textContent.replace('×', '').trim());
        
        if (!title) {
            alert('Введите заголовок заметки');
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
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    formatContent(content) {
        // Простой Markdown-like форматирование
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleString('ru-RU');
    }
}

// Инициализация системы заметок
let notesSystem;

function initNotesSystem() {
    notesSystem = new NotesSystem();
    
    // Добавляем кнопку создания заметки в тулбар
    const notesContainer = document.getElementById('knowledge-base');
    if (notesContainer) {
        const toolbar = document.createElement('div');
        toolbar.className = 'notes-toolbar';
        toolbar.innerHTML = `
            <input type="text" id="notes-search" placeholder="Поиск в заметках..." class="note-input">
            <div id="notesFilters" class="notes-filters"></div>
            <button onclick="notesSystem.showEditor()" class="quick-link">
                <i class="fas fa-plus"></i> Новая заметка
            </button>
        `;
        
        const existingToolbar = notesContainer.querySelector('.notes-toolbar');
        if (existingToolbar) {
            existingToolbar.remove();
        }
        
        const notesList = document.getElementById('notesList');
        notesContainer.insertBefore(toolbar, notesList);
    }
}

// Новый код для системы тестирования
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
    ],
    db: [
        {
            question: "Что такое первая нормальная форма (1NF)?",
            options: [
                "Отсутствие транзитивных зависимостей",
                "Атомарность значений в столбцах",
                "Отсутствие частичных зависимостей",
                "Все ключи уникальны"
            ],
            answer: 1
        },
        {
            question: "Какой тип JOIN возвращает все записи из левой таблицы?",
            options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
            answer: 1
        }
    ],
    bpmn: [
        {
            question: "Какой элемент BPMN обозначает точку принятия решений?",
            options: ["Задача", "Событие", "Шлюз", "Пул"],
            answer: 2
        }
    ],
    security: [
        {
            question: "Что такое SQL-инъекция?",
            options: [
                "Метод оптимизации SQL-запросов",
                "Уязвимость, позволяющая выполнить произвольный SQL-код",
                "Техника соединения таблиц в SQL",
                "Метод шифрования данных в БД"
            ],
            answer: 1
        }
    ],
    ddd: [
        {
            question: "Что означает DDD в разработке ПО?",
            options: [
                "Data-Driven Development",
                "Domain-Driven Design",
                "Database Development",
                "Dynamic Design"
            ],
            answer: 1
        }
    ]
};

let currentTest = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let testStartTime;

function startTest() {
    const section = document.getElementById('test-section').value;
    const questionCount = parseInt(document.getElementById('question-count').value) || 10;
    const randomOrder = document.getElementById('random-order').checked;
    
    // Получаем вопросы для выбранного раздела
    let questions = [...testQuestions[section]];
    
    if (!questions || questions.length === 0) {
        alert('Тест для этого раздела пока недоступен');
        return;
    }
    
    // Выбираем случайные вопросы если нужно
    if (questions.length > questionCount) {
        if (randomOrder) {
            questions = shuffleArray(questions).slice(0, questionCount);
        } else {
            questions = questions.slice(0, questionCount);
        }
    }
    
    currentTest = questions;
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    
    // Обновляем UI
    document.getElementById('testContent').style.display = 'block';
    document.getElementById('total-questions').textContent = questions.length;
    
    // Запускаем таймер теста
    testStartTime = new Date();
    startTestTimer();
    
    // Показываем первый вопрос
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = currentTest[index];
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
    
    document.getElementById('testQuestions').innerHTML = questionHtml;
    document.getElementById('current-question').textContent = index + 1;
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
    
    // Подсчет результатов
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
    
    document.getElementById('testResult').innerHTML = `
        <div class="result-summary">
            <h3>Результаты тестирования</h3>
            <p>Правильных ответов: ${correctCount} из ${currentTest.length} (${percentage}%)</p>
            <p>Затраченное время: ${formatTime(timeTaken)}</p>
        </div>
        <div class="result-details">
            ${resultsHtml}
        </div>
        <button onclick="startTest()" style="margin-top:20px;">Пройти тест снова</button>
    `;
}

function startTestTimer() {
    clearInterval(testTimerInterval);
    let seconds = 0;
    
    testTimerInterval = setInterval(() => {
        seconds++;
        document.getElementById('test-timer').textContent = formatTime(seconds);
    }, 1000);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

document.addEventListener('DOMContentLoaded', () => {
    // Обработчики для кнопок таймера
    document.getElementById('start-15min').addEventListener('click', () => startTimer(900));
    document.getElementById('start-5min').addEventListener('click', () => startTimer(300));
    document.getElementById('stop-timer').addEventListener('click', stopTimer);
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    const navOverlay = document.getElementById('navOverlay');
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const themeToggle = document.getElementById('themeToggle');
    const pdfExport = document.getElementById('pdfExport');
    const searchInput = document.querySelector('.search-bar input');
    const bookmarksList = document.getElementById('bookmarksList');

    // Мобильное меню
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
    });

    navOverlay.addEventListener('click', () => {
        nav.classList.remove('active');
        navOverlay.classList.remove('active');
    });

    // Версия для слабовидящих
    accessibilityToggle.addEventListener('click', () => {
        body.classList.toggle('accessibility');
        accessibilityToggle.innerHTML = body.classList.contains('accessibility')
            ? '<i class="fas fa-eye-slash"></i> Обычная версия'
            : '<i class="fas fa-eye"></i> Версия для слабовидящих';
    });

    // Переключение темы
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

    // Экспорт в PDF
    pdfExport.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const section = document.querySelector('.section:target') || document.querySelector('.section');
        const sectionTitle = section.querySelector('h2').innerText;
        const content = section.innerText;

        doc.text(`Памятка системного аналитика: ${sectionTitle}`, 10, 10);
        doc.text(content, 10, 20);
        doc.save(`Памятка-${sectionTitle.replace(/\s+/g, '_')}.pdf`);
    });

    // Улучшенный поиск
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

    // База синонимов
    function getSynonyms(term) {
        const synonymsMap = {
            'api': ['интерфейс', 'протокол'],
            'база данных': ['хранилище', 'бд', 'database'],
            'требования': ['условия', 'необходимости', 'требуемое'],
            'анализ': ['исследование', 'изучение', 'разбор']
        };
        return synonymsMap[term] || [];
    }

    // Decision Tree
    window.showStep = (step, choice) => {
        const step1 = document.getElementById('tree-step-1');
        const step2 = document.getElementById('tree-step-2');
        const result = document.getElementById('tree-result');
        const step2Question = document.getElementById('step2-question');
        const step2Options = document.getElementById('step2-options');
        const resultText = document.getElementById('result-text');

        if (step === 2) {
            step1.style.display = 'none';
            step2.style.display = 'block';
            if (choice === 'yes') {
                step2Question.textContent = 'Проект большой и долгосрочный?';
                step2Options.innerHTML = `
                    <button onclick="showResult('Waterfall')">Да</button>
                    <button onclick="showResult('Scrum')">Нет</button>
                `;
            } else {
                step2Question.textContent = 'Требуется быстрая доставка ценности?';
                step2Options.innerHTML = `
                    <button onclick="showResult('Scrum')">Да</button>
                    <button onclick="showResult('Kanban')">Нет</button>
                `;
            }
        }
    };

    window.showResult = (methodology) => {
        document.getElementById('tree-step-2').style.display = 'none';
        document.getElementById('tree-result').style.display = 'block';
        document.getElementById('result-text').textContent = methodology;
    };

    window.resetTree = () => {
        document.getElementById('tree-step-1').style.display = 'block';
        document.getElementById('tree-step-2').style.display = 'none';
        document.getElementById('tree-result').style.display = 'none';
    };

    // Генератор ER-диаграмм (упрощенный пример)
    window.generateERDiagram = () => {
        const input = document.getElementById('er-input').value;
        const output = document.getElementById('er-output');
        output.innerHTML = `<pre>${input.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</pre>`;
    };

    // Конструктор SQL-запросов
    window.generateSQL = () => {
        const table = document.getElementById('sql-table').value;
        const fields = Array.from(document.querySelectorAll('#sql-fields input:checked')).map(input => input.value);
        const query = `SELECT ${fields.join(', ')} FROM ${table};`;
        document.getElementById('sql-output').textContent = query;
    };

    // Простой SQL редактор
    window.runSQL = () => {
        const sql = document.getElementById('sql-editor').value;
        const schema = document.getElementById('db-schema').value;
        alert(`Выполняется SQL: ${sql}\nДля схемы: ${schema}`);
    };

window.testAPI = async () => {
    const method = document.getElementById('api-method').value;
    const url = document.getElementById('api-url').value;
    const output = document.getElementById('api-response-output');
    
    // Добавляем индикатор загрузки
    output.textContent = "Отправка запроса...";
    
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        
        // Для POST/PUT добавляем тело запроса
        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify({
                title: 'Запрос от системного аналитика',
                body: 'Это тестовый запрос',
                userId: 1
            });
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        
        // Для отладки
        console.error('API Error:', error);
    }
};

    // Конвертер величин
    window.convertUnits = () => {
        const inputValue = parseFloat(document.getElementById('input-value').value);
        const inputUnit = document.getElementById('input-unit').value;
        const outputUnit = document.getElementById('output-unit').value;

        const factors = {
            kb: 1,
            mb: 1024,
            gb: 1024 * 1024,
            ms: 1,
            s: 1000
        };

        const dataUnits = ['kb', 'mb', 'gb'];
        const timeUnits = ['ms', 's'];

        if ((dataUnits.includes(inputUnit) && timeUnits.includes(outputUnit)) ||
            (timeUnits.includes(inputUnit) && dataUnits.includes(outputUnit))) {
            document.getElementById('output-value').value = "Несовместимые единицы";
            return;
        }

        const result = inputValue * factors[inputUnit] / factors[outputUnit];
        document.getElementById('output-value').value = result.toFixed(4);
    };

    // Шаблоны писем
    window.showTemplate = (type) => {
        const templates = {
            clarification: 'Уважаемый(ая) [Имя],\n\nМогли бы вы уточнить [вопрос/деталь]? Это поможет нам [цель].\n\nСпасибо,\n[Ваше имя]',
            meeting: 'Уважаемые коллеги,\n\nПриглашаю вас на встречу по [тема] [дата] в [время]. Пожалуйста, подтвердите участие.\n\nС уважением,\n[Ваше имя]',
            review: 'Коллеги,\n\nПрошу ознакомиться с [документ] и предоставить обратную связь до [дата].\n\nСпасибо,\n[Ваше имя]',
            update: 'Добрый день,\n\nПо задаче [номер/название] текущий статус: [статус]. Следующие шаги: [действия].\n\nС уважением,\n[Ваше имя]'
        };
        const templateContent = document.getElementById('template-content');
        const templateText = document.getElementById('template-text');
        templateText.value = templates[type] || '';
        templateContent.style.display = 'block';
    };

    window.copyTemplate = () => {
        const templateText = document.getElementById('template-text');
        templateText.select();
        document.execCommand('copy');
        alert('Шаблон скопирован в буфер обмена');
    };

    // Генератор диаграмм (упрощенный пример)
    window.generateDiagram = () => {
        const input = document.getElementById('diagram-input').value;
        const output = document.getElementById('diagram-output');
        output.innerHTML = `<pre>${input.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</pre>`;
    };

    // Диаграмма процессов
    window.addTask = () => {
        const diagram = document.getElementById('bpmn-diagram');
        const task = document.createElement('div');
        task.className = 'bpmn-task';
        task.innerHTML = '<div class="task-label">Новая задача</div>';
        diagram.appendChild(task);
    };

    // Карта компетенций
    window.toggleCompetency = (element) => {
        const ul = element.querySelector('ul');
        ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
    };

    // Заметки
    window.addNote = () => {
        const title = document.getElementById('new-note-title').value.trim();
        if (!title) return;

        const noteId = 'note_' + Date.now();
        const notes = JSON.parse(localStorage.getItem('userNotes')) || [];

        const newNote = {
            id: noteId,
            title: title,
            content: '',
            createdAt: new Date().toISOString()
        };

        notes.push(newNote);
        localStorage.setItem('userNotes', JSON.stringify(notes));
        renderNotes();

        document.getElementById('new-note-title').value = '';
    };

    window.updateNoteTitle = (noteId, element) => {
        const notes = JSON.parse(localStorage.getItem('userNotes')) || [];
        const note = notes.find(n => n.id === noteId);
        if (note) {
            note.title = element.textContent.trim();
            localStorage.setItem('userNotes', JSON.stringify(notes));
            renderNotes();
        }
    };

    window.updateNoteContent = (noteId, element) => {
        const notes = JSON.parse(localStorage.getItem('userNotes')) || [];
        const note = notes.find(n => n.id === noteId);
        if (note) {
            note.content = element.textContent.trim();
            localStorage.setItem('userNotes', JSON.stringify(notes));
            renderNotes();
        }
    };

    window.deleteNote = (noteId) => {
        let notes = JSON.parse(localStorage.getItem('userNotes')) || [];
        notes = notes.filter(note => note.id !== noteId);
        localStorage.setItem('userNotes', JSON.stringify(notes));
        renderNotes();
    };

    window.renderNotes = () => {
        const notesList = document.getElementById('notesList');
        const notes = JSON.parse(localStorage.getItem('userNotes')) || [];

        notesList.innerHTML = '';

        if (notes.length === 0) {
            notesList.innerHTML = '<p>У вас пока нет заметок</p>';
            return;
        }

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            noteElement.innerHTML = `
                <div class="note-header">
                    <h3 contenteditable="true" onblur="updateNoteTitle('${note.id}', this)">${note.title}</h3>
                    <button onclick="deleteNote('${note.id}')"><i class="fas fa-trash"></i></button>
                </div>
                <div class="note-content" contenteditable="true" onblur="updateNoteContent('${note.id}', this)">${note.content || 'Нажмите, чтобы редактировать...'}</div>
                <div class="note-footer">Создано: ${new Date(note.createdAt).toLocaleString()}</div>
            `;
            notesList.appendChild(noteElement);
        });
    };

    // Тесты
    const testQuestions = {
        requirements: [
            {
                question: "Что относится к функциональным требованиям?",
                options: [
                    "Скорость загрузки страницы",
                    "Возможность регистрации пользователей",
                    "Цветовая схема интерфейса",
                    "Совместимость с браузерами"
                ],
                answer: 1
            },
            {
                question: "Что такое нефункциональные требования?",
                options: [
                    "Требования к функциям системы",
                    "Требования к характеристикам системы",
                    "Требования к бизнес-процессам",
                    "Требования к интерфейсу"
                ],
                answer: 1
            }
        ],
        api: [
            {
                question: "Что означает REST?",
                options: [
                    "Remote Execution and Storage Technology",
                    "Representational State Transfer",
                    "Reliable Enterprise Service Transport",
                    "Rapid Execution and Synchronization Technique"
                ],
                answer: 1
            }
        ]
    };

    window.startTest = () => {
        const section = document.getElementById('test-section').value;
        const questions = testQuestions[section];

        if (!questions) {
            alert('Тест для этого раздела пока недоступен');
            return;
        }

        const testContent = document.getElementById('testQuestions');
        testContent.innerHTML = '';

        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'test-question';
            questionDiv.innerHTML = `<h4>${index + 1}. ${q.question}</h4>`;

            q.options.forEach((option, optIndex) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'test-option';
                optionDiv.innerHTML = `
                    <input type="radio" name="q${index}" value="${optIndex}" id="q${index}o${optIndex}">
                    <label for="q${index}o${optIndex}">${option}</label>
                `;
                questionDiv.appendChild(optionDiv);
            });

            testContent.appendChild(questionDiv);
        });

        document.querySelector('.test-selection').style.display = 'none';
        document.getElementById('testContent').style.display = 'block';
    };

    window.submitTest = () => {
        const section = document.getElementById('test-section').value;
        const questions = testQuestions[section];
        let correct = 0;

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected && parseInt(selected.value) === q.answer) {
                correct++;
            }
        });

        const result = document.getElementById('testResult');
        result.innerHTML = `
            <h3>Результат теста</h3>
            <p>Правильных ответов: ${correct} из ${questions.length}</p>
            <p>Процент правильных ответов: ${Math.round((correct/questions.length)*100)}%</p>
            <button onclick="location.reload()">Пройти еще раз</button>
        `;
    };

    // Закладки - улучшенная реализация
    // Инициализация системы закладок
    initBookmarksSystem();
    
    function initBookmarksSystem() {
        const bookmarksList = document.getElementById('bookmarksList');
        if (!bookmarksList) {
        console.error('Элемент #bookmarksList не найден');
        return;
    }
        
        // Создаем кнопки закладок
        createBookmarkButtons();
        
        // Восстанавливаем состояние из localStorage
        restoreBookmarksState();
        
        // Обновляем список закладок
        updateBookmarksList();
        
        // Добавляем глобальный обработчик для удаления закладок
        document.getElementById('bookmarksList').addEventListener('click', handleBookmarkRemove);
    }

    
function createBookmarkButtons() {
    const existingButtons = document.querySelectorAll('.bookmark-btn');
    if (existingButtons.length > 0) return;
    document.querySelectorAll('.section').forEach(section => {
        const id = section.id;
        const h2 = section.querySelector('h2');
        if (!h2) return;
        if (h2.querySelector('.bookmark-btn')) return;

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
        // Удаляем закладку
        bookmarks = bookmarks.filter(id => id !== sectionId);
        btn.innerHTML = `
            <i class="far fa-bookmark"></i>
            <span class="bookmark-tooltip">Добавить в закладки</span>
        `;
        btn.classList.remove('active');
    } else {
        // Добавляем закладку
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
        
        // Обновляем счетчик в заголовке
        updateBookmarksCounter();
    }

    function handleBookmarkRemove(event) {
    if (!event.target.closest('.remove-bookmark')) return;
    
    const sectionId = event.target.closest('.remove-bookmark').dataset.section;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(id => id !== sectionId);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    // Обновляем кнопку в разделе
    const sectionBtn = document.querySelector(`.bookmark-btn[data-section="${sectionId}"]`);
    if (sectionBtn) {
        // УБИРАЕМ ПОПЫТКУ ОБРАЩЕНИЯ К .bookmark-tooltip
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

    // Код ER-редактора
    const erCanvas = document.getElementById('er-canvas');
    let entities = [];
    let selectedEntity = null;
    
    // Добавление сущности
    document.getElementById('addEntity').addEventListener('click', function() {
        const entityId = 'entity_' + Date.now();
        const entity = {
            id: entityId,
            name: 'НоваяСущность',
            attributes: [
                {name: 'id', type: 'int', pk: true},
                {name: 'name', type: 'varchar(255)'}
            ],
            x: 50 + entities.length * 20,
            y: 50 + entities.length * 20,
            color: '#4e73df'
        };
        
        entities.push(entity);
        renderERDiagram();
    });
    
    // Генерация SQL
    document.getElementById('generateSqlBtn').addEventListener('click', function() {
        let sqlCode = '';
        
        entities.forEach(entity => {
            sqlCode += `CREATE TABLE ${entity.name} (\n`;
            sqlCode += `    id INT PRIMARY KEY AUTO_INCREMENT,\n`;
            
            entity.attributes.forEach(attr => {
                sqlCode += `    ${attr.name} ${attr.type.toUpperCase()}`;
                if (attr.pk) sqlCode += ' PRIMARY KEY';
                if (attr.fk) sqlCode += ' REFERENCES ' + attr.references;
                sqlCode += ',\n';
            });
            
            // Удаляем последнюю запятую
            sqlCode = sqlCode.slice(0, -2) + '\n';
            sqlCode += `);\n\n`;
        });
        
        document.getElementById('sql-preview').textContent = sqlCode;
    });
    
    // Очистка диаграммы
    document.getElementById('clearDiagram').addEventListener('click', function() {
        entities = [];
        renderERDiagram();
        document.getElementById('sql-preview').textContent = '-- SQL-код появится здесь';
        document.querySelector('.entity-properties').style.display = 'none';
    });
    
    // Визуализация диаграммы
    function renderERDiagram() {
        erCanvas.innerHTML = '';
        
        entities.forEach(entity => {
            const entityDiv = document.createElement('div');
            entityDiv.className = 'entity';
            entityDiv.id = entity.id;
            entityDiv.style.left = entity.x + 'px';
            entityDiv.style.top = entity.y + 'px';
            entityDiv.style.backgroundColor = entity.color;
            
            entityDiv.innerHTML = `
                <div class="entity-header">${entity.name}</div>
                <div class="attributes">
                    ${entity.attributes.map(attr => 
                        `<div class="attribute">${attr.name}: ${attr.type}${attr.pk ? ' PK' : ''}</div>`
                    ).join('')}
                </div>
            `;
            
            // Обработчик выбора сущности
            entityDiv.addEventListener('click', function(e) {
                e.stopPropagation();
                selectEntity(entity);
            });
            
            erCanvas.appendChild(entityDiv);
        });
    }
    
    // Выбор сущности
    function selectEntity(entity) {
        selectedEntity = entity;
        document.querySelector('.entity-properties').style.display = 'block';
        document.getElementById('entity-name').value = entity.name;
        document.getElementById('entity-color').value = entity.color;
    }
    
    // Сохранение свойств сущности
    document.getElementById('saveEntityProps').addEventListener('click', function() {
        if (!selectedEntity) return;
        
        selectedEntity.name = document.getElementById('entity-name').value;
        selectedEntity.color = document.getElementById('entity-color').value;
        renderERDiagram();
    });
    
    // Применение шаблонов
    document.querySelectorAll('.apply-pattern').forEach(button => {
        button.addEventListener('click', function() {
            const pattern = this.closest('.pattern-card').querySelector('h4').textContent;
            
            entities = [];
            
            if (pattern.includes('Пользователи и роли')) {
                entities = [
                    {
                        id: 'entity1',
                        name: 'Пользователь',
                        attributes: [
                            {name: 'id', type: 'int', pk: true},
                            {name: 'name', type: 'varchar(255)'},
                            {name: 'email', type: 'varchar(255)'}
                        ],
                        x: 50,
                        y: 50,
                        color: '#4e73df'
                    },
                    {
                        id: 'entity2',
                        name: 'Роль',
                        attributes: [
                            {name: 'id', type: 'int', pk: true},
                            {name: 'name', type: 'varchar(100)'}
                        ],
                        x: 250,
                        y: 50,
                        color: '#36b9cc'
                    }
                ];
            } else if (pattern.includes('Электронная коммерция')) {
                entities = [
                    {
                        id: 'entity1',
                        name: 'Заказ',
                        attributes: [
                            {name: 'id', type: 'int', pk: true},
                            {name: 'date', type: 'datetime'},
                            {name: 'total', type: 'decimal(10,2)'}
                        ],
                        x: 50,
                        y: 50,
                        color: '#1cc88a'
                    },
                    {
                        id: 'entity2',
                        name: 'Товар',
                        attributes: [
                            {name: 'id', type: 'int', pk: true},
                            {name: 'name', type: 'varchar(255)'},
                            {name: 'price', type: 'decimal(10,2)'}
                        ],
                        x: 250,
                        y: 50,
                        color: '#f6c23e'
                    }
                ];
            }
            
            renderERDiagram();
            document.querySelector('.entity-properties').style.display = 'none';
        });
    });
    
    // ===== ДОБАВЛЯЕМ КОД ДЛЯ API ПРИМЕРОВ ЗДЕСЬ =====
    // Добавляем примеры API при загрузке
    const apiExamples = [
        {name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/posts'},
        {name: 'ReqRes', url: 'https://reqres.in/api/users'},
        {name: 'HTTPBin', url: 'https://httpbin.org/get'},
        {name: 'DummyJSON', url: 'https://dummyjson.com/products/1'}
    ];
    
    const examplesList = document.querySelector('#external-integration .highlight-box ul');
    if (examplesList) {
        examplesList.innerHTML = '';
        
        apiExamples.forEach(api => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${api.name}:</strong> <span class="api-url">${api.url}</span>`;
            examplesList.appendChild(li);
            
            // Добавляем обработчик клика для быстрой вставки URL
            li.addEventListener('click', () => {
                document.getElementById('api-url').value = api.url;
            });
        });
    }
    // ===== КОНЕЦ ДОБАВЛЕНИЯ КОДА ДЛЯ API ПРИМЕРОВ =====

    // Обработка глубоких ссылок
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }

    // Завершаем обработчиками для тестовой системы
    document.querySelector('.test-selection button').addEventListener('click', startTest);
    document.querySelector('.test-controls button[onclick="submitTest()"]').addEventListener('click', submitTest);

    renderNotes();
    // Инициализация ER-диаграммы
    renderERDiagram();

    // Логирование для отладки
    console.log('script.js загружен, функции startTimer и stopTimer определены');

    // ===== КОД ДЛЯ КАРТЫ КОМПЕТЕНЦИЙ =====
if (document.querySelector('.competency-list')) {
    // Подсчет общего количества компетенций
    const totalSkills = document.querySelectorAll('.competency-list input').length;
    document.getElementById('skills-total').textContent = totalSkills;
    
    // Функция обновления прогресса
    function updateProgress() {
        const completedSkills = document.querySelectorAll('.competency-list input:checked').length;
        const progress = (completedSkills / totalSkills) * 100;
        
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-fill').textContent = `${Math.round(progress)}%`;
        document.getElementById('skills-completed').textContent = completedSkills;
    }
    
    // Обработка кликов по чекбоксам
    document.querySelectorAll('.competency-list input').forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    // Кнопка сохранения прогресса
    document.getElementById('saveProgressBtn').addEventListener('click', function() {
        const progress = [];
        
        document.querySelectorAll('.competency-list input').forEach(checkbox => {
            progress.push({
                id: checkbox.id,
                checked: checkbox.checked
            });
        });
        
        // Сохранение в localStorage
        localStorage.setItem('competencyProgress', JSON.stringify(progress));
        alert('Прогресс успешно сохранен!');
    });
    
    // Загрузка сохраненного прогресса
    const savedProgress = localStorage.getItem('competencyProgress');
    if (savedProgress) {
        JSON.parse(savedProgress).forEach(item => {
            const checkbox = document.getElementById(item.id);
            if (checkbox) {
                checkbox.checked = item.checked;
            }
        });
        updateProgress();
    }
}
// ===== КОНЕЦ КОДА ДЛЯ КАРТЫ КОМПЕТЕНЦИЙ =====
// Получаем все кнопки
        const scrollButtons = document.querySelectorAll('#scrollToTopBtn');
        
        // Обработчик прокрутки страницы
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

        // Обработчик клика по кнопкам
        scrollButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
});
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
        { icon: 'fas fa-search', title: 'Поиск', action: () => document.querySelector('.search-bar input').focus() },
        { icon: 'fas fa-bookmark', title: 'Закладки', action: () => scrollToSection('bookmarks') },
        { icon: 'fas fa-expand', title: 'Режим фокусировки', action: () => activateFocusModeForCurrent() },
        { icon: 'fas fa-moon', title: 'Тема', action: () => document.getElementById('themeToggle').click() }
    ];

    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'quick-action-btn';
        btn.innerHTML = `<i class="${action.icon}"></i>`;
        btn.title = action.title;
        btn.onclick = action.action;
        quickActions.appendChild(btn);
    });

    document.body.appendChild(quickActions);
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

// Добавляем вызов в конец DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Инициализируем улучшения первой недели
    initWeek1Improvements();
});
