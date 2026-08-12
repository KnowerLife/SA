(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const STORAGE = {
    theme: 'sa_theme_v2',
    font: 'sa_font_v2',
    bookmarks: 'sa_bookmarks_v2',
    notes: 'sa_notes_v2',
    competency: 'sa_competency_v2',
    requirements: 'sa_requirements_v2',
    security: 'sa_security_v2',
    lastSection: 'sa_last_section_v3',
    risks: 'sa_risks_v3',
    traceability: 'sa_traceability_v3',
    decisions: 'sa_decisions_v3'
  };

  function safeParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function readJson(key, fallback) {
    try { return safeParse(localStorage.getItem(key), fallback); }
    catch { return fallback; }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function readText(key, fallback = '') {
    try { return localStorage.getItem(key) || fallback; }
    catch { return fallback; }
  }

  function writeText(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch { return false; }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function normalizeIdentifier(value, fallback = 'field') {
    const normalized = String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .replace(/_{2,}/g, '_');
    const safe = normalized || fallback;
    return /^[0-9]/.test(safe) ? `_${safe}` : safe;
  }

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => { toast.hidden = true; }, 2200);
  }

  async function copyText(text) {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch {}
    area.remove();
    return ok;
  }

  function downloadText(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function initTheme() {
    const root = document.documentElement;
    const saved = readText(STORAGE.theme);
    const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = saved || (systemDark ? 'dark' : 'light');
    const btn = $('#themeToggle');
    const render = () => {
      if (!btn) return;
      const dark = root.dataset.theme === 'dark';
      btn.textContent = dark ? '☀' : '☾';
      btn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
    };
    btn?.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      writeText(STORAGE.theme, root.dataset.theme);
      render();
    });
    render();
  }

  function initFontScale() {
    const root = document.documentElement;
    if (readText(STORAGE.font) === 'large') root.dataset.fontScale = 'large';
    const btn = $('#accessibilityToggle');
    const render = () => {
      const large = root.dataset.fontScale === 'large';
      btn?.setAttribute('aria-pressed', String(large));
      if (btn) btn.textContent = large ? 'A' : 'A+';
    };
    btn?.addEventListener('click', () => {
      if (root.dataset.fontScale === 'large') {
        delete root.dataset.fontScale;
        writeText(STORAGE.font, 'normal');
      } else {
        root.dataset.fontScale = 'large';
        writeText(STORAGE.font, 'large');
      }
      render();
    });
    render();
  }

  function initHeader() {
    const header = $('[data-header]');
    const progress = $('[data-scroll-progress]');
    let ticking = false;
    const update = () => {
      const y = window.scrollY || 0;
      header?.classList.toggle('is-scrolled', y > 8);
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      if (progress) progress.style.width = `${Math.min(100, y / max * 100)}%`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function initMobileNav() {
    const dialog = $('#mobileNav');
    const menuBtn = $('#mobileMenuBtn');
    const closeBtn = $('[data-close-nav]');
    const target = $('[data-mobile-nav-links]');
    const sourceLinks = $$('#desktopNav a');
    if (target) {
      target.replaceChildren(...sourceLinks.map(link => {
        const a = document.createElement('a');
        a.href = link.getAttribute('href');
        a.textContent = link.textContent.trim();
        return a;
      }));
    }
    const open = () => {
      if (!dialog) return;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      menuBtn?.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      if (!dialog) return;
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    };
    menuBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    target?.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    dialog?.addEventListener('click', event => { if (event.target === dialog) close(); });
  }

  function initPrint() {
    $('#pdfExportBtn')?.addEventListener('click', () => window.print());
  }

  function getCards() { return $$('.searchable'); }

  function initSearch() {
    const input = $('#globalSearch');
    const status = $('#searchStatus');
    const empty = $('#noSearchResults');
    const clear = $('#clearSearchBtn');
    const cards = getCards();
    let activeCategory = 'all';
    const apply = () => {
      const term = (input?.value || '').trim().toLocaleLowerCase('ru');
      let shown = 0;
      cards.forEach(card => {
        const haystack = `${card.dataset.title || ''} ${card.dataset.search || ''} ${card.innerText}`.toLocaleLowerCase('ru');
        const textMatch = !term || haystack.includes(term);
        const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
        const match = textMatch && categoryMatch;
        card.hidden = !match;
        if (match) shown++;
      });
      const categoryLabel = activeCategory === 'all' ? '' : ` · ${activeCategory}`;
      if (status) status.textContent = (term || activeCategory !== 'all') ? `Найдено: ${shown} из ${cards.length}${categoryLabel}` : `Показаны все ${cards.length} разделов`;
      if (empty) empty.hidden = shown !== 0;
    };
    input?.addEventListener('input', apply);
    $$('[data-category-filter]').forEach(btn => btn.addEventListener('click', () => {
      activeCategory = btn.dataset.categoryFilter || 'all';
      $$('[data-category-filter]').forEach(item => {
        const pressed = item === btn;
        item.classList.toggle('is-active', pressed);
        item.setAttribute('aria-pressed', String(pressed));
      });
      apply();
    }));
    clear?.addEventListener('click', () => { if (input) { input.value = ''; apply(); input.focus(); } });
    document.addEventListener('keydown', event => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const editing = tag === 'input' || tag === 'textarea' || tag === 'select';
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); input?.focus(); input?.select();
      } else if (event.key === '/' && !editing) {
        event.preventDefault(); input?.focus();
      } else if (event.key === 'Escape' && document.activeElement === input && input?.value) {
        input.value = ''; apply(); input.blur();
      }
    });
    apply();
  }

  function initActiveNav() {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('#desktopNav a');
    const byId = new Map(links.map(a => [a.getAttribute('href')?.slice(1), a]));
    const sections = getCards();
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(link => link.classList.remove('is-active'));
      byId.get(visible.target.id)?.classList.add('is-active');
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .1, .25] });
    sections.forEach(section => observer.observe(section));
  }

  function initBookmarks() {
    let bookmarks = readJson(STORAGE.bookmarks, []);
    if (!Array.isArray(bookmarks)) bookmarks = [];
    const validIds = new Set(getCards().map(card => card.id));
    bookmarks = bookmarks.filter(id => validIds.has(id));
    const list = $('#bookmarksList');
    const counter = $('#bookmarksCounter');

    const titleFor = id => $(`#${CSS.escape(id)}`)?.dataset.title || id;
    const render = () => {
      if (counter) counter.textContent = String(bookmarks.length);
      if (!list) return;
      list.replaceChildren();
      if (!bookmarks.length) {
        const p = document.createElement('p'); p.className = 'muted'; p.textContent = 'Пока пусто'; list.append(p); return;
      }
      bookmarks.forEach(id => {
        const row = document.createElement('div'); row.className = 'bookmark-row';
        const link = document.createElement('a'); link.href = `#${id}`; link.textContent = titleFor(id);
        const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'bookmark-remove'; remove.textContent = '×'; remove.setAttribute('aria-label', `Удалить закладку ${titleFor(id)}`);
        remove.addEventListener('click', () => toggle(id, false));
        row.append(link, remove); list.append(row);
      });
      $$('.bookmark-toggle').forEach(btn => btn.setAttribute('aria-pressed', String(bookmarks.includes(btn.dataset.bookmark))));
    };
    const toggle = (id, announce = true) => {
      bookmarks = bookmarks.includes(id) ? bookmarks.filter(item => item !== id) : [...bookmarks, id];
      writeJson(STORAGE.bookmarks, bookmarks);
      render();
      if (announce) showToast(bookmarks.includes(id) ? 'Добавлено в закладки' : 'Удалено из закладок');
    };
    getCards().forEach(card => {
      const head = $('.card-head', card);
      if (!head) return;
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'bookmark-toggle'; btn.dataset.bookmark = card.id; btn.textContent = '◆'; btn.title = 'Добавить в закладки'; btn.setAttribute('aria-label', `Закладка: ${card.dataset.title || card.id}`);
      btn.addEventListener('click', () => toggle(card.id));
      head.append(btn);
    });
    render();
  }

  function initTimer() {
    let interval = null;
    let remaining = 0;
    const display = $('#meetingTimerDisplay');
    const render = () => {
      const min = Math.floor(remaining / 60).toString().padStart(2,'0');
      const sec = (remaining % 60).toString().padStart(2,'0');
      if (display) display.textContent = `${min}:${sec}`;
    };
    const stop = (reset = false) => {
      if (interval) clearInterval(interval);
      interval = null;
      if (reset) { remaining = 0; render(); }
    };
    $$('[data-time]').forEach(btn => btn.addEventListener('click', () => {
      stop(); remaining = Number(btn.dataset.time) || 0; render();
      interval = setInterval(() => {
        remaining = Math.max(0, remaining - 1); render();
        if (remaining <= 0) { stop(); showToast('Таймер завершён'); }
      }, 1000);
    }));
    $('#stopMeetingTimer')?.addEventListener('click', () => stop(true));
  }

  function initDecisionTree() {
    const step1 = $('#tree-step1');
    const step2 = $('#tree-step2');
    const question = $('#step2-question');
    const options = $('#step2-options');
    const result = $('#tree-result');
    const resultText = $('#result-text');
    const resultDescription = $('#result-description');
    const recommendations = {
      scrum: ['Scrum', 'Подходит, когда полезны короткие итерации, цель спринта и регулярная обратная связь по продукту.'],
      kanban: ['Kanban', 'Подходит для непрерывного потока, поддержки и работы с меняющимся входящим приоритетом.'],
      waterfall: ['Predictive / Waterfall', 'Подходит, когда изменения дороги, этапы жестко зависят друг от друга, а требования можно стабилизировать заранее.'],
      hybrid: ['Hybrid', 'Комбинируйте управляемые этапы для обязательных контрольных точек с итеративной delivery-моделью внутри этапов.']
    };
    const showResult = key => {
      const [name, description] = recommendations[key] || recommendations.hybrid;
      if (step2) step2.hidden = true;
      if (result) result.hidden = false;
      if (resultText) resultText.textContent = name;
      if (resultDescription) resultDescription.textContent = description;
    };
    $$('[data-tree]').forEach(btn => btn.addEventListener('click', () => {
      const mode = btn.dataset.tree;
      if (step1) step1.hidden = true;
      if (step2) step2.hidden = false;
      if (!question || !options) return;
      options.replaceChildren();
      if (mode === 'iterative') {
        question.textContent = 'Работа поступает непрерывным потоком без естественной границы спринта?';
        [['Да','kanban'],['Нет','scrum']].forEach(([label,key]) => {
          const b = document.createElement('button'); b.type='button'; b.className='btn btn--secondary btn--small'; b.textContent=label; b.addEventListener('click',()=>showResult(key)); options.append(b);
        });
      } else {
        question.textContent = 'Есть обязательные фиксированные этапы или регуляторные контрольные точки?';
        [['Да','waterfall'],['Частично','hybrid']].forEach(([label,key]) => {
          const b = document.createElement('button'); b.type='button'; b.className='btn btn--secondary btn--small'; b.textContent=label; b.addEventListener('click',()=>showResult(key)); options.append(b);
        });
      }
    }));
    $('#resetTreeBtn')?.addEventListener('click', () => {
      if (step1) step1.hidden = false; if (step2) step2.hidden = true; if (result) result.hidden = true;
    });
  }

  function initDataModeler() {
    let entities = [];
    const container = $('#entitiesList');
    const preview = $('#sqlPreview');
    const render = () => {
      if (!container) return;
      container.replaceChildren();
      if (!entities.length) {
        const p = document.createElement('p'); p.className='muted'; p.textContent='Сущности еще не добавлены.'; container.append(p); return;
      }
      entities.forEach((entity,index) => {
        const row = document.createElement('div'); row.className='entity-row';
        const text = document.createElement('div');
        const strong = document.createElement('strong'); strong.textContent=entity.name;
        const small = document.createElement('small'); small.textContent=entity.attrs.join(', ');
        text.append(strong,small);
        const actions = document.createElement('div'); actions.className='entity-actions';
        const attr = document.createElement('button'); attr.type='button'; attr.textContent='+'; attr.title='Добавить атрибут';
        attr.addEventListener('click',()=>{
          const value = prompt('Название атрибута, например email');
          if (!value) return;
          const safe = normalizeIdentifier(value,'field');
          if (!entity.attrs.includes(safe)) entity.attrs.push(safe);
          render();
        });
        const rename = document.createElement('button'); rename.type='button'; rename.textContent='✎'; rename.title='Переименовать';
        rename.addEventListener('click',()=>{
          const value = prompt('Новое имя сущности',entity.name); if(!value)return; entity.name=normalizeIdentifier(value,'entity'); render();
        });
        const remove = document.createElement('button'); remove.type='button'; remove.textContent='×'; remove.title='Удалить';
        remove.addEventListener('click',()=>{entities.splice(index,1);render();});
        actions.append(attr,rename,remove); row.append(text,actions); container.append(row);
      });
    };
    $('#addEntityBtn')?.addEventListener('click',()=>{
      const value=prompt('Название сущности, например users'); if(!value)return;
      const name=normalizeIdentifier(value,'entity');
      if(entities.some(e=>e.name===name)){showToast('Такая сущность уже есть');return;}
      entities.push({name,attrs:['id','created_at']});render();
    });
    $('#clearEntitiesBtn')?.addEventListener('click',()=>{entities=[];render();if(preview)preview.textContent='-- Добавьте хотя бы одну сущность';});
    $('#genSqlBtn')?.addEventListener('click',()=>{
      if(!preview)return;
      if(!entities.length){preview.textContent='-- Добавьте хотя бы одну сущность';return;}
      preview.textContent=entities.map(entity=>`CREATE TABLE ${entity.name} (\n  ${entity.attrs.map((attr,index)=>`${attr} ${index===0 && attr==='id'?'BIGINT PRIMARY KEY':'VARCHAR(255)'}`).join(',\n  ')}\n);`).join('\n\n');
    });
    render();
  }

  const quizBank = {
    requirements:[{q:'Что относится к нефункциональным требованиям?',o:['Создание заказа','Время ответа API','Редактирование профиля'],a:1},{q:'Что делает требование тестируемым?',o:['Большой объем текста','Критерии приемки','Ссылка на макет'],a:1}],
    api:[{q:'Какой метод обычно используется для чтения ресурса?',o:['GET','POST','DELETE'],a:0},{q:'Какой код означает, что ресурс не найден?',o:['201','404','503'],a:1}],
    db:[{q:'Что означает атомарность значений в таблице?',o:['1NF','2NF','3NF'],a:0},{q:'Какой оператор связывает строки нескольких таблиц?',o:['JOIN','ORDER BY','TRUNCATE'],a:0}],
    bpmn:[{q:'Какой элемент BPMN используется для ветвления?',o:['Task','Gateway','Pool'],a:1},{q:'Что обычно разделяет ответственность участников?',o:['Lane','Timer','Message'],a:0}],
    security:[{q:'Что должно быть описано для авторизации?',o:['Только пароль','Роли и права','Только HTTPS'],a:1},{q:'Что помогает анализировать угрозы?',o:['STRIDE','CRUD','INVEST'],a:0}],
    ddd:[{q:'Что задает границу применимости модели?',o:['Bounded Context','HTTP endpoint','Sprint Goal'],a:0},{q:'Что такое Ubiquitous Language?',o:['Единый язык домена','Язык SQL','Язык интерфейса'],a:0}]
  };

  function initQuiz() {
    const area=$('#testArea'); const select=$('#testSection'); let questions=[]; let index=0; let answers=[];
    const render=()=>{
      if(!area||!questions.length)return;
      const q=questions[index]; area.replaceChildren();
      const card=document.createElement('div'); card.className='test-card';
      const meta=document.createElement('div'); meta.className='test-meta'; const progress=document.createElement('span'); progress.textContent=`Вопрос ${index+1}/${questions.length}`; const topic=document.createElement('span'); topic.textContent=select?.selectedOptions?.[0]?.textContent||''; meta.append(progress,topic);
      const title=document.createElement('h3'); title.textContent=q.q;
      const options=document.createElement('div'); options.className='test-options';
      q.o.forEach((text,i)=>{const label=document.createElement('label');label.className='checklist-item';const radio=document.createElement('input');radio.type='radio';radio.name='quizOption';radio.value=String(i);radio.checked=answers[index]===i;radio.addEventListener('change',()=>{answers[index]=i;});label.append(radio,document.createTextNode(text));options.append(label);});
      const actions=document.createElement('div');actions.className='button-row';
      const prev=document.createElement('button');prev.type='button';prev.className='btn btn--secondary btn--small';prev.textContent='← Назад';prev.disabled=index===0;prev.addEventListener('click',()=>{index--;render();});
      const next=document.createElement('button');next.type='button';next.className='btn btn--primary btn--small';next.textContent=index===questions.length-1?'Завершить':'Далее →';next.addEventListener('click',()=>{if(index<questions.length-1){index++;render();}else finish();});
      actions.append(prev,next);card.append(meta,title,options,actions);area.append(card);
    };
    const finish=()=>{if(!area)return;const correct=questions.reduce((sum,q,i)=>sum+(answers[i]===q.a?1:0),0);const percent=Math.round(correct/questions.length*100);area.replaceChildren();const result=document.createElement('div');result.className='decision-result';const label=document.createElement('span');label.textContent='Результат';const score=document.createElement('strong');score.textContent=`${correct}/${questions.length} · ${percent}%`;const text=document.createElement('p');text.textContent=percent>=80?'Хороший результат. Можно переходить к следующему разделу.':'Есть смысл повторить теорию и пройти тест еще раз.';const restart=document.createElement('button');restart.type='button';restart.className='btn btn--secondary btn--small';restart.textContent='Пройти заново';restart.addEventListener('click',start);result.append(label,score,text,restart);area.append(result);};
    const start=()=>{questions=[...(quizBank[select?.value]||[])];index=0;answers=new Array(questions.length).fill(null);render();};
    $('#startTestBtn')?.addEventListener('click',start);
  }

  const docTemplates = {
    srs:'1. Введение\n1.1 Цель документа\n1.2 Область решения\n1.3 Термины\n\n2. Контекст\n2.1 Пользователи и роли\n2.2 Ограничения\n\n3. Функциональные требования\nFR-001 ...\n\n4. Нефункциональные требования\nNFR-001 ...\n\n5. Интеграции и данные\n\n6. Критерии приемки\n\n7. Открытые вопросы',
    'user-stories':'Как [роль], я хочу [возможность], чтобы [ценность].\n\nAcceptance Criteria\nGiven ...\nWhen ...\nThen ...\n\nОшибочные сценарии:\n- ...\n\nПриоритет: Must / Should / Could',
    'api-spec':'openapi: 3.0.3\ninfo:\n  title: Example API\n  version: 1.0.0\npaths:\n  /resource/{id}:\n    get:\n      summary: Get resource\n      parameters:\n        - in: path\n          name: id\n          required: true\n          schema:\n            type: string\n      responses:\n        \'200\':\n          description: Success\n        \'404\':\n          description: Not found',
    'test-cases':'Название: Успешный сценарий\nПредусловия:\n- ...\n\nШаги:\n1. ...\n2. ...\n\nОжидаемый результат:\n- ...\n\nПостусловия:\n- ...'
  };

  function initDocuments() {
    $$('[data-doc]').forEach(btn=>btn.addEventListener('click',()=>{const content=docTemplates[btn.dataset.doc]||'';const textarea=$('#docContent');if(textarea)textarea.value=content;const editor=$('#docEditor');if(editor)editor.hidden=false;}));
    $('#downloadDocBtn')?.addEventListener('click',()=>downloadText('sa-template.txt',$('#docContent')?.value||''));
    $('#generateDocBtn')?.addEventListener('click',()=>{const type=$('#docTypeSelect')?.value;const out=$('#generatedDoc');if(out)out.value=docTemplates[type]||'';});
    $('#downloadGeneratedDoc')?.addEventListener('click',()=>downloadText('sa-generated-document.txt',$('#generatedDoc')?.value||''));
  }

  const messageTemplates = {
    clarification:'Коллеги, добрый день.\n\nНужно уточнить несколько моментов по [задаче]:\n1. [вопрос]\n2. [вопрос]\n\nЭто необходимо, чтобы зафиксировать [решение / критерий / ограничение].\nСпасибо.',
    meeting:'Коллеги, предлагаю встречу по теме [тема].\n\nЦель: [какое решение нужно получить].\nВходные материалы: [ссылка].\nПовестка:\n1. ...\n2. ...\n\nОжидаемый результат встречи: [решение / список вопросов].',
    review:'Коллеги, прошу провести ревью [документа / схемы / API-контракта].\n\nЧто важно проверить:\n- полнота сценариев;\n- ошибки и ограничения;\n- согласованность с текущей системой.\n\nКомментарии прошу оставить до [дата].',
    update:'Статус по [задаче]\n\nГотово:\n- ...\n\nВ работе:\n- ...\n\nОткрытые вопросы / блокеры:\n- ...\n\nСледующий шаг:\n- ...'
  };

  function initMessages() {
    $$('[data-email]').forEach(btn=>btn.addEventListener('click',()=>{const area=$('#emailTemplateText');if(area)area.value=messageTemplates[btn.dataset.email]||'';}));
    $('#copyEmailBtn')?.addEventListener('click',async()=>showToast(await copyText($('#emailTemplateText')?.value||'')?'Скопировано':'Не удалось скопировать'));
  }

  function initConverter() {
    const factors={kb:1,mb:1024,gb:1024*1024};
    const run=()=>{const value=Number($('#conv-input')?.value);const from=$('#conv-from')?.value;const to=$('#conv-to')?.value;const out=$('#conv-output');if(!out)return;if(!Number.isFinite(value)){out.value='Введите число';return;}const result=value*factors[from]/factors[to];out.value=`${Number(result.toFixed(6))} ${to.toUpperCase()}`;};
    $('#convertBtn')?.addEventListener('click',run);['#conv-input','#conv-from','#conv-to'].forEach(selector=>$(selector)?.addEventListener('change',run));run();
  }

  function initApiTester() {
    $('#sendApiBtn')?.addEventListener('click',async()=>{
      const method=$('#apiMethod')?.value||'GET';const url=$('#apiUrl')?.value?.trim();const out=$('#apiResponse');const status=$('#apiStatus');if(!out||!url)return;
      let parsed;try{parsed=new URL(url);}catch{out.textContent='Ошибка: некорректный URL';return;}if(!/^https?:$/.test(parsed.protocol)){out.textContent='Ошибка: поддерживаются только http/https URL';return;}
      out.textContent='Отправка запроса…';if(status)status.textContent='Loading…';
      const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);
      try{
        const options={method,signal:controller.signal,headers:{Accept:'application/json,text/plain;q=0.9,*/*;q=0.8'}};
        if(method==='POST'){options.headers['Content-Type']='application/json';options.body=JSON.stringify({title:'Test request from SA Guide',body:'Browser demo',userId:1});}
        const response=await fetch(url,options);clearTimeout(timeout);
        const contentType=response.headers.get('content-type')||'';const raw=await response.text();let body=raw;
        if(contentType.includes('application/json')){try{body=JSON.stringify(JSON.parse(raw),null,2);}catch{}}
        out.textContent=body||'(пустой ответ)';if(status)status.textContent=`${response.status} ${response.statusText||''}`.trim();
      }catch(error){clearTimeout(timeout);const message=error?.name==='AbortError'?'таймаут 10 секунд':(error?.message||'неизвестная ошибка');out.textContent=`Ошибка запроса: ${message}\n\nВозможная причина — CORS-политика целевого API или отсутствие сети.`;if(status)status.textContent='Request failed';}
    });
    $$('[data-api-url]').forEach(btn=>btn.addEventListener('click',()=>{const input=$('#apiUrl');if(input)input.value=btn.dataset.apiUrl||'';}));
  }

  function initNotes() {
    let notes=readJson(STORAGE.notes,[]);if(!Array.isArray(notes))notes=[];
    const list=$('#notesList');
    const render=()=>{if(!list)return;list.replaceChildren();if(!notes.length){const p=document.createElement('p');p.className='muted';p.textContent='Заметок пока нет.';list.append(p);return;}notes.forEach(note=>{const card=document.createElement('article');card.className='note-card';const head=document.createElement('div');head.className='note-card-head';const title=document.createElement('strong');title.textContent=note.title;const del=document.createElement('button');del.type='button';del.className='note-delete';del.textContent='Удалить';del.addEventListener('click',()=>{notes=notes.filter(item=>item.id!==note.id);writeJson(STORAGE.notes,notes);render();});head.append(title,del);const time=document.createElement('time');time.dateTime=note.iso||'';time.textContent=note.date||'';const body=document.createElement('p');body.textContent=note.content;card.append(head,time,body);list.append(card);});};
    $('#addNoteBtn')?.addEventListener('click',()=>{const title=$('#noteTitle')?.value.trim();const content=$('#noteContent')?.value.trim();if(!title){showToast('Введите заголовок');$('#noteTitle')?.focus();return;}const now=new Date();notes.unshift({id:Date.now(),title,content,date:now.toLocaleString('ru-RU'),iso:now.toISOString()});notes=notes.slice(0,50);writeJson(STORAGE.notes,notes);if($('#noteTitle'))$('#noteTitle').value='';if($('#noteContent'))$('#noteContent').value='';render();showToast('Заметка сохранена локально');});render();
  }

  function initPersistentChecklist(ids,key,fillSelector,percentSelector,resetSelector) {
    if (!ids.some(id => $(`#${id}`))) return;
    const saved=readJson(key,{});ids.forEach(id=>{const input=$(`#${id}`);if(input&&saved[id])input.checked=true;});
    const update=()=>{const state={};let checked=0;ids.forEach(id=>{const input=$(`#${id}`);state[id]=Boolean(input?.checked);if(state[id])checked++;});writeJson(key,state);const percent=Math.round(checked/ids.length*100);const fill=$(fillSelector);if(fill)fill.style.width=`${percent}%`;const label=$(percentSelector);if(label)label.textContent=`${percent}%`;};
    ids.forEach(id=>$(`#${id}`)?.addEventListener('change',update));$(resetSelector)?.addEventListener('click',()=>{ids.forEach(id=>{const input=$(`#${id}`);if(input)input.checked=false;});update();});update();
  }

  function initCompetency() {
    const ids=$$('.comp-cb').map(cb=>cb.id);const saved=readJson(STORAGE.competency,{});ids.forEach(id=>{const cb=$(`#${id}`);if(cb&&saved[id])cb.checked=true;});
    const update=()=>{const checked=ids.filter(id=>$(`#${id}`)?.checked).length;const percent=Math.round(checked/ids.length*100);const fill=$('#compProgressFill');if(fill)fill.style.width=`${percent}%`;const label=$('#compProgressPercent');if(label)label.textContent=`${percent}%`;};
    ids.forEach(id=>$(`#${id}`)?.addEventListener('change',update));
    $('#saveCompBtn')?.addEventListener('click',()=>{const state=Object.fromEntries(ids.map(id=>[id,Boolean($(`#${id}`)?.checked)]));writeJson(STORAGE.competency,state);showToast('Прогресс сохранён');});
    $('#resetCompBtn')?.addEventListener('click',()=>{ids.forEach(id=>{const cb=$(`#${id}`);if(cb)cb.checked=false;});writeJson(STORAGE.competency,{});update();});update();
  }

  function initCopyButtons() {
    $$('[data-copy-target]').forEach(btn=>btn.addEventListener('click',async()=>{const target=$(`#${CSS.escape(btn.dataset.copyTarget)}`);const text='value' in (target||{})?target.value:target?.textContent||'';showToast(await copyText(text)?'Скопировано':'Не удалось скопировать');}));
  }


  function initSectionUtilities() {
    const continueBlock = $('#continueBlock');
    const continueLink = $('#continueLink');
    const continueLabel = $('#continueLabel');
    const cards = getCards();
    const setContinue = id => {
      const card = id ? $(`#${CSS.escape(id)}`) : null;
      if (!card || !continueBlock || !continueLink || !continueLabel) return;
      continueLink.href = `#${id}`;
      continueLabel.textContent = card.dataset.title || id;
      continueBlock.hidden = false;
    };
    const saved = readText(STORAGE.lastSection);
    if (saved) setContinue(saved);

    cards.forEach(card => {
      const head = $('.card-head', card);
      if (!head || head.querySelector('.deep-link-copy')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'deep-link-copy';
      button.textContent = '↗';
      button.title = 'Копировать ссылку на раздел';
      button.setAttribute('aria-label', `Копировать ссылку: ${card.dataset.title || card.id}`);
      button.addEventListener('click', async () => {
        const url = `${location.origin}${location.pathname}#${card.id}`;
        showToast(await copyText(url) ? 'Ссылка скопирована' : 'Не удалось скопировать ссылку');
      });
      head.append(button);
    });

    if ('IntersectionObserver' in window) {
      let lastWrite = '';
      const observer = new IntersectionObserver(entries => {
        const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
        if (!current || current.intersectionRatio < 0.28) return;
        const id = current.target.id;
        if (!id || id === lastWrite) return;
        lastWrite = id;
        writeText(STORAGE.lastSection, id);
        setContinue(id);
      }, { rootMargin: '-15% 0px -55% 0px', threshold: [0.28,0.5,0.75] });
      cards.forEach(card => observer.observe(card));
    }
  }

  function initRequirementChecker() {
    const input = $('#requirementInput');
    const scoreBox = $('#requirementScore');
    const findings = $('#requirementFindings');
    const weakWords = ['быстро','удобно','просто','примерно','около','оптимально','корректно','по возможности','при необходимости','достаточно','минимально','максимально','современный','эффективно'];
    const renderFinding = (text, type='warn') => {
      if (!findings) return;
      const li = document.createElement('li'); li.className = `finding finding--${type}`; li.textContent = text; findings.append(li);
    };
    const analyze = () => {
      const text = input?.value.trim() || '';
      if (!scoreBox || !findings) return;
      findings.replaceChildren();
      if (!text) { scoreBox.querySelector('strong').textContent='—'; scoreBox.querySelector('span').textContent='Введите формулировку требования'; return; }
      let score = 100;
      const lower = text.toLocaleLowerCase('ru');
      const foundWeak = weakWords.filter(word => lower.includes(word));
      if (text.length < 30) { score -= 15; renderFinding('Формулировка слишком короткая: вероятно, не хватает условия, объекта или результата.'); }
      if (!/(система|сервис|пользователь|клиент|оператор|api|приложение|модуль)/i.test(text)) { score -= 8; renderFinding('Неочевиден субъект требования — кто именно должен выполнить действие.'); }
      if (!/(долж|необходимо|требуется|shall|must)/i.test(text)) { score -= 8; renderFinding('Нет явной обязательности: полезно использовать «должна/должен» или эквивалент.'); }
      if (foundWeak.length) { score -= Math.min(24, foundWeak.length*8); renderFinding(`Найдены неоднозначные слова: ${foundWeak.join(', ')}.`); }
      if (/и.+и/i.test(text) && text.length > 120) { score -= 10; renderFinding('Возможно, в одном требовании объединено несколько независимых условий — проверьте атомарность.'); }
      if (!/(\d|ms|мс|сек|мин|rps|%|не более|не менее|ровно|статус|код|given|when|then)/i.test(text)) { score -= 10; renderFinding('Не виден измеримый критерий или наблюдаемый результат. Добавьте acceptance criteria.', 'info'); }
      if (!/[.!?]$/.test(text)) { score -= 3; renderFinding('Добавьте завершенную пунктуацию — это мелочь, но помогает качеству документации.', 'info'); }
      score = Math.max(0, score);
      scoreBox.querySelector('strong').textContent = `${score}/100`;
      scoreBox.querySelector('span').textContent = score >= 85 ? 'Формулировка выглядит достаточно конкретной' : score >= 65 ? 'Нужны уточнения перед согласованием' : 'Высокий риск неоднозначного понимания';
      if (!findings.children.length) renderFinding('Явных эвристических проблем не найдено. Все равно проверьте контекст, исключения и критерии приемки.', 'ok');
    };
    $('#analyzeRequirementBtn')?.addEventListener('click', analyze);
    $('#clearRequirementBtn')?.addEventListener('click', () => { if(input)input.value=''; if(findings)findings.replaceChildren(); if(scoreBox){scoreBox.querySelector('strong').textContent='—';scoreBox.querySelector('span').textContent='Добавьте требование для проверки';}});
  }

  function initAcceptanceBuilder() {
    const build = () => {
      const given = $('#acGiven')?.value.trim() || '...';
      const when = $('#acWhen')?.value.trim() || '...';
      const then = $('#acThen')?.value.trim() || '...';
      const out = $('#acceptanceOutput');
      if (out) out.textContent = `Scenario: [название]\nGiven ${given}\nWhen ${when}\nThen ${then}`;
    };
    $('#buildAcceptanceBtn')?.addEventListener('click', build);
  }

  function formatDuration(totalMinutes) {
    const minutes = Math.max(0, totalMinutes);
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.round((minutes - Math.floor(minutes)) * 60);
    return [days ? `${days} д` : '', hours ? `${hours} ч` : '', mins ? `${mins} мин` : '', secs ? `${secs} сек` : ''].filter(Boolean).join(' ') || '0 сек';
  }

  function initSlaCalculator() {
    const run = () => {
      const availability = Number($('#slaPercent')?.value);
      const days = Number($('#slaPeriod')?.value || 30);
      const out = $('#slaResult');
      if (!out) return;
      if (!Number.isFinite(availability) || availability < 0 || availability > 100) { out.textContent='Введите значение от 0 до 100%'; return; }
      const downtime = days * 24 * 60 * (1 - availability / 100);
      out.replaceChildren();
      const strong=document.createElement('strong');strong.textContent=`${availability}%`;
      const span=document.createElement('span');span.textContent=`Допустимый простой за ${days} дней: ${formatDuration(downtime)}`;
      out.append(strong,span);
    };
    $('#calcSlaBtn')?.addEventListener('click',run); $('#slaPercent')?.addEventListener('input',run); $('#slaPeriod')?.addEventListener('change',run); run();
  }

  function initPertCalculator() {
    const run=()=>{
      const o=Number($('#pertO')?.value),m=Number($('#pertM')?.value),p=Number($('#pertP')?.value),out=$('#pertResult');if(!out)return;
      if (![o,m,p].every(Number.isFinite) || o<0 || m<0 || p<0 || o>m || m>p) { out.textContent='Ожидается O ≤ M ≤ P и неотрицательные значения.'; return; }
      const expected=(o+4*m+p)/6;const sigma=(p-o)/6;
      out.replaceChildren();const strong=document.createElement('strong');strong.textContent=`PERT ≈ ${Number(expected.toFixed(2))}`;const span=document.createElement('span');span.textContent=`σ ≈ ${Number(sigma.toFixed(2))}; диапазон ~95%: ${Number(Math.max(0,expected-2*sigma).toFixed(2))}–${Number((expected+2*sigma).toFixed(2))}`;out.append(strong,span);
    };
    $('#calcPertBtn')?.addEventListener('click',run);['#pertO','#pertM','#pertP'].forEach(sel=>$(sel)?.addEventListener('input',run));run();
  }

  const HTTP_STATUSES = [
    [200,'OK','Успешное чтение или обработка'],[201,'Created','Ресурс создан'],[202,'Accepted','Запрос принят в асинхронную обработку'],[204,'No Content','Успех без тела ответа'],
    [304,'Not Modified','Используйте закэшированную версию'],[400,'Bad Request','Некорректный запрос'],[401,'Unauthorized','Требуется аутентификация'],[403,'Forbidden','Аутентификация есть, доступа нет'],[404,'Not Found','Ресурс не найден'],[409,'Conflict','Конфликт состояния/версии'],[412,'Precondition Failed','Не выполнено условие запроса'],[415,'Unsupported Media Type','Неподдерживаемый Content-Type'],[422,'Unprocessable Content','Синтаксис валиден, бизнес-валидация не пройдена'],[429,'Too Many Requests','Превышен rate limit'],
    [500,'Internal Server Error','Необработанная ошибка сервера'],[502,'Bad Gateway','Ошибка upstream'],[503,'Service Unavailable','Сервис временно недоступен'],[504,'Gateway Timeout','Upstream не ответил вовремя']
  ];

  function initHttpReference() {
    const input=$('#httpSearch'), list=$('#httpStatusList');
    const render=()=>{if(!list)return;const term=(input?.value||'').trim().toLowerCase();list.replaceChildren();HTTP_STATUSES.filter(([code,name,desc])=>!term||`${code} ${name} ${desc}`.toLowerCase().includes(term)).forEach(([code,name,desc])=>{const row=document.createElement('div');row.className='http-status-row';const c=document.createElement('code');c.textContent=String(code);const body=document.createElement('div');const st=document.createElement('strong');st.textContent=name;const sp=document.createElement('span');sp.textContent=desc;body.append(st,sp);row.append(c,body);list.append(row);});if(!list.children.length){const p=document.createElement('p');p.className='muted';p.textContent='Совпадений нет.';list.append(p);}};
    input?.addEventListener('input',render);render();
  }

  function initRiskMatrix() {
    let risks=readJson(STORAGE.risks,[]);if(!Array.isArray(risks))risks=[];const list=$('#riskList');
    const render=()=>{if(!list)return;list.replaceChildren();if(!risks.length){const p=document.createElement('p');p.className='muted';p.textContent='Риски еще не добавлены.';list.append(p);return;}risks.sort((a,b)=>b.score-a.score).forEach(risk=>{const row=document.createElement('div');row.className='risk-row';const score=document.createElement('span');score.className=`risk-score risk-score--${risk.score>15?'critical':risk.score>10?'high':risk.score>5?'medium':'low'}`;score.textContent=String(risk.score);const body=document.createElement('div');const title=document.createElement('strong');title.textContent=risk.title;const meta=document.createElement('small');meta.textContent=`P${risk.p} × I${risk.i}`;body.append(title,meta);const del=document.createElement('button');del.type='button';del.className='note-delete';del.textContent='Удалить';del.addEventListener('click',()=>{risks=risks.filter(r=>r.id!==risk.id);writeJson(STORAGE.risks,risks);render();});row.append(score,body,del);list.append(row);});};
    $('#addRiskBtn')?.addEventListener('click',()=>{const title=$('#riskTitle')?.value.trim();const p=Number($('#riskProbability')?.value),i=Number($('#riskImpact')?.value);if(!title){showToast('Опишите риск');return;}if(![p,i].every(v=>Number.isInteger(v)&&v>=1&&v<=5)){showToast('Вероятность и влияние — от 1 до 5');return;}risks.push({id:Date.now(),title,p,i,score:p*i});writeJson(STORAGE.risks,risks);if($('#riskTitle'))$('#riskTitle').value='';render();});render();
  }

  function csvCell(value) { const text=String(value??''); return /[",\n]/.test(text)?`"${text.replace(/"/g,'""')}"`:text; }
  function initTraceabilityTool() {
    let rows=readJson(STORAGE.traceability,[]);if(!Array.isArray(rows))rows=[];const body=$('#traceTableBody');
    const render=()=>{if(!body)return;body.replaceChildren();rows.forEach(row=>{const tr=document.createElement('tr');[row.goal,row.requirement,row.acceptance].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td);});const actions=document.createElement('td');const del=document.createElement('button');del.type='button';del.className='table-delete';del.textContent='×';del.setAttribute('aria-label','Удалить строку');del.addEventListener('click',()=>{rows=rows.filter(r=>r.id!==row.id);writeJson(STORAGE.traceability,rows);render();});actions.append(del);tr.append(actions);body.append(tr);});};
    $('#addTraceRowBtn')?.addEventListener('click',()=>{const goal=$('#traceGoal')?.value.trim(),requirement=$('#traceRequirement')?.value.trim(),acceptance=$('#traceAcceptance')?.value.trim();if(!requirement){showToast('Укажите requirement');return;}rows.push({id:Date.now(),goal,requirement,acceptance});writeJson(STORAGE.traceability,rows);['#traceGoal','#traceRequirement','#traceAcceptance'].forEach(sel=>{if($(sel))$(sel).value='';});render();});
    $('#clearTraceBtn')?.addEventListener('click',()=>{rows=[];writeJson(STORAGE.traceability,rows);render();});
    $('#exportTraceCsvBtn')?.addEventListener('click',()=>{const csv=['Goal,Requirement,Acceptance/Test',...rows.map(r=>[r.goal,r.requirement,r.acceptance].map(csvCell).join(','))].join('\n');downloadText('traceability-matrix.csv',csv);});render();
  }

  function initDecisionLog() {
    let decisions=readJson(STORAGE.decisions,[]);if(!Array.isArray(decisions))decisions=[];const list=$('#decisionList');
    const render=()=>{if(!list)return;list.replaceChildren();if(!decisions.length){const p=document.createElement('p');p.className='muted';p.textContent='Локальных решений пока нет.';list.append(p);return;}decisions.forEach((d,index)=>{const card=document.createElement('article');card.className='decision-entry';const head=document.createElement('div');head.className='decision-entry-head';const title=document.createElement('strong');title.textContent=`ADR-${String(index+1).padStart(3,'0')} · ${d.title}`;const status=document.createElement('span');status.textContent=d.status;head.append(title,status);const context=document.createElement('p');context.textContent=d.context||'Контекст не указан';const consequences=document.createElement('small');consequences.textContent=`Последствия: ${d.consequences||'—'}`;const del=document.createElement('button');del.type='button';del.className='note-delete';del.textContent='Удалить';del.addEventListener('click',()=>{decisions=decisions.filter(item=>item.id!==d.id);writeJson(STORAGE.decisions,decisions);render();});card.append(head,context,consequences,del);list.append(card);});};
    $('#saveDecisionBtn')?.addEventListener('click',()=>{const title=$('#decisionTitle')?.value.trim();if(!title){showToast('Укажите решение');return;}decisions.push({id:Date.now(),title,status:$('#decisionStatus')?.value||'Accepted',context:$('#decisionContext')?.value.trim()||'',consequences:$('#decisionConsequences')?.value.trim()||'',date:new Date().toISOString()});writeJson(STORAGE.decisions,decisions);['#decisionTitle','#decisionContext','#decisionConsequences'].forEach(sel=>{if($(sel))$(sel).value='';});render();showToast('Решение сохранено локально');});
    $('#exportDecisionsBtn')?.addEventListener('click',()=>{const md=decisions.map((d,i)=>`# ADR-${String(i+1).padStart(3,'0')}: ${d.title}\n\nStatus: ${d.status}\nDate: ${d.date||''}\n\n## Context\n${d.context||'—'}\n\n## Consequences\n${d.consequences||'—'}\n`).join('\n---\n\n');downloadText('architecture-decisions.md',md);});render();
  }

  function initGlossaryFilter() {
    const input=$('#glossarySearch');const items=$$('#glossary .glossary-grid > div');input?.addEventListener('input',()=>{const term=input.value.trim().toLowerCase();items.forEach(item=>item.hidden=Boolean(term&&!item.innerText.toLowerCase().includes(term)));});
  }

  function initBackToTop() {
    const btn=$('#backToTopBtn');if(!btn)return;let ticking=false;const update=()=>{btn.hidden=window.scrollY<900;ticking=false;};window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}}, {passive:true});btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));update();
  }

  function initPwaInstall() {
    let promptEvent=null;const btn=$('#installAppBtn');
    window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;if(btn)btn.hidden=false;});
    btn?.addEventListener('click',async()=>{if(!promptEvent)return;promptEvent.prompt();try{await promptEvent.userChoice;}catch{}promptEvent=null;btn.hidden=true;});
    window.addEventListener('appinstalled',()=>{if(btn)btn.hidden=true;showToast('SA Guide установлен');});
    if('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}),{once:true});
  }

  function initFooter() { const y=$('#currentYear'); if(y)y.textContent=String(new Date().getFullYear()); }

  document.addEventListener('DOMContentLoaded',()=>{
    initTheme();
    initFontScale();
    initHeader();
    initMobileNav();
    initPrint();
    initSearch();
    initActiveNav();
    initBookmarks();
    initSectionUtilities();
    initTimer();
    initDecisionTree();
    initDataModeler();
    initQuiz();
    initDocuments();
    initMessages();
    initConverter();
    initApiTester();
    initRequirementChecker();
    initAcceptanceBuilder();
    initSlaCalculator();
    initPertCalculator();
    initHttpReference();
    initRiskMatrix();
    initTraceabilityTool();
    initDecisionLog();
    initGlossaryFilter();
    initBackToTop();
    initPwaInstall();
    initNotes();
    initPersistentChecklist(['sec1','sec2','sec3','sec4','sec5','sec6'],STORAGE.security,'#secChecklistProgress','#secChecklistPercent','#resetSecChecklist');
    initPersistentChecklist(['chStakeholders','chUserStories','chAcceptance','chNonFunctional','chTrace'],STORAGE.requirements,'#reqChecklistProgress','#reqChecklistPercent','#resetReqChecklist');
    initCompetency();
    initCopyButtons();
    initFooter();
  });
})();
