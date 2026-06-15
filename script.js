document.addEventListener('DOMContentLoaded', () => {
    // --- Тема, доступность, PDF ---
    const themeBtn = document.getElementById('themeToggle');
    const accessBtn = document.getElementById('accessibilityToggle');
    const pdfBtn = document.getElementById('pdfExportBtn');
    if(themeBtn) themeBtn.onclick = () => document.body.classList.toggle('dark-theme');
    if(accessBtn) accessBtn.onclick = () => document.body.classList.toggle('accessibility');
    if(pdfBtn) pdfBtn.onclick = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;
        doc.setFontSize(16);
        doc.text('Памятка системного аналитика', 10, y);
        y += 10;
        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('h2')?.innerText || '';
            doc.setFontSize(12);
            doc.text(title, 10, y);
            y += 6;
            const text = card.innerText.slice(0, 600);
            const lines = doc.splitTextToSize(text, 180);
            doc.text(lines, 10, y);
            y += lines.length * 5 + 10;
            if(y > 270) { doc.addPage(); y = 20; }
        });
        doc.save('analyst_guide.pdf');
    };

    // --- Мобильное меню ---
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('navOverlay');
    if(menuBtn) menuBtn.onclick = () => { sidebar.classList.toggle('active'); overlay.classList.toggle('active'); };
    if(overlay) overlay.onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };

    // --- Поиск ---
    const searchInput = document.getElementById('globalSearch');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.card').forEach(card => {
                const match = card.innerText.toLowerCase().includes(term);
                card.style.display = match ? 'block' : 'none';
            });
        });
    }

    // --- Конвертер величин ---
    const convInput = document.getElementById('conv-input');
    const convFrom = document.getElementById('conv-from');
    const convOutput = document.getElementById('conv-output');
    const convertBtn = document.getElementById('convertBtn');
    if(convertBtn) convertBtn.onclick = () => {
        let val = parseFloat(convInput.value) || 0;
        let from = convFrom.value;
        let res = val;
        if(from === 'kb') res = val / 1024;
        if(from === 'gb') res = val * 1024;
        convOutput.value = res.toFixed(2) + ' МБ';
    };

    // --- Таймер митинга (один экземпляр) ---
    let timerInterval = null;
    const timerDisplay = document.getElementById('meetingTimerDisplay');
    function startMeetingTimer(seconds) {
        if(timerInterval) clearInterval(timerInterval);
        let left = seconds;
        const update = () => {
            let mins = Math.floor(left / 60);
            let secs = left % 60;
            if(timerDisplay) timerDisplay.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
            if(left <= 0) clearInterval(timerInterval);
            else left--;
        };
        update();
        timerInterval = setInterval(update, 1000);
    }
    document.querySelectorAll('[data-time]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let sec = parseInt(e.target.dataset.time);
            startMeetingTimer(sec);
        });
    });
    const stopTimerBtn = document.getElementById('stopMeetingTimer');
    if(stopTimerBtn) stopTimerBtn.onclick = () => { if(timerInterval) clearInterval(timerInterval); if(timerDisplay) timerDisplay.textContent = '00:00'; };

    // --- Decision Tree ---
    const step1 = document.getElementById('tree-step1');
    const step2 = document.getElementById('tree-step2');
    const resultDiv = document.getElementById('tree-result');
    const step2Question = document.getElementById('step2-question');
    const step2Options = document.getElementById('step2-options');
    const resultSpan = document.getElementById('result-text');
    window.treeStep = (ans) => {
        step1.style.display = 'none';
        step2.style.display = 'block';
        if(ans === 'yes') {
            step2Question.innerText = 'Требования часто меняются?';
            step2Options.innerHTML = `<button class="btn-primary" onclick="showMethod('scrum')">Да</button><button class="btn-primary" onclick="showMethod('kanban')">Нет</button>`;
        } else {
            step2Question.innerText = 'Нужен быстрый выход на рынок?';
            step2Options.innerHTML = `<button class="btn-primary" onclick="showMethod('agile')">Да</button><button class="btn-primary" onclick="showMethod('waterfall')">Нет</button>`;
        }
    };
    window.showMethod = (m) => {
        step2.style.display = 'none';
        resultDiv.style.display = 'block';
        const map = { scrum:'Scrum', kanban:'Kanban', agile:'Agile', waterfall:'Waterfall' };
        resultSpan.innerText = map[m] || m;
    };
    document.getElementById('resetTreeBtn')?.addEventListener('click', () => {
        step1.style.display = 'block';
        step2.style.display = 'none';
        resultDiv.style.display = 'none';
    });
    document.querySelectorAll('[data-tree]').forEach(btn => btn.addEventListener('click', (e) => treeStep(e.target.dataset.tree)));

    // --- Моделирование данных (сущности + SQL) ---
    let entities = [];
    const entitiesContainer = document.getElementById('entitiesList');
    const sqlPreview = document.getElementById('sqlPreview');
    function renderEntities() {
        if(!entitiesContainer) return;
        entitiesContainer.innerHTML = entities.map((e,i) => `<div class="entity"><strong>${escapeHtml(e.name)}</strong> (${e.attrs.join(', ')}) <button onclick="editEntity(${i})" class="btn-secondary" style="padding:0.2rem 0.5rem;">✏️</button> <button onclick="addAttr(${i})" class="btn-secondary" style="padding:0.2rem 0.5rem;">+</button></div>`).join('');
    }
    window.editEntity = (i) => { let n = prompt('Новое имя сущности', entities[i].name); if(n) entities[i].name = n; renderEntities(); };
    window.addAttr = (i) => { let a = prompt('Название атрибута (например: email)'); if(a) entities[i].attrs.push(a); renderEntities(); };
    document.getElementById('addEntityBtn')?.addEventListener('click', () => {
        let name = prompt('Название сущности (например: users)');
        if(name) entities.push({ name, attrs: ['id', 'created_at'] });
        renderEntities();
    });
    document.getElementById('genSqlBtn')?.addEventListener('click', () => {
        if(!entities.length) { sqlPreview.innerText = '-- Добавьте хотя бы одну сущность'; return; }
        let sql = '';
        entities.forEach(e => { sql += `CREATE TABLE ${e.name} (\n  ${e.attrs.map(a => `${a} VARCHAR(255)`).join(',\n  ')}\n);\n\n`; });
        sqlPreview.innerText = sql;
    });

    // --- Тесты (банк вопросов) ---
    const qBank = {
        requirements: [{q:"Что такое функциональные требования?",opts:["Описание того, что система должна делать","Характеристики производительности","Требования безопасности"],ans:0},{q:"Что из перечисленного — нефункциональное требование?",opts:["Скорость ответа системы","Регистрация пользователя","Экспорт отчёта"],ans:0}],
        api: [{q:"Какой HTTP-метод используется для получения данных в REST?",opts:["GET","POST","PUT"],ans:0},{q:"Какой статус-код означает 'ресурс не найден'?",opts:["200","404","500"],ans:1}],
        db: [{q:"Что такое первая нормальная форма (1NF)?",opts:["Атомарность значений","Отсутствие транзитивных зависимостей","Отсутствие дубликатов"],ans:0},{q:"Какой оператор SQL используется для объединения таблиц?",opts:["JOIN","UNION","MERGE"],ans:0}],
        bpmn: [{q:"Какой элемент BPMN обозначает точку принятия решения?",opts:["Задача","Событие","Шлюз"],ans:2}],
        security: [{q:"Что такое SQL-инъекция?",opts:["Уязвимость, позволяющая выполнить произвольный SQL-код","Метод оптимизации запросов","Техника шифрования"],ans:0}],
        ddd: [{q:"Что означает DDD?",opts:["Domain-Driven Design","Data-Driven Design","Dynamic Domain"],ans:0}]
    };
    let currentTest=[], curIdx=0, userAnswers=[];
    const testArea = document.getElementById('testArea');
    function renderTest() {
        if(!currentTest.length) return;
        let q = currentTest[curIdx];
        let html = `<div class="card" style="padding:1rem"><p><strong>${q.q}</strong></p>`;
        q.opts.forEach((opt,i) => { html += `<label class="checklist-item"><input type="radio" name="testOpt" value="${i}" ${userAnswers[curIdx]===i?'checked':''}> ${opt}</label>`; });
        html += `<div class="quick-links"><button id="prevTestBtn" class="btn-secondary">← Назад</button> <button id="nextTestBtn" class="btn-secondary">Далее →</button> <button id="finishTestBtn" class="btn-primary">Завершить</button></div></div>`;
        testArea.innerHTML = html;
        document.querySelectorAll('input[name="testOpt"]').forEach(r => r.addEventListener('change', (e) => { userAnswers[curIdx] = parseInt(e.target.value); }));
        document.getElementById('prevTestBtn')?.addEventListener('click', () => { if(curIdx>0) { curIdx--; renderTest(); } });
        document.getElementById('nextTestBtn')?.addEventListener('click', () => { if(curIdx<currentTest.length-1) { curIdx++; renderTest(); } else finishTest(); });
        document.getElementById('finishTestBtn')?.addEventListener('click', finishTest);
    }
    function finishTest() {
        let correct = 0;
        currentTest.forEach((q,i) => { if(userAnswers[i]===q.ans) correct++; });
        let percent = Math.round(correct/currentTest.length*100);
        testArea.innerHTML = `<div class="tip">Результат: ${correct}/${currentTest.length} (${percent}%)</div><button id="restartTestBtn" class="btn-primary">Пройти заново</button>`;
        document.getElementById('restartTestBtn')?.addEventListener('click', () => startTest());
    }
    function startTest() {
        let sec = document.getElementById('testSection').value;
        let qs = qBank[sec];
        if(!qs) { testArea.innerHTML = '<p>Нет вопросов для этого раздела</p>'; return; }
        currentTest = [...qs];
        curIdx = 0;
        userAnswers = new Array(currentTest.length).fill(null);
        renderTest();
    }
    document.getElementById('startTestBtn')?.addEventListener('click', startTest);

    // --- Заметки (localStorage) ---
    let notes = JSON.parse(localStorage.getItem('sa_notes') || '[]');
    function renderNotes() {
        const cont = document.getElementById('notesList');
        if(!cont) return;
        cont.innerHTML = notes.map(n => `<div class="tool-card"><strong>${escapeHtml(n.title)}</strong><br><small>${n.date}</small><p>${escapeHtml(n.content.substring(0,100))}</p><button onclick="deleteNote(${n.id})" class="btn-secondary">Удалить</button></div>`).join('');
    }
    window.deleteNote = (id) => { notes = notes.filter(n => n.id !== id); localStorage.setItem('sa_notes', JSON.stringify(notes)); renderNotes(); };
    document.getElementById('addNoteBtn')?.addEventListener('click', () => {
        let title = document.getElementById('noteTitle').value.trim();
        let content = document.getElementById('noteContent').value.trim();
        if(!title) return alert('Введите заголовок заметки');
        notes.unshift({ id: Date.now(), title, content, date: new Date().toLocaleString() });
        localStorage.setItem('sa_notes', JSON.stringify(notes));
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        renderNotes();
    });
    renderNotes();

    // --- Чеклист требований (интерактивный) ---
    function updateReqChecklist() {
        const ids = ['chStakeholders', 'chUserStories', 'chAcceptance', 'chNonFunctional', 'chTrace'];
        let total = ids.length;
        let checked = ids.filter(id => document.getElementById(id)?.checked).length;
        let percent = total ? (checked/total)*100 : 0;
        const fill = document.getElementById('reqChecklistProgress');
        if(fill) fill.style.width = percent + '%';
    }
    document.querySelectorAll('#interactive-checklists input').forEach(cb => cb.addEventListener('change', updateReqChecklist));
    document.getElementById('resetReqChecklist')?.addEventListener('click', () => {
        ['chStakeholders', 'chUserStories', 'chAcceptance', 'chNonFunctional', 'chTrace'].forEach(id => { if(document.getElementById(id)) document.getElementById(id).checked = false; });
        updateReqChecklist();
    });
    updateReqChecklist();

    // --- Чеклист безопасности ---
    function updateSecChecklist() {
        const ids = ['sec1','sec2','sec3','sec4','sec5','sec6'];
        let total = ids.length;
        let checked = ids.filter(id => document.getElementById(id)?.checked).length;
        let percent = total ? (checked/total)*100 : 0;
        const fill = document.getElementById('secChecklistProgress');
        if(fill) fill.style.width = percent + '%';
    }
    document.querySelectorAll('#security-checklist input').forEach(cb => cb.addEventListener('change', updateSecChecklist));
    document.getElementById('resetSecChecklist')?.addEventListener('click', () => {
        ['sec1','sec2','sec3','sec4','sec5','sec6'].forEach(id => { if(document.getElementById(id)) document.getElementById(id).checked = false; });
        updateSecChecklist();
    });
    updateSecChecklist();

    // --- Карта компетенций ---
    function updateCompProgress() {
        let total = document.querySelectorAll('.comp-cb').length;
        let checked = document.querySelectorAll('.comp-cb:checked').length;
        let percent = total ? (checked/total)*100 : 0;
        const fill = document.getElementById('compProgressFill');
        if(fill) fill.style.width = percent + '%';
    }
    document.querySelectorAll('.comp-cb').forEach(cb => cb.addEventListener('change', updateCompProgress));
    document.getElementById('saveCompBtn')?.addEventListener('click', () => {
        let states = Array.from(document.querySelectorAll('.comp-cb')).map(cb => cb.checked);
        localStorage.setItem('compMap', JSON.stringify(states));
        alert('Прогресс карты компетенций сохранён');
    });
    const savedComp = localStorage.getItem('compMap');
    if(savedComp) {
        let states = JSON.parse(savedComp);
        document.querySelectorAll('.comp-cb').forEach((cb,i) => { if(states[i]) cb.checked = true; });
        updateCompProgress();
    }

    // --- API тестер ---
    document.getElementById('sendApiBtn')?.addEventListener('click', async () => {
        const method = document.getElementById('apiMethod').value;
        let url = document.getElementById('apiUrl').value;
        const respDiv = document.getElementById('apiResponse');
        respDiv.innerText = 'Отправка запроса...';
        try {
            let opts = { method, headers: { 'Content-Type': 'application/json' } };
            if(method === 'POST') opts.body = JSON.stringify({ title: 'Тестовый запрос от аналитика', body: 'Пример данных', userId: 1 });
            const res = await fetch(url, opts);
            const data = await res.json();
            respDiv.innerText = JSON.stringify(data, null, 2);
        } catch(e) { respDiv.innerText = 'Ошибка: ' + e.message; }
    });
    document.querySelectorAll('[data-api-url]').forEach(btn => {
        btn.addEventListener('click', () => { document.getElementById('apiUrl').value = btn.dataset.apiUrl; });
    });

    // --- Шаблоны документов ---
    const docTemplates = {
        srs: "1. Введение\n1.1 Назначение документа\n1.2 Область действия\n2. Общее описание\n2.1 Пользователи\n2.2 Ограничения\n3. Функциональные требования\n3.1 Сценарии использования\n4. Нефункциональные требования\n5. Приложения",
        'user-stories': "Как [роль], я хочу [функция], чтобы [выгода]\n\nКритерии приемки:\n- Условие 1\n- Условие 2\n\nПриоритет: Must/Should/Could",
        'api-spec': "openapi: 3.0.0\ninfo:\n  title: API документация\n  version: 1.0.0\npaths:\n  /resource:\n    get:\n      summary: Получить ресурсы\n      responses:\n        '200':\n          description: Успешный ответ",
        'test-cases': "Название теста: Проверка входа\nПредусловие: Пользователь зарегистрирован\nШаги:\n1. Открыть страницу входа\n2. Ввести логин и пароль\n3. Нажать 'Войти'\nОжидаемый результат: Переход в личный кабинет"
    };
    document.querySelectorAll('[data-doc]').forEach(btn => {
        btn.addEventListener('click', () => {
            let type = btn.dataset.doc;
            let content = docTemplates[type] || '';
            document.getElementById('docContent').value = content;
            document.getElementById('docEditor').style.display = 'block';
        });
    });
    document.getElementById('downloadDocBtn')?.addEventListener('click', () => {
        const content = document.getElementById('docContent').value;
        const blob = new Blob([content], {type: 'text/plain'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'document.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    // --- Генератор документов (автоматический) ---
    document.getElementById('generateDocBtn')?.addEventListener('click', () => {
        let type = document.getElementById('docTypeSelect').value;
        let text = docTemplates[type] || '';
        document.getElementById('generatedDoc').value = text;
    });
    document.getElementById('downloadGeneratedDoc')?.addEventListener('click', () => {
        const content = document.getElementById('generatedDoc').value;
        const blob = new Blob([content], {type: 'text/plain'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'generated_spec.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    // --- Шаблоны писем ---
    const emailTemplates = {
        clarification: "Уважаемый(ая) [Имя],\n\nУ меня возник вопрос по поводу [тема]. Не могли бы вы уточнить:\n1. [Вопрос 1]\n2. [Вопрос 2]\n\nЗаранее спасибо.\n\nС уважением,\n[Ваше имя]",
        meeting: "Уважаемый(ая) [Имя],\n\nПриглашаю вас на встречу по [тема].\nДата/время: [дата и время]\nПовестка:\n1. [пункт 1]\n2. [пункт 2]\n\nПрошу подтвердить участие.\n\nС уважением,\n[Ваше имя]",
        review: "Уважаемый(ая) [Имя],\n\nПрошу вас провести ревью [документа/кода] по проекту [название].\nСрок: [дата].\n\nС уважением,\n[Ваше имя]",
        update: "Уважаемый(ая) [Имя],\n\nСтатус задачи [название]:\n- Выполнено: [что сделано]\n- В процессе: [что делается]\n- Блокеры: [если есть]\n\nС уважением,\n[Ваше имя]"
    };
    document.querySelectorAll('[data-email]').forEach(btn => {
        btn.addEventListener('click', () => {
            let key = btn.dataset.email;
            document.getElementById('emailTemplateText').value = emailTemplates[key] || '';
        });
    });
    document.getElementById('copyEmailBtn')?.addEventListener('click', () => {
        const text = document.getElementById('emailTemplateText');
        text.select();
        navigator.clipboard.writeText(text.value);
        alert('Шаблон скопирован');
    });

    // --- Закладки (сохранение секций) ---
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    function renderBookmarks() {
        const container = document.getElementById('bookmarksList');
        const counter = document.getElementById('bookmarksCounter');
        if(!container) return;
        if(bookmarks.length === 0) container.innerHTML = '<li>Нет закладок</li>';
        else container.innerHTML = bookmarks.map(id => `<li><a href="#${id}" class="nav-link" style="justify-content:space-between;"><span>${id}</span><button onclick="removeBookmark('${id}')" class="btn-secondary" style="padding:0.2rem 0.5rem;">🗑️</button></a></li>`).join('');
        if(counter) counter.innerText = bookmarks.length;
    }
    window.removeBookmark = (id) => { bookmarks = bookmarks.filter(b => b !== id); localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); renderBookmarks(); };
    document.querySelectorAll('.card').forEach(card => {
        const id = card.id;
        if(!id) return;
        const h2 = card.querySelector('h2');
        if(h2 && !h2.querySelector('.bookmark-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-bookmark bookmark-icon';
            icon.style.cursor = 'pointer';
            icon.style.marginLeft = '0.8rem';
            icon.style.fontSize = '1.2rem';
            icon.onclick = () => {
                if(bookmarks.includes(id)) bookmarks = bookmarks.filter(b => b !== id);
                else bookmarks.push(id);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                renderBookmarks();
            };
            h2.appendChild(icon);
        }
    });
    renderBookmarks();

    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m){
            if(m === '&') return '&amp;';
            if(m === '<') return '&lt;';
            if(m === '>') return '&gt;';
            return m;
        });
    }
});
