// ===== ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ ДЛЯ SCRIPT.JS =====

// ===== РАСШИРЕННАЯ СИСТЕМА ТЕСТИРОВАНИЯ =====
const extendedTestQuestions = {
    requirements: [
        {
            question: "Что такое функциональные требования?",
            options: [
                "Описание того, что система должна делать",
                "Характеристики производительности системы", 
                "Требования к безопасности системы",
                "Требования к удобству использования"
            ],
            answer: 0,
            explanation: "Функциональные требования определяют, какие функции и возможности должна предоставлять система."
        },
        {
            question: "Что означает критерий INVEST для user stories?",
            options: [
                "Independent, Negotiable, Valuable, Estimable, Small, Testable",
                "Integrated, Negotiable, Valuable, Estimable, Simple, Testable",
                "Independent, Negotiable, Visible, Estimable, Small, Testable", 
                "Integrated, Negotiable, Visible, Estimable, Simple, Testable"
            ],
            answer: 0,
            explanation: "INVEST - мнемоническое правило для создания качественных пользовательских историй."
        },
        {
            question: "Какие из перечисленных являются нефункциональными требованиями?",
            options: [
                "Производительность, безопасность, надежность",
                "Авторизация пользователей, создание отчетов",
                "Обработка платежей, управление заказами",
                "Интеграция с API, валидация данных"
            ],
            answer: 0,
            explanation: "Нефункциональные требования описывают характеристики системы, а не ее функции."
        },
        {
            question: "Что такое трассируемость требований?",
            options: [
                "Возможность отслеживать связь требований с их реализацией",
                "Скорость обработки требований",
                "Автоматизация сбора требований", 
                "Визуализация требований на диаграммах"
            ],
            answer: 0,
            explanation: "Трассируемость помогает отслеживать жизненный цикл требований от истоков до реализации."
        }
    ],
    api: [
        {
            question: "Какой HTTP-метод используется для создания ресурса в REST API?",
            options: ["GET", "POST", "PUT", "DELETE"],
            answer: 1,
            explanation: "POST используется для создания новых ресурсов на сервере."
        },
        {
            question: "Что означает статус код 404?",
            options: [
                "Успешный запрос",
                "Ошибка сервера", 
                "Ресурс не найден",
                "Запрещено"
            ],
            answer: 2,
            explanation: "404 Not Found - запрашиваемый ресурс не существует на сервере."
        },
        {
            question: "Какой формат данных наиболее распространен в REST API?",
            options: ["XML", "JSON", "CSV", "YAML"],
            answer: 1,
            explanation: "JSON стал стандартом де-факто для REST API благодаря своей простоте и читаемости."
        },
        {
            question: "Что такое CORS?",
            options: [
                "Cross-Origin Resource Sharing - механизм для запросов между разными доменами",
                "Content Optimization and Response System - система оптимизации контента",
                "Centralized Object Request Service - централизованный сервис объектов",
                "Cryptographic Operation Response Standard - стандарт криптографических операций"
            ],
            answer: 0,
            explanation: "CORS позволяет браузеру делать запросы к серверам с других доменов."
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
            answer: 1,
            explanation: "1NF требует, чтобы все значения в столбцах были атомарными (неделимыми)."
        },
        {
            question: "Какой тип JOIN возвращает все записи из левой таблицы?",
            options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
            answer: 1,
            explanation: "LEFT JOIN возвращает все записи из левой таблицы и совпадающие из правой."
        },
        {
            question: "Что такое ACID в контексте баз данных?",
            options: [
                "Atomicity, Consistency, Isolation, Durability",
                "Access, Control, Integrity, Data",
                "Analysis, Creation, Indexing, Deletion", 
                "Automation, Configuration, Integration, Deployment"
            ],
            answer: 0,
            explanation: "ACID - набор свойств, гарантирующих надежность транзакций."
        },
        {
            question: "Какое преимущество NoSQL баз данных?",
            options: [
                "Гибкая схема данных",
                "Строгая типизация",
                "Сложные JOIN-запросы",
                "Жесткая структура таблиц"
            ],
            answer: 0,
            explanation: "NoSQL базы данных предлагают гибкую схему, что удобно для быстро меняющихся требований."
        }
    ],
    bpmn: [
        {
            question: "Какой элемент BPMN обозначает точку принятия решений?",
            options: ["Задача", "Событие", "Шлюз", "Пул"],
            answer: 2,
            explanation: "Шлюзы используются для ветвления и объединения потоков в процессе."
        },
        {
            question: "Что обозначает ромб в BPMN?",
            options: [
                "Стартовое событие",
                "Конечное событие", 
                "Шлюз (Gateway)",
                "Промежуточное событие"
            ],
            answer: 2,
            explanation: "Ромбовидная фигура представляет шлюзы для управления потоком процесса."
        },
        {
            question: "Какой элемент используется для обозначения задержки в процессе?",
            options: [
                "Таймерное событие",
                "Условное событие",
                "Сообщение",
                "Эскалация"
            ],
            answer: 0,
            explanation: "Таймерные события используются для обозначения временных задержек в процессе."
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
            answer: 1,
            explanation: "SQL-инъекция - это уязвимость, возникающая при неправильной обработке пользовательского ввода."
        },
        {
            question: "Что такое OWASP Top 10?",
            options: [
                "Список 10 наиболее критичных уязвимостей веб-приложений",
                "10 лучших практик программирования",
                "10 инструментов для тестирования безопасности",
                "10 стандартов шифрования данных"
            ],
            answer: 0,
            explanation: "OWASP Top 10 - это стандартный документ по осведомленности о безопасности веб-приложений."
        },
        {
            question: "Какой принцип безопасности означает 'никому не доверяй'?",
            options: [
                "Zero Trust",
                "Defense in Depth", 
                "Least Privilege",
                "Security by Design"
            ],
            answer: 0,
            explanation: "Zero Trust предполагает, что никому внутри или вне сети нельзя доверять по умолчанию."
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
            answer: 1,
            explanation: "Domain-Driven Design - это подход к разработке сложных систем через глубокое понимание предметной области."
        },
        {
            question: "Что такое 'ограниченный контекст' в DDD?",
            options: [
                "Четкие границы моделей в определенной части системы",
                "Ограничение на количество сущностей в модели",
                "Контекст выполнения программы",
                "Ограничение на использование внешних библиотек"
            ],
            answer: 0,
            explanation: "Ограниченный контекст определяет границы, в которых определенная модель применима и последовательна."
        },
        {
            question: "Что такое 'универсальный язык' в DDD?",
            options: [
                "Единая терминология, используемая разработчиками и экспертами предметной области",
                "Язык программирования, используемый в проекте",
                "Международный язык для документации",
                "Универсальный протокол обмена данными"
            ],
            answer: 0,
            explanation: "Универсальный язык помогает устранить разрыв между техническими и бизнес-специалистами."
        }
    ]
};

// ===== РАСШИРЕННЫЙ DECISION TREE =====
const methodologyTree = {
    start: {
        question: "Проект имеет четкие и стабильные требования?",
        answers: {
            yes: "clear_requirements",
            no: "changing_requirements"
        }
    },
    clear_requirements: {
        question: "Требуется ли быстрый вывод продукта на рынок?",
        answers: {
            yes: "waterfall",
            no: "waterfall_detailed"
        }
    },
    changing_requirements: {
        question: "Требования часто меняются в процессе разработки?",
        answers: {
            yes: "agile_framework",
            no: "iterative_approach"
        }
    },
    agile_framework: {
        question: "Команда имеет опыт Agile-методологий?",
        answers: {
            yes: "scrum_kanban_choice",
            no: "agile_training"
        }
    },
    scrum_kanban_choice: {
        question: "Работа состоит из отдельных итераций или непрерывного потока?",
        answers: {
            iterations: "scrum",
            continuous: "kanban"
        }
    },
    iterative_approach: {
        question: "Проект требует частых релизов?",
        answers: {
            yes: "iterative_development",
            no: "prototype_based"
        }
    }
};

const methodologyRecommendations = {
    waterfall: {
        name: "Водопадная модель (Waterfall)",
        description: "Последовательный подход с четкими этапами. Подходит для проектов с фиксированными требованиями.",
        pros: [
            "Четкое планирование и документация",
            "Легко управлять прогрессом",
            "Предсказуемые сроки и бюджет"
        ],
        cons: [
            "Сложно вносить изменения",
            "Позднее тестирование",
            "Риск несоответствия требованиям"
        ],
        tools: ["MS Project", "Jira", "Confluence"]
    },
    scrum: {
        name: "Scrum",
        description: "Итеративная методология с фиксированными спринтами. Идеальна для проектов с меняющимися требованиями.",
        pros: [
            "Гибкость к изменениям",
            "Быстрая обратная связь",
            "Постоянное улучшение процесса"
        ],
        cons: [
            "Требует опытной команды",
            "Нужен dedicated Scrum Master",
            "Может быть избыточным для маленьких проектов"
        ],
        tools: ["Jira", "Trello", "Azure DevOps"]
    },
    kanban: {
        name: "Kanban",
        description: "Метод управления непрерывным потоком работ. Подходит для поддержки и оперативных задач.",
        pros: [
            "Максимальная гибкость",
            "Визуализация потока работ",
            "Минимальные накладные расходы"
        ],
        cons: [
            "Меньше структуры",
            "Сложнее планировать долгосрочно",
            "Требует дисциплины команды"
        ],
        tools: ["Trello", "Jira", "Kanbanize"]
    }
};

function showTreeStep(step, answer) {
    const step1 = document.getElementById('tree-step-1');
    const step2 = document.getElementById('tree-step-2');
    const result = document.getElementById('tree-result');
    
    if (!step1 || !step2 || !result) return;
    
    if (step === 2) {
        step1.classList.remove('active');
        step2.classList.add('active');
        
        const question = document.getElementById('step2-question');
        const options = document.getElementById('step2-options');
        
        if (question && options) {
            if (answer === 'yes') {
                question.textContent = 'Требуется ли быстрый вывод продукта на рынок?';
                options.innerHTML = `
                    <button class="tree-btn" onclick="showMethodologyResult('waterfall')">Да</button>
                    <button class="tree-btn" onclick="showMethodologyResult('waterfall_detailed')">Нет</button>
                `;
            } else {
                question.textContent = 'Требования часто меняются в процессе разработки?';
                options.innerHTML = `
                    <button class="tree-btn" onclick="showTreeStep(3, 'changing')">Да</button>
                    <button class="tree-btn" onclick="showTreeStep(3, 'stable')">Нет</button>
                `;
            }
        }
    } else if (step === 3) {
        step2.classList.remove('active');
        const question = document.getElementById('step2-question');
        const options = document.getElementById('step2-options');
        
        if (question && options) {
            if (answer === 'changing') {
                question.textContent = 'Команда имеет опыт Agile-методологий?';
                options.innerHTML = `
                    <button class="tree-btn" onclick="showTreeStep(4, 'experienced')">Да</button>
                    <button class="tree-btn" onclick="showMethodologyResult('agile_training')">Нет</button>
                `;
            } else {
                question.textContent = 'Проект требует частых релизов?';
                options.innerHTML = `
                    <button class="tree-btn" onclick="showMethodologyResult('iterative_development')">Да</button>
                    <button class="tree-btn" onclick="showMethodologyResult('prototype_based')">Нет</button>
                `;
            }
        }
        step2.classList.add('active');
    } else if (step === 4) {
        const question = document.getElementById('step2-question');
        const options = document.getElementById('step2-options');
        
        if (question && options) {
            question.textContent = 'Работа состоит из отдельных итераций или непрерывного потока?';
            options.innerHTML = `
                <button class="tree-btn" onclick="showMethodologyResult('scrum')">Отдельные итерации</button>
                <button class="tree-btn" onclick="showMethodologyResult('kanban')">Непрерывный поток</button>
            `;
        }
    }
}

function showMethodologyResult(method) {
    const step2 = document.getElementById('tree-step-2');
    const result = document.getElementById('tree-result');
    const resultText = document.getElementById('result-text');
    
    if (!step2 || !result || !resultText) return;
    
    step2.classList.remove('active');
    result.classList.add('active');
    
    const recommendation = methodologyRecommendations[method] || {
        name: "Гибридный подход",
        description: "Рекомендуется комбинировать элементы разных методологий в зависимости от контекста проекта.",
        pros: ["Адаптивность к изменениям", "Баланс между структурой и гибкостью"],
        cons: ["Требует опытного руководителя", "Сложнее в управлении"],
        tools: ["Jira", "Trello", "MS Project"]
    };
    
    resultText.innerHTML = `
        <div class="methodology-result">
            <h3>${recommendation.name}</h3>
            <p><strong>Описание:</strong> ${recommendation.description}</p>
            
            <div class="pros-cons">
                <div class="pros">
                    <h4><i class="fas fa-check-circle"></i> Преимущества</h4>
                    <ul>
                        ${recommendation.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="cons">
                    <h4><i class="fas fa-exclamation-circle"></i> Ограничения</h4>
                    <ul>
                        ${recommendation.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="tools">
                <h4><i class="fas fa-tools"></i> Рекомендуемые инструменты</h4>
                <div class="tool-tags">
                    ${recommendation.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function resetTree() {
    const step1 = document.getElementById('tree-step-1');
    const step2 = document.getElementById('tree-step-2');
    const result = document.getElementById('tree-result');
    
    if (step1) step1.classList.add('active');
    if (step2) step2.classList.remove('active');
    if (result) result.classList.remove('active');
}

// ===== РАСШИРЕННЫЙ КОНВЕРТЕР ВЕЛИЧИН =====
const unitConversions = {
    // Данные
    data: {
        bits: { 
            bits: 1, bytes: 1/8, kb: 1/8192, mb: 1/8388608, gb: 1/8589934592 
        },
        bytes: { 
            bits: 8, bytes: 1, kb: 1/1024, mb: 1/1048576, gb: 1/1073741824 
        },
        kb: { 
            bits: 8192, bytes: 1024, kb: 1, mb: 1/1024, gb: 1/1048576 
        },
        mb: { 
            bits: 8388608, bytes: 1048576, kb: 1024, mb: 1, gb: 1/1024 
        },
        gb: { 
            bits: 8589934592, bytes: 1073741824, kb: 1048576, mb: 1024, gb: 1 
        }
    },
    // Время
    time: {
        ms: { ms: 1, s: 1/1000, min: 1/60000, h: 1/3600000 },
        s: { ms: 1000, s: 1, min: 1/60, h: 1/3600 },
        min: { ms: 60000, s: 60, min: 1, h: 1/60 },
        h: { ms: 3600000, s: 3600, min: 60, h: 1 }
    },
    // Производительность
    performance: {
        req_sec: { req_sec: 1, req_min: 60, req_h: 3600 },
        req_min: { req_sec: 1/60, req_min: 1, req_h: 60 },
        req_h: { req_sec: 1/3600, req_min: 1/60, req_h: 1 }
    }
};

function convertValue() {
    const input = parseFloat(document.getElementById('conv-input').value) || 0;
    const fromUnit = document.getElementById('conv-from').value;
    const toUnit = document.getElementById('conv-to').value;
    const outputElement = document.getElementById('conv-output');
    
    if (!outputElement) return;
    
    let result;
    let category = getUnitCategory(fromUnit);
    
    if (category && unitConversions[category] && unitConversions[category][fromUnit] && unitConversions[category][fromUnit][toUnit]) {
        result = input * unitConversions[category][fromUnit][toUnit];
        outputElement.value = formatConversionResult(result, toUnit);
    } else {
        outputElement.value = 'Невозможно конвертировать';
    }
}

function getUnitCategory(unit) {
    if (['bits', 'bytes', 'kb', 'mb', 'gb'].includes(unit)) return 'data';
    if (['ms', 's', 'min', 'h'].includes(unit)) return 'time';
    if (['req_sec', 'req_min', 'req_h'].includes(unit)) return 'performance';
    return null;
}

function formatConversionResult(value, unit) {
    if (value === 0) return '0';
    
    // Для очень больших или очень маленьких чисел используем экспоненциальную запись
    if (Math.abs(value) < 0.001 || Math.abs(value) > 1000000) {
        return value.toExponential(4);
    }
    
    // Округляем в зависимости от величины числа
    if (Math.abs(value) < 1) {
        return value.toFixed(6).replace(/\.?0+$/, '');
    } else if (Math.abs(value) < 10) {
        return value.toFixed(4).replace(/\.?0+$/, '');
    } else if (Math.abs(value) < 100) {
        return value.toFixed(2).replace(/\.?0+$/, '');
    } else {
        return Math.round(value).toString();
    }
}

// ===== РАСШИРЕННЫЙ ТАЙМЕР МИТИНГА =====
let meetingTimerInterval = null;
let meetingTimeLeft = 0;

function startMeetingTimer(seconds) {
    stopMeetingTimer();
    
    const display = document.getElementById('meeting-timer-display');
    if (!display) return;
    
    meetingTimeLeft = seconds;
    
    function updateDisplay() {
        const minutes = Math.floor(meetingTimeLeft / 60);
        const secs = meetingTimeLeft % 60;
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        // Изменение цвета при малом времени
        if (meetingTimeLeft <= 60) {
            display.style.color = '#e74c3c';
            display.classList.add('pulse');
        } else if (meetingTimeLeft <= 180) {
            display.style.color = '#f39c12';
            display.classList.remove('pulse');
        } else {
            display.style.color = '#2ecc71';
            display.classList.remove('pulse');
        }
    }
    
    updateDisplay();
    
    meetingTimerInterval = setInterval(() => {
        meetingTimeLeft--;
        updateDisplay();
        
        if (meetingTimeLeft <= 0) {
            stopMeetingTimer();
            display.textContent = '00:00';
            showNotification('Время митинга истекло!', 'info');
            playTimerSound();
        }
    }, 1000);
    
    showNotification(`Таймер запущен на ${formatTime(seconds)}`, 'success');
}

function stopMeetingTimer() {
    if (meetingTimerInterval) {
        clearInterval(meetingTimerInterval);
        meetingTimerInterval = null;
        const display = document.getElementById('meeting-timer-display');
        if (display) {
            display.textContent = '00:00';
            display.style.color = '#2ecc71';
            display.classList.remove('pulse');
        }
        showNotification('Таймер остановлен', 'info');
    }
}

function playTimerSound() {
    // Создаем простой звуковой сигнал с помощью Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        
    } catch (error) {
        console.log('Audio context not supported:', error);
    }
}

// ===== ГЕНЕРАТОР SQL ДЛЯ МОДЕЛИРОВАНИЯ ДАННЫХ =====
class SQLGenerator {
    constructor() {
        this.entities = [];
        this.relationships = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadExamples();
    }
    
    setupEventListeners() {
        const generateBtn = document.getElementById('generateSqlBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateSQL());
        }
        
        const addEntityBtn = document.getElementById('addEntity');
        if (addEntityBtn) {
            addEntityBtn.addEventListener('click', () => this.addEntity());
        }
        
        const clearBtn = document.getElementById('clearDiagram');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearDiagram());
        }
    }
    
    loadExamples() {
        // Предзагружаем примеры моделей данных
        this.exampleModels = {
            ecommerce: {
                name: "Электронная коммерция",
                entities: [
                    { name: "users", attributes: ["id", "email", "password", "created_at"] },
                    { name: "products", attributes: ["id", "name", "price", "category_id"] },
                    { name: "orders", attributes: ["id", "user_id", "total_amount", "status"] },
                    { name: "order_items", attributes: ["id", "order_id", "product_id", "quantity"] }
                ],
                relationships: [
                    { from: "users", to: "orders", type: "one-to-many" },
                    { from: "orders", to: "order_items", type: "one-to-many" },
                    { from: "products", to: "order_items", type: "one-to-many" }
                ]
            },
            blog: {
                name: "Блог-платформа", 
                entities: [
                    { name: "users", attributes: ["id", "username", "email", "role"] },
                    { name: "posts", attributes: ["id", "user_id", "title", "content", "created_at"] },
                    { name: "comments", attributes: ["id", "post_id", "user_id", "content", "created_at"] },
                    { name: "tags", attributes: ["id", "name"] },
                    { name: "post_tags", attributes: ["id", "post_id", "tag_id"] }
                ],
                relationships: [
                    { from: "users", to: "posts", type: "one-to-many" },
                    { from: "posts", to: "comments", type: "one-to-many" },
                    { from: "users", to: "comments", type: "one-to-many" },
                    { from: "posts", to: "post_tags", type: "one-to-many" },
                    { from: "tags", to: "post_tags", type: "one-to-many" }
                ]
            }
        };
    }
    
    addEntity() {
        const entityName = prompt("Введите название сущности:", "new_entity");
        if (entityName) {
            const entity = {
                name: entityName.toLowerCase().replace(/\s+/g, '_'),
                attributes: ['id', 'created_at', 'updated_at']
            };
            this.entities.push(entity);
            this.updateVisualization();
            showNotification(`Сущность "${entityName}" добавлена`, 'success');
        }
    }
    
    clearDiagram() {
        if (confirm('Очистить всю диаграмму?')) {
            this.entities = [];
            this.relationships = [];
            this.updateVisualization();
            this.updateSQLPreview();
            showNotification('Диаграмма очищена', 'info');
        }
    }
    
    updateVisualization() {
        const canvas = document.getElementById('er-canvas');
        if (!canvas) return;
        
        let html = '<div class="entities-container">';
        
        this.entities.forEach((entity, index) => {
            html += `
                <div class="entity" data-entity="${entity.name}">
                    <div class="entity-header">${entity.name}</div>
                    <div class="entity-attributes">
                        ${entity.attributes.map(attr => `<div class="attribute">${attr}</div>`).join('')}
                    </div>
                    <div class="entity-actions">
                        <button onclick="sqlGenerator.editEntity(${index})" title="Редактировать">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="sqlGenerator.addAttribute(${index})" title="Добавить атрибут">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        canvas.innerHTML = html;
    }
    
    editEntity(index) {
        const entity = this.entities[index];
        const newName = prompt("Введите новое название сущности:", entity.name);
        if (newName) {
            entity.name = newName.toLowerCase().replace(/\s+/g, '_');
            this.updateVisualization();
            this.updateSQLPreview();
        }
    }
    
    addAttribute(index) {
        const entity = this.entities[index];
        const attributeName = prompt("Введите название атрибута:", "new_attribute");
        if (attributeName) {
            entity.attributes.push(attributeName.toLowerCase().replace(/\s+/g, '_'));
            this.updateVisualization();
            this.updateSQLPreview();
        }
    }
    
    generateSQL() {
        if (this.entities.length === 0) {
            showNotification('Добавьте сущности для генерации SQL', 'warning');
            return;
        }
        
        let sql = '-- SQL сгенерирован автоматически\n-- Дата: ' + new Date().toLocaleString() + '\n\n';
        
        // Генерируем CREATE TABLE statements
        this.entities.forEach(entity => {
            sql += `CREATE TABLE ${entity.name} (\n`;
            
            entity.attributes.forEach((attr, idx) => {
                const isLast = idx === entity.attributes.length - 1;
                let type = 'VARCHAR(255)';
                
                // Определяем тип данных на основе имени атрибута
                if (attr === 'id') type = 'SERIAL PRIMARY KEY';
                else if (attr.includes('_at')) type = 'TIMESTAMP';
                else if (attr.includes('amount') || attr.includes('price') || attr.includes('quantity')) type = 'DECIMAL(10,2)';
                else if (attr.includes('is_') || attr === 'active') type = 'BOOLEAN';
                else if (attr.includes('email')) type = 'VARCHAR(255) UNIQUE';
                
                sql += `    ${attr} ${type}${isLast ? '' : ','}\n`;
            });
            
            sql += ');\n\n';
        });
        
        // Добавляем комментарии для отношений
        if (this.relationships.length > 0) {
            sql += '-- Внешние ключи и отношения\n';
            this.relationships.forEach(rel => {
                sql += `-- ALTER TABLE ${rel.to} ADD CONSTRAINT fk_${rel.to}_${rel.from} FOREIGN KEY (${rel.from}_id) REFERENCES ${rel.from}(id);\n`;
            });
            sql += '\n';
        }
        
        // Добавляем примеры INSERT запросов
        sql += '-- Примеры данных\n';
        this.entities.forEach(entity => {
            if (entity.name !== 'users' && !entity.name.includes('_')) {
                sql += `-- INSERT INTO ${entity.name} (/* columns */) VALUES (/* values */);\n`;
            }
        });
        
        this.updateSQLPreview(sql);
        showNotification('SQL код сгенерирован', 'success');
    }
    
    updateSQLPreview(sql) {
        const preview = document.getElementById('sql-preview');
        if (preview) {
            preview.textContent = sql || '-- SQL-код появится здесь после создания диаграммы';
        }
    }
    
    loadExample(modelName) {
        const model = this.exampleModels[modelName];
        if (model) {
            this.entities = JSON.parse(JSON.stringify(model.entities)); // Deep copy
            this.relationships = JSON.parse(JSON.stringify(model.relationships));
            this.updateVisualization();
            this.generateSQL();
            showNotification(`Загружена модель: ${model.name}`, 'success');
        }
    }
}

let sqlGenerator;

function initSQLGenerator() {
    sqlGenerator = new SQLGenerator();
}

// ===== ДОПОЛНИТЕЛЬНЫЕ ВОПРОСЫ ДЛЯ ТЕСТИРОВАНИЯ =====
function getRandomQuestions(section, count) {
    const questions = extendedTestQuestions[section];
    if (!questions) return [];
    
    // Перемешиваем вопросы и выбираем нужное количество
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕХ ДОПОЛНИТЕЛЬНЫХ СИСТЕМ =====
function initAdditionalSystems() {
    initSQLGenerator();
    
    // Добавляем обработчики для примеров моделей
    const loadEcommerceBtn = document.createElement('button');
    loadEcommerceBtn.textContent = 'Загрузить пример: E-commerce';
    loadEcommerceBtn.className = 'quick-link';
    loadEcommerceBtn.onclick = () => sqlGenerator.loadExample('ecommerce');
    
    const loadBlogBtn = document.createElement('button');
    loadBlogBtn.textContent = 'Загрузить пример: Блог';
    loadBlogBtn.className = 'quick-link';
    loadBlogBtn.onclick = () => sqlGenerator.loadExample('blog');
    
    const modelingSection = document.getElementById('data-modeling');
    if (modelingSection) {
        const examplesDiv = document.createElement('div');
        examplesDiv.className = 'modeling-examples';
        examplesDiv.innerHTML = '<h4>Примеры моделей:</h4>';
        examplesDiv.appendChild(loadEcommerceBtn);
        examplesDiv.appendChild(loadBlogBtn);
        
        const editor = modelingSection.querySelector('.modeling-editor');
        if (editor) {
            editor.appendChild(examplesDiv);
        }
    }
}

// Обновляем функцию startTest для использования расширенных вопросов
function startTest() {
    const sectionSelect = document.getElementById('test-section');
    const questionCountInput = document.getElementById('question-count');
    
    if (!sectionSelect || !questionCountInput) {
        showNotification('Элементы тестирования не найдены', 'error');
        return;
    }
    
    const section = sectionSelect.value;
    const questionCount = parseInt(questionCountInput.value) || 5;
    
    let questions = getRandomQuestions(section, questionCount);
    if (questions.length === 0) {
        showNotification('Тест для этого раздела пока недоступен', 'warning');
        return;
    }
    
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

// Обновляем функцию submitTest для показа объяснений
function submitTest() {
    clearInterval(testTimerInterval);
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - testStartTime) / 1000);
    
    let correctCount = 0;
    const resultsHtml = currentTest.map((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        if (isCorrect) correctCount++;
        
        return `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>Вопрос ${index + 1}:</strong> ${question.question}</p>
                <p>Ваш ответ: <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                    ${question.options[userAnswers[index]] || 'Нет ответа'}
                </span></p>
                ${!isCorrect ? `
                    <p>Правильный ответ: <span class="correct-answer">${question.options[question.answer]}</span></p>
                ` : ''}
                <div class="explanation">
                    <strong>Объяснение:</strong> ${question.explanation || 'Объяснение отсутствует.'}
                </div>
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
                <p class="result-message">${
                    percentage >= 90 ? 'Отлично! Вы отлично разбираетесь в теме!' :
                    percentage >= 70 ? 'Хорошо! Есть что повторить.' :
                    percentage >= 50 ? 'Удовлетворительно. Рекомендуется повторить материал.' :
                    'Нужно повторить материал. Рекомендуется изучить тему заново.'
                }</p>
            </div>
            <div class="result-details">
                ${resultsHtml}
            </div>
            <button onclick="startTest()" class="primary-btn" style="margin-top:20px;">Пройти тест снова</button>
        `;
    }
    
    showNotification(`Тест завершен! Результат: ${percentage}%`, percentage >= 70 ? 'success' : 'warning');
}
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
    
    // Инициализируем дополнительные системы
    initAdditionalSystems();

    // Обновляем вопросы тестирования
    Object.assign(testQuestions, extendedTestQuestions);
    
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
    }
    
    hideEditor() {
        this.render();
    }
    
    saveNote(noteId = null) {
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');
        
        if (!titleInput || !contentInput) {
            showNotification('Ошибка: элементы формы не найдены', 'error');
            return;
        }
        
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        
        if (!title) {
            showNotification('Введите заголовок заметки', 'warning');
            return;
        }
        
        if (noteId) {
            // Обновление существующей заметки
            const noteIndex = this.notes.findIndex(note => note.id === noteId);
            if (noteIndex !== -1) {
                this.notes[noteIndex] = {
                    ...this.notes[noteIndex],
                    title,
                    content,
                    updatedAt: new Date().toISOString()
                };
                this.save();
                this.render();
                showNotification('Заметка обновлена', 'success');
            }
        } else {
            this.addNote(title, content);
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
        return content.replace(/\n/g, '<br>');
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleString('ru-RU');
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
    const checklists = document.querySelectorAll('.checklist-container');
    
    checklists.forEach(container => {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const progressFill = container.querySelector('.progress-fill');
        const progressStats = container.querySelector('.progress-stats');
        
        function updateProgress() {
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
            
            if (progressFill) {
                progressFill.style.width = percentage + '%';
                progressFill.textContent = percentage + '%';
            }
            
            if (progressStats) {
                progressStats.textContent = `${checked}/${total} (${percentage}%)`;
            }
            
            // Сохраняем состояние в localStorage
            const checklistId = container.id || 'default-checklist';
            const state = Array.from(checkboxes).map(cb => cb.checked);
            localStorage.setItem(checklistId, JSON.stringify(state));
        }
        
        // Восстанавливаем состояние из localStorage
        const checklistId = container.id || 'default-checklist';
        const savedState = JSON.parse(localStorage.getItem(checklistId));
        if (savedState) {
            checkboxes.forEach((checkbox, index) => {
                checkbox.checked = savedState[index] || false;
                if (savedState[index]) {
                    checkbox.closest('.checklist-item')?.classList.add('checked');
                }
            });
        }
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const listItem = this.closest('.checklist-item');
                if (listItem) {
                    listItem.classList.toggle('checked', this.checked);
                }
                updateProgress();
            });
        });
        
        // Обработчики для кнопок управления
        const selectAllBtn = container.querySelector('.select-all');
        const deselectAllBtn = container.querySelector('.deselect-all');
        const resetBtn = container.querySelector('.reset');
        
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change'));
                });
            });
        }
        
        if (deselectAllBtn) {
            deselectAllBtn.addEventListener('click', () => {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.dispatchEvent(new Event('change'));
                });
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Сбросить прогресс для этого чеклиста?')) {
                    localStorage.removeItem(checklistId);
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                        checkbox.dispatchEvent(new Event('change'));
                    });
                }
            });
        }
        
        updateProgress();
    });
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
        { icon: 'fas fa-arrow-up', title: 'Наверх', action: () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }},
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
        const searchInput = document.querySelector('.search-bar input');
        const typeFilter = document.getElementById('search-type');
        const categoryFilter = document.getElementById('search-category');
        const difficultyFilter = document.getElementById('search-difficulty');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
        
        [typeFilter, categoryFilter, difficultyFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => {
                    this.updateFilters();
                    this.performSearch(searchInput?.value || '');
                });
            }
        });
    }
    
    updateFilters() {
        this.filters = {
            type: document.getElementById('search-type')?.value || 'all',
            category: document.getElementById('search-category')?.value || 'all',
            difficulty: document.getElementById('search-difficulty')?.value || 'all'
        };
    }
    
    performSearch(query) {
        if (!query.trim()) {
            this.clearResults();
            return;
        }
        
        const results = this.searchIndex.filter(item => {
            // Поиск по заголовку и содержанию
            const matchesText = item.title.toLowerCase().includes(query.toLowerCase()) ||
                              item.content.toLowerCase().includes(query.toLowerCase());
            
            // Фильтрация по типу
            const matchesType = this.filters.type === 'all' || item.type === this.filters.type;
            
            // Фильтрация по категории
            const matchesCategory = this.filters.category === 'all' || item.category === this.filters.category;
            
            return matchesText && matchesType && matchesCategory;
        });
        
        this.displayResults(results, query);
    }
    
    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>По запросу "${query}" ничего не найдено</p>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = `
            <div class="search-results-info">
                Найдено результатов: ${results.length}
            </div>
            ${results.map(result => `
                <div class="search-result-item">
                    <h4 class="search-result-title">
                        <a href="#${result.id}" onclick="this.closest('.search-result-item').scrollIntoView()">
                            ${this.highlightText(result.title, query)}
                        </a>
                    </h4>
                    <div class="search-result-preview">
                        ${this.highlightText(result.content.substring(0, 200), query)}...
                    </div>
                    <div class="search-result-meta">
                        <span class="search-result-type">${this.getTypeLabel(result.type)}</span>
                        <span class="search-result-category">${this.getCategoryLabel(result.category)}</span>
                    </div>
                </div>
            `).join('')}
        `;
    }
    
    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }
    
    getTypeLabel(type) {
        const labels = {
            'theory': 'Теория',
            'example': 'Пример',
            'checklist': 'Чеклист',
            'tool': 'Инструмент',
            'code': 'Код'
        };
        return labels[type] || type;
    }
    
    getCategoryLabel(category) {
        const labels = {
            'api': 'API',
            'database': 'Базы данных',
            'security': 'Безопасность',
            'modeling': 'Моделирование',
            'general': 'Общее'
        };
        return labels[category] || category;
    }
    
    clearResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>Введите поисковый запрос для отображения результатов</p>
                </div>
            `;
        }
    }
}
