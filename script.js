document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    const navOverlay = document.getElementById('navOverlay');
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const themeToggle = document.getElementById('themeToggle');
    const pdfExport = document.getElementById('pdfExport');
    const searchInput = document.querySelector('.search-bar input');

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
        body.classList.toggle('dark-theme');
        themeToggle.innerHTML = body.classList.contains('dark-theme')
            ? '<i class="fas fa-sun"></i> Светлая тема'
            : '<i class="fas fa-moon"></i> Темная тема';
    });

    // Экспорт в PDF
    pdfExport.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        html2canvas(document.querySelector('main')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('system_analyst_guide.pdf');
        });
    });

    // Поиск
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.section').forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

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
        let result;

        const conversions = {
            kb: { mb: value => value / 1024, gb: value => value / (1024 * 1024) },
            mb: { kb: value => value * 1024, gb: value => value / 1024 },
            gb: { kb: value => value * (1024 * 1024), mb: value => value * 1024 },
            ms: { s: value => value / 1000 },
            s: { ms: value => value * 1000 }
        };

        if (inputUnit === outputUnit) {
            result = inputValue;
        } else if (conversions[inputUnit] && conversions[inputUnit][outputUnit]) {
            result = conversions[inputUnit][outputUnit](inputValue);
        } else {
            result = 'Невозможно конвертировать';
        }

        document.getElementById('output-value').value = result;
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

    // Карта компетенций
    window.toggleCompetency = (element) => {
        const ul = element.querySelector('ul');
        ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
    };
});