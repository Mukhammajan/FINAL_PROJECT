const state = { books: [], cart: new Map(), category: "all", query: "", locale: "kk" };
const categories = ["all", "fiction", "programming", "textbooks", "youngAdult", "children", "nonfiction"];
const categoryGroups = {
  Programming: "programming", Textbooks: "textbooks", Children: "children", "Young Adult": "youngAdult",
  Science: "nonfiction", "Personal Growth": "nonfiction"
};
const coverPalette = ["#496047", "#53698a", "#a87350", "#735b75", "#3f7071", "#9a7445"];
const translations = {
  kk: {
    announcement: 'Оқуға арналған жаңа әлем — <strong>әр тапсырысқа 10% жеңілдік</strong>', brand: "КІТАП ДҮКЕНІ", homeLabel: "Qalam басты бет", navLabel: "Негізгі мәзір", categoryLabel: "Кітап санаттары", languageGroup: "Тілді таңдау", initials: ["О", "А", "М"], artLabel: "Кітаптар мен гүл бейнеленген иллюстрация", artCaption: "БАЯУЛА<br>ДЕМАЛ &<br>КӨБІРЕК ОҚЫ", artBook: "ӘР БЕТТЕ<br>ЖАҢА ӘЛЕМ", artBookName: "ҚАЛАМ", artSticker: "оқы.<br>арманда.", copyright: "© 2026 Qalam кітап дүкені", navCatalog: "Каталог", navAbout: "Біз туралы", cart: "Себет",
    heroEyebrow: "СІЗДІҢ КЕЛЕСІ СҮЙІКТІ КІТАБЫҢЫЗ", heroTitle: "Әр кітап —<br>жаңа <em>әлем.</em>", heroDescription: "Жүрекке жақын оқиғалар, пайдалы білім және шабыт сыйлайтын кітаптар бір жерде.", heroButton: "Кітаптарды көру", heroNote: "Оқырмандар таңдаған кітаптар", heroBottom: "ТАҢДАУЛЫ КІТАПТАР",
    catalogEyebrow: "QALAM КАТАЛОГЫ", catalogTitle: "Жақсы кітап<br><em>әрдайым табылады.</em>", catalogDescription: "Білім, шабыт немесе бір кешке арналған оқиға — өзіңізге лайық кітапты таңдаңыз.", search: "Кітапты іздеу...", searchLabel: "Кітапты іздеу",
    sideLabel: "Кішкентай кеңес", sideTitle: "Кітапты<br>асықпай<br>таңдаңыз.", sideBottom: "ӘР ОҚЫРМАНҒА — ӨЗ ОҚИҒАСЫ", promiseEyebrow: "БІЗДІҢ КІШКЕНТАЙ УӘДЕМІЗ", promiseTitle: "Кітап таңдауды<br><em>жеңіл етеміз.</em>", promiseDescription: "Іздеп жүріп тапқан кітабыңыз, жылдам тапсырыс, мұқият орау. Qalam — жақсы оқуға бір қадам жақын.", badge1: "✦ Мұқият таңдалған", badge2: "↗ Қауіпсіз тапсырыс", badge3: "♡ Сыйлыққа дайын", footerSlogan: "Жақсы кітап — жақсы серік.",
    cartEyebrow: "СІЗДІҢ ТАҢДАУЫҢЫЗ", emptyTitle: "Себет әзірге бос", emptyCopy: "Сізге ұнаған кітаптарды осында жинаңыз.", continue: "Кітаптарды қарау", gift: "Сыйлыққа орау", subtotal: "Аралық сома", discount: "10% жеңілдік", total: "Барлығы", checkout: "Тапсырыс беру", secure: "Тапсырыс деректері тек осы демо серверде өңделеді.", remove: "Алып тастау", qty: "дана", selected: "ОҚЫРМАН ТАҢДАУЫ", addLabel: "себетке қосу",
    dialogEyebrow: "СОҢҒЫ ҚАДАМ", dialogTitle: "Тапсырысты<br><em>рәсімдеу.</em>", dialogIntro: "Жеткізу үшін байланыс ақпаратыңызды енгізіңіз.", name: "Атыңыз", phone: "Телефон нөмірі", address: "Жеткізу мекенжайы", namePlaceholder: "Мысалы, Аружан", phonePlaceholder: "+7 7__ ___ __ __", addressPlaceholder: "Қала, көше, үй нөмірі", confirm: "Тапсырысты растау", submitting: "Жіберілуде...", errorName: "Атыңызды, телефон нөмірін және мекенжайды енгізіңіз.", errorCatalog: "Таңдалған кітап каталогта жоқ.", errorEmpty: "Себетіңіз бос.", errorOrder: "Тапсырыс жіберілмеді. Қайталап көріңіз.", loadError: "Каталогты жүктеу мүмкін болмады. IntelliJ терминалында серверді тексеріңіз.", noResults: "Іздеуіңізге сай кітап табылмады.", added: "Кітап себетке қосылды", thanks: "Рақмет! Тапсырыс қабылданды.",
    all: "Барлығы", fiction: "Көркем әдебиет", programming: "Бағдарламалау", textbooks: "Оқулықтар", youngAdult: "Жасөспірімдер", children: "Балалар", nonfiction: "Танымдық",
    category: { Novels: "Көркем әдебиет", Programming: "Бағдарламалау", Textbooks: "Оқулықтар", Children: "Балалар", "Young Adult": "Жасөспірімдер әдебиеті", Science: "Ғылым", "Personal Growth": "Өзін-өзі дамыту", "Science Fiction": "Ғылыми фантастика", "Historical Fiction": "Тарихи роман", Mystery: "Детектив", Drama: "Драма", Romance: "Романтика", Thriller: "Триллер", Satire: "Сатира", "Sports Fiction": "Спорттық роман", Classics: "Классика", Fantasy: "Фэнтези", "Contemporary Fiction": "Заманауи проза" }
  },
  ru: {
    announcement: 'Новый мир для чтения — <strong>скидка 10% на каждый заказ</strong>', brand: "КНИЖНЫЙ МАГАЗИН", homeLabel: "На главную Qalam", navLabel: "Главное меню", categoryLabel: "Категории книг", languageGroup: "Выбор языка", initials: ["О", "А", "М"], artLabel: "Иллюстрация с книгами и цветком", artCaption: "ЗАМЕДЛИСЬ<br>ВЫДОХНИ И<br>ПОЧИТАЙ", artBook: "НОВАЯ ИСТОРИЯ<br>НА КАЖДОЙ СТРАНИЦЕ", artBookName: "QALAM", artSticker: "читай.<br>мечтай.", copyright: "© 2026 Qalam — книжный магазин", navCatalog: "Каталог", navAbout: "О нас", cart: "Корзина",
    heroEyebrow: "ВАША СЛЕДУЮЩАЯ ЛЮБИМАЯ КНИГА", heroTitle: "Каждая книга —<br>новый <em>мир.</em>", heroDescription: "Истории, знания и вдохновение — книги, к которым хочется возвращаться.", heroButton: "Смотреть книги", heroNote: "Книги, выбранные читателями", heroBottom: "ВЫБОР ЧИТАТЕЛЕЙ",
    catalogEyebrow: "КАТАЛОГ QALAM", catalogTitle: "Хорошая книга<br><em>всегда найдётся.</em>", catalogDescription: "Знания, вдохновение или история на вечер — найдите книгу по душе.", search: "Найти книгу...", searchLabel: "Поиск книг",
    sideLabel: "Небольшой совет", sideTitle: "Выбирайте<br>книгу<br>не спеша.", sideBottom: "КАЖДОМУ ЧИТАТЕЛЮ — СВОЯ ИСТОРИЯ", promiseEyebrow: "НАШЕ НЕБОЛЬШОЕ ОБЕЩАНИЕ", promiseTitle: "Выбирать книги<br><em>будет легко.</em>", promiseDescription: "Найденная книга, быстрый заказ и бережная упаковка. Qalam — на шаг ближе к хорошему чтению.", badge1: "✦ Тщательно отобрано", badge2: "↗ Удобный заказ", badge3: "♡ Готово к подарку", footerSlogan: "Хорошая книга — лучший спутник.",
    cartEyebrow: "ВАШ ВЫБОР", emptyTitle: "Корзина пока пуста", emptyCopy: "Добавьте сюда книги, которые вам понравились.", continue: "Перейти к книгам", gift: "Подарочная упаковка", subtotal: "Промежуточная сумма", discount: "Скидка 10%", total: "Итого", checkout: "Оформить заказ", secure: "Данные заказа обрабатываются только демо-сервером.", remove: "Удалить", qty: "шт.", selected: "ВЫБОР ЧИТАТЕЛЕЙ", addLabel: "в корзину",
    dialogEyebrow: "ПОСЛЕДНИЙ ШАГ", dialogTitle: "Оформление<br><em>заказа.</em>", dialogIntro: "Укажите контакты для доставки.", name: "Ваше имя", phone: "Номер телефона", address: "Адрес доставки", namePlaceholder: "Например, Аружан", phonePlaceholder: "+7 7__ ___ __ __", addressPlaceholder: "Город, улица, номер дома", confirm: "Подтвердить заказ", submitting: "Отправка...", errorName: "Укажите имя, телефон и адрес доставки.", errorCatalog: "Выбранной книги нет в каталоге.", errorEmpty: "Корзина пуста.", errorOrder: "Не удалось отправить заказ. Попробуйте ещё раз.", loadError: "Не удалось загрузить каталог. Проверьте сервер в IntelliJ.", noResults: "По вашему запросу книги не найдены.", added: "Книга добавлена в корзину", thanks: "Спасибо! Заказ принят.",
    all: "Все книги", fiction: "Художественная", programming: "Программирование", textbooks: "Учебники", youngAdult: "Подросткам", children: "Детям", nonfiction: "Познавательное",
    category: { Novels: "Художественная литература", Programming: "Программирование", Textbooks: "Учебники", Children: "Детские книги", "Young Adult": "Подростковая проза", Science: "Наука", "Personal Growth": "Саморазвитие", "Science Fiction": "Научная фантастика", "Historical Fiction": "Исторический роман", Mystery: "Детектив", Drama: "Драма", Romance: "Романтика", Thriller: "Триллер", Satire: "Сатира", "Sports Fiction": "Спортивная проза", Classics: "Классика", Fantasy: "Фэнтези", "Contemporary Fiction": "Современная проза" }
  },
  en: {
    announcement: 'A new world of reading — <strong>10% off every order</strong>', brand: "BOOKSTORE", homeLabel: "Qalam home", navLabel: "Main menu", categoryLabel: "Book categories", languageGroup: "Choose language", initials: ["R", "A", "M"], artLabel: "Illustration of books and a flower", artCaption: "SLOW<br>DOWN &<br>READ MORE", artBook: "A NEW WORLD<br>ON EVERY PAGE", artBookName: "QALAM", artSticker: "read.<br>dream.", copyright: "© 2026 Qalam Bookstore", navCatalog: "Catalog", navAbout: "About us", cart: "Basket",
    heroEyebrow: "YOUR NEXT FAVOURITE BOOK", heroTitle: "Every book is a<br>new <em>world.</em>", heroDescription: "Stories close to the heart, useful knowledge, and books that inspire — all in one place.", heroButton: "Explore books", heroNote: "Reader-loved books", heroBottom: "READER FAVOURITES",
    catalogEyebrow: "THE QALAM CATALOG", catalogTitle: "A good book<br><em>is always waiting.</em>", catalogDescription: "Knowledge, inspiration, or a story for the evening — find the book for you.", search: "Search books...", searchLabel: "Search books",
    sideLabel: "A little reminder", sideTitle: "Take your<br>time to<br>choose.", sideBottom: "EVERY READER HAS A STORY", promiseEyebrow: "OUR LITTLE PROMISE", promiseTitle: "Finding a book<br><em>should feel easy.</em>", promiseDescription: "The book you were looking for, a simple order, and thoughtful wrapping. Qalam brings good reading a little closer.", badge1: "✦ Thoughtfully selected", badge2: "↗ Simple checkout", badge3: "♡ Gift-ready", footerSlogan: "A good book is a good companion.",
    cartEyebrow: "YOUR SELECTION", emptyTitle: "Your basket is empty", emptyCopy: "Save the books you like here.", continue: "Browse the books", gift: "Gift wrapping", subtotal: "Subtotal", discount: "10% discount", total: "Total", checkout: "Checkout", secure: "Order details are handled by this demo server only.", remove: "Remove", qty: "copy/copies", selected: "READER PICK", addLabel: "to basket",
    dialogEyebrow: "ONE LAST STEP", dialogTitle: "Place your<br><em>order.</em>", dialogIntro: "Enter your contact details for delivery.", name: "Your name", phone: "Phone number", address: "Delivery address", namePlaceholder: "For example, Aruzhan", phonePlaceholder: "+7 7__ ___ __ __", addressPlaceholder: "City, street, building number", confirm: "Confirm order", submitting: "Sending...", errorName: "Enter your name, phone number, and delivery address.", errorCatalog: "A selected book is not in the catalog.", errorEmpty: "Your basket is empty.", errorOrder: "Could not submit the order. Please try again.", loadError: "Could not load the catalog. Check the server in IntelliJ.", noResults: "No books match your search.", added: "Book added to basket", thanks: "Thank you! Your order was received.",
    all: "All books", fiction: "Fiction", programming: "Programming", textbooks: "Textbooks", youngAdult: "Young adult", children: "Children", nonfiction: "Non-fiction",
    category: { Novels: "Fiction", Programming: "Programming", Textbooks: "Textbooks", Children: "Children's books", "Young Adult": "Young adult", Science: "Science", "Personal Growth": "Personal growth", "Science Fiction": "Science fiction", "Historical Fiction": "Historical fiction", Mystery: "Mystery", Drama: "Drama", Romance: "Romance", Thriller: "Thriller", Satire: "Satire", "Sports Fiction": "Sports fiction", Classics: "Classics", Fantasy: "Fantasy", "Contemporary Fiction": "Contemporary fiction" }
  }
};
const byId = (id) => document.getElementById(id);
const tr = (key) => translations[state.locale][key];
const money = (value) => `${new Intl.NumberFormat(state.locale === "kk" ? "kk-KZ" : state.locale === "ru" ? "ru-KZ" : "en-KZ", { maximumFractionDigits: 0 }).format(value)} ₸`;

function setLanguage(locale) {
  if (!translations[locale]) return;
  state.locale = locale;
  document.documentElement.lang = locale;
  try { localStorage.setItem("qalam-language", locale); } catch (_) { /* storage is optional */ }
  document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === locale));
  byId("announcement").innerHTML = tr("announcement");
  const htmlFields = { "hero-title": "heroTitle", "catalog-title": "catalogTitle", "side-note-title": "sideTitle", "promise-title": "promiseTitle", "dialog-title": "dialogTitle", "art-caption": "artCaption", "art-book-title": "artBook", "art-sticker": "artSticker" };
  for (const [id, key] of Object.entries(htmlFields)) byId(id).innerHTML = tr(key);
  const fields = {
    "brand-label": "brand", "nav-catalog": "navCatalog", "nav-about": "navAbout", "cart-label": "cart", "hero-eyebrow": "heroEyebrow",
    "hero-description": "heroDescription", "hero-button-label": "heroButton", "hero-note": "heroNote", "hero-bottom-label": "heroBottom",
    "catalog-eyebrow": "catalogEyebrow", "catalog-description": "catalogDescription", "side-note-label": "sideLabel", "side-note-bottom": "sideBottom",
    "promise-eyebrow": "promiseEyebrow", "promise-description": "promiseDescription", "promise-badge-1": "badge1", "promise-badge-2": "badge2", "promise-badge-3": "badge3",
    "footer-slogan": "footerSlogan", "footer-copyright": "copyright", "cart-eyebrow": "cartEyebrow", "cart-title": "cart", "empty-cart-title": "emptyTitle", "empty-cart-copy": "emptyCopy",
    "continue-shopping": "continue", "gift-label": "gift", "subtotal-label": "subtotal", "discount-label": "discount", "total-label": "total", "checkout-label": "checkout",
    "secure-note": "secure", "dialog-eyebrow": "dialogEyebrow", "dialog-intro": "dialogIntro", "name-label": "name", "phone-label": "phone", "address-label": "address", "confirm-label": "confirm"
  };
  for (const [id, key] of Object.entries(fields)) byId(id).textContent = tr(key);
  document.querySelectorAll(".brand-label").forEach((label) => { label.textContent = tr("brand"); });
  byId("art-book-name").textContent = tr("artBookName");
  byId("language-switch").setAttribute("aria-label", tr("languageGroup"));
  byId("hero-art").setAttribute("aria-label", tr("artLabel"));
  byId("brand-home").setAttribute("aria-label", tr("homeLabel"));
  byId("main-nav").setAttribute("aria-label", tr("navLabel"));
  byId("categories").setAttribute("aria-label", tr("categoryLabel"));
  [1, 2, 3].forEach((index) => { byId(`reader-initial-${index}`).textContent = tr("initials")[index - 1]; });
  byId("close-dialog").setAttribute("aria-label", locale === "ru" ? "Закрыть" : locale === "en" ? "Close" : "Жабу");
  byId("search").placeholder = tr("search");
  byId("search").setAttribute("aria-label", tr("searchLabel"));
  byId("open-cart").setAttribute("aria-label", tr("cart"));
  byId("cart-panel").setAttribute("aria-label", tr("cart"));
  byId("close-cart").setAttribute("aria-label", locale === "ru" ? "Закрыть" : locale === "en" ? "Close" : "Жабу");
  byId("checkout-form").elements.customer.placeholder = tr("namePlaceholder");
  byId("checkout-form").elements.phone.placeholder = tr("phonePlaceholder");
  byId("checkout-form").elements.address.placeholder = tr("addressPlaceholder");
  document.title = locale === "ru" ? "Qalam — книжный магазин" : locale === "en" ? "Qalam — Bookstore" : "Qalam — кітап дүкені";
  byId("hero-bottom-label").previousElementSibling.textContent = `01 — ${String(state.books.length).padStart(2, "0")}`;
  renderCategories();
  renderBooks();
  renderCart();
}

function bookTitle(book) { return book.titles?.[state.locale] || book.title; }
function categoryName(category) { return translations[state.locale].category[category] || category; }
function categoryGroup(book) { return categoryGroups[book.category] || "fiction"; }

async function loadBooks() {
  try {
    const response = await fetch("/api/books");
    if (!response.ok) throw new Error(tr("loadError"));
    const data = await response.json();
    state.books = data.books;
    renderCategories();
    renderBooks();
    renderCart();
    byId("hero-bottom-label").previousElementSibling.textContent = `01 — ${String(state.books.length).padStart(2, "0")}`;
  } catch (error) {
    byId("book-grid").innerHTML = `<div class="empty-state">${escapeHtml(tr("loadError"))}</div>`;
  }
}

function renderCategories() {
  byId("categories").innerHTML = categories.map((key) =>
    `<button class="category-chip ${state.category === key ? "active" : ""}" data-category="${key}" type="button">${escapeHtml(tr(key))}</button>`
  ).join("");
}

function visibleBooks() {
  const query = state.query.trim().toLocaleLowerCase(state.locale === "kk" ? "kk" : state.locale);
  return state.books.filter((book) => {
    const categoryMatches = state.category === "all" || categoryGroup(book) === state.category;
    const searchableTitles = Object.values(book.titles || { en: book.title });
    const allCategoryNames = Object.values(translations).flatMap((language) => [language.category[book.category], language[categoryGroup(book)]]).filter(Boolean);
    const text = [...searchableTitles, book.author, ...allCategoryNames].join(" ").toLocaleLowerCase(state.locale === "kk" ? "kk" : state.locale);
    return categoryMatches && (!query || text.includes(query));
  });
}

function renderBooks() {
  const books = visibleBooks();
  if (!books.length) {
    byId("book-grid").innerHTML = `<div class="empty-state">${escapeHtml(tr("noResults"))}</div>`;
    return;
  }
  byId("book-grid").innerHTML = books.map((book, index) => {
    const palette = coverPalette[index % coverPalette.length];
    const title = bookTitle(book);
    const category = categoryName(book.category);
    return `<article class="book-card">
      <div class="cover-stage" style="--cover:${book.color};--book:${palette}">
        ${index === 0 && state.category === "all" && !state.query ? `<span class="book-tag">${escapeHtml(tr("selected"))}</span>` : ""}
        <div class="cover-shape"><span class="cover-category">${escapeHtml(category)}</span><span class="cover-icon">${book.icon}</span><span class="cover-title">${escapeHtml(title)}</span><span class="cover-author">${escapeHtml(book.author)}</span></div>
        <button class="add-book" data-add="${book.id}" type="button" aria-label="${escapeHtml(title)} ${escapeHtml(tr("addLabel"))}">+</button>
      </div>
      <div class="book-info"><span class="book-category">${escapeHtml(category)}</span><h3 class="book-title">${escapeHtml(title)}</h3><span class="book-author">${escapeHtml(book.author)}</span><div class="book-price">${money(book.price)}</div></div>
    </article>`;
  }).join("");
}

function renderCart() {
  const count = [...state.cart.values()].reduce((sum, entry) => sum + entry.quantity, 0);
  const selected = [...state.cart.values()];
  const subtotal = selected.reduce((sum, entry) => sum + entry.book.price * entry.quantity, 0);
  const discount = Math.round(subtotal * 0.1);
  const gift = byId("gift-wrap").checked && count > 0 ? 500 : 0;
  byId("cart-count").textContent = count;
  byId("panel-count").textContent = `(${count})`;
  byId("cart-empty").classList.toggle("visible", count === 0);
  byId("cart-summary").classList.toggle("hidden", count === 0);
  byId("cart-items").innerHTML = selected.map(({ book, quantity }) => `<div class="cart-row">
    <div class="mini-cover" style="--cover:${book.color}">${book.icon}</div>
    <div><div class="cart-book-title">${escapeHtml(bookTitle(book))}</div><div class="cart-book-meta">${quantity} ${escapeHtml(tr("qty"))} · ${money(book.price)}</div><button class="remove-book" data-remove="${book.id}" type="button">${escapeHtml(tr("remove"))}</button></div>
    <strong class="cart-row-price">${money(book.price * quantity)}</strong>
  </div>`).join("");
  byId("subtotal").textContent = money(subtotal);
  byId("discount").textContent = `−${money(discount)}`;
  byId("total").textContent = money(Math.max(0, subtotal - discount + gift));
}

function addBook(id) {
  const book = state.books.find((item) => item.id === id);
  if (!book) return;
  const entry = state.cart.get(id);
  state.cart.set(id, { book, quantity: (entry?.quantity || 0) + 1 });
  renderCart();
  toast(tr("added"));
}

function setCartOpen(open) {
  byId("cart-panel").classList.toggle("open", open);
  byId("scrim").classList.toggle("open", open);
  byId("cart-panel").setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("panel-open", open);
}

function toast(message) {
  const element = byId("toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => element.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

document.querySelector(".language-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (button) setLanguage(button.dataset.lang);
});
byId("categories").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderBooks();
});
byId("book-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addBook(button.dataset.add);
});
byId("cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  state.cart.delete(button.dataset.remove);
  renderCart();
});
byId("search").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderBooks();
});
byId("gift-wrap").addEventListener("change", renderCart);
byId("open-cart").addEventListener("click", () => setCartOpen(true));
byId("close-cart").addEventListener("click", () => setCartOpen(false));
byId("scrim").addEventListener("click", () => setCartOpen(false));
byId("continue-shopping").addEventListener("click", () => setCartOpen(false));
byId("checkout-button").addEventListener("click", () => {
  if (state.cart.size === 0) return;
  byId("form-error").textContent = "";
  byId("checkout-dialog").showModal();
});
byId("close-dialog").addEventListener("click", () => byId("checkout-dialog").close());
byId("checkout-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new URLSearchParams(new FormData(event.currentTarget));
  for (const { book, quantity } of state.cart.values()) {
    for (let count = 0; count < quantity; count += 1) form.append("bookId", book.id);
  }
  if (byId("gift-wrap").checked) form.set("giftWrap", "true");
  const button = event.currentTarget.querySelector("[type=submit]");
  button.disabled = true;
  byId("confirm-label").textContent = tr("submitting");
  byId("form-error").textContent = "";
  try {
    const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: form });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || tr("errorOrder"));
    state.cart.clear();
    byId("gift-wrap").checked = false;
    renderCart();
    byId("checkout-dialog").close();
    setCartOpen(false);
    event.currentTarget.reset();
    toast(`${tr("thanks")} ${result.orderId}`);
  } catch (error) {
    byId("form-error").textContent = error.message;
  } finally {
    button.disabled = false;
    byId("confirm-label").textContent = tr("confirm");
  }
});

try {
  const preferredLanguage = localStorage.getItem("qalam-language");
  if (translations[preferredLanguage]) state.locale = preferredLanguage;
} catch (_) { /* use Kazakh if browser storage is unavailable */ }
setLanguage(state.locale);
loadBooks();
