document.addEventListener('DOMContentLoaded', () => {
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

    // Тестирование API
    window.testAPI = async () => {
        const method = document.getElementById('api-method').value;
        const url = document.getElementById('api-url').value;
        const output = document.getElementById('api-response-output');
        try {
            const response = await fetch(url, { method });
            const data = await response.json();
            output.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            output.textContent = `Ошибка: ${error.message}`;
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
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация системы закладок
    initBookmarksSystem();
    
    function initBookmarksSystem() {
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
        document.querySelectorAll('.section').forEach(section => {
            const id = section.id;
            const h2 = section.querySelector('h2');
            if (!h2) return;

            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.className = 'bookmark-btn';
            bookmarkBtn.setAttribute('aria-label', 'Добавить в закладки');
            bookmarkBtn.dataset.section = id;
            bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            
            // Добавляем всплывающую подсказку
            const tooltip = document.createElement('span');
            tooltip.className = 'bookmark-tooltip';
            tooltip.textContent = 'Добавить в закладки';
            bookmarkBtn.appendChild(tooltip);
            
            bookmarkBtn.addEventListener('click', toggleBookmark);
            h2.appendChild(bookmarkBtn);
        });
    }

    function restoreBookmarksState() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.forEach(id => {
            const btn = document.querySelector(`.bookmark-btn[data-section="${id}"]`);
            if (btn) {
                btn.innerHTML = '<i class="fas fa-bookmark"></i>';
                btn.querySelector('.bookmark-tooltip').textContent = 'Удалить из закладок';
                btn.classList.add('active');
            }
        });
    }

    function toggleBookmark(event) {
        const btn = event.currentTarget;
        const sectionId = btn.dataset.section;
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const tooltip = btn.querySelector('.bookmark-tooltip');

        if (bookmarks.includes(sectionId)) {
            // Удаляем закладку
            bookmarks = bookmarks.filter(id => id !== sectionId);
            btn.innerHTML = '<i class="far fa-bookmark"></i>';
            tooltip.textContent = 'Добавить в закладки';
            btn.classList.remove('active');
            
            // Анимация удаления
            btn.classList.add('pulse');
            setTimeout(() => btn.classList.remove('pulse'), 300);
        } else {
            // Добавляем закладку
            bookmarks.push(sectionId);
            btn.innerHTML = '<i class="fas fa-bookmark"></i>';
            tooltip.textContent = 'Удалить из закладок';
            btn.classList.add('active');
            
            // Анимация добавления
            btn.classList.add('heartbeat');
            setTimeout(() => btn.classList.remove('heartbeat'), 300);
        }

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        updateBookmarksList();
        
        // Показываем уведомление
        showBookmarkNotification(bookmarks.includes(sectionId), sectionId);
    }

    function updateBookmarksList() {
        const bookmarksList = document.getElementById('bookmarksList');
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
            sectionBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            sectionBtn.querySelector('.bookmark-tooltip').textContent = 'Добавить в закладки';
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
});

    // Таймер для митинга
    let timerInterval = null;

    window.startTimer = (seconds) => {
        console.log(`Запуск таймера на ${seconds} секунд`); // Для отладки
        clearInterval(timerInterval); // Очищаем предыдущий таймер
        let timeLeft = seconds;
        const timerElement = document.getElementById('meeting-timer');

        if (!timerElement) {
            console.error('Элемент #meeting-timer не найден');
            alert('Ошибка: Элемент таймера не найден в HTML');
            return;
        }

        timerElement.textContent = formatTime(timeLeft); // Устанавливаем начальное время
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
    };

    window.stopTimer = () => {
        console.log('Остановка таймера'); // Для отладки
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            const timerElement = document.getElementById('meeting-timer');
            if (timerElement) {
                timerElement.textContent = '00:00'; // Сбрасываем отображение
            }
        }
    };

    // Вспомогательная функция для форматирования времени
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // Обработка глубоких ссылок
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
    
    // Инициализация закладок и заметок
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(id => {
        const btn = document.querySelector(`.bookmark-btn[data-section="${id}"]`);
        if (btn) btn.innerHTML = '<i class="fas fa-bookmark"></i>';
    });
    updateBookmarksList();
    renderNotes();

    // Логирование для отладки
    console.log('script.js загружен, функции startTimer и stopTimer определены');
});
