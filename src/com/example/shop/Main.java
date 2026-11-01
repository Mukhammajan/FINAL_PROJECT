package com.example.shop;

import com.example.shop.facade.CheckoutFacade;
import com.example.shop.factory.ProductFactory;
import com.example.shop.model.Product;
import com.example.shop.observer.CustomerNotifier;
import com.example.shop.observer.OrderTracker;
import com.example.shop.observer.StoreDashboard;
import com.example.shop.strategy.PercentageDiscount;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/** Starts the bookstore website and connects its checkout to the design-pattern classes. */
public class Main {
    private static final ProductFactory PRODUCT_FACTORY = new ProductFactory();
    private static final Map<String, BookDetails> BOOKS = createCatalog();
    private static final AtomicInteger NEXT_ORDER = new AtomicInteger(1001);
    private static final CheckoutFacade CHECKOUT = createCheckout();

    public static void main(String[] args) throws IOException {
        int port = Integer.parseInt(System.getenv().getOrDefault("SHOP_PORT", "8080"));
        Path webRoot = Path.of("web").toAbsolutePath().normalize();
        if (!Files.isDirectory(webRoot)) {
            throw new IllegalStateException("Frontend folder not found: " + webRoot + " (run Main with the project root as working directory)");
        }

        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", port), 0);
        server.createContext("/api/books", Main::handleBooks);
        server.createContext("/api/checkout", Main::handleCheckout);
        server.createContext("/", exchange -> serveFrontend(exchange, webRoot));
        server.setExecutor(Executors.newFixedThreadPool(6));
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("\nBookstore server stopped.");
            server.stop(0);
        }));
        server.start();

        String address = "http://localhost:" + port;
        System.out.println("\n=== Online Bookstore is running ===");
        System.out.println("Website: " + address);
        System.out.println("Open the address above in your browser. Press Stop in IntelliJ to stop the server.\n");
    }

    private static Map<String, BookDetails> createCatalog() {
        Map<String, BookDetails> books = new LinkedHashMap<>();
        addBook(books, "B-101", "The Design of Everyday Things", "Күнделікті заттардың дизайны", "Дизайн привычных вещей", "Programming", "Don Norman", 8900, "A clear guide to making products and systems easier to understand and use.", "📘", "#dce8ff");
        addBook(books, "B-102", "Clean Code", "Таза код", "Чистый код", "Programming", "Robert C. Martin", 12500, "Practical principles for writing readable, maintainable software.", "💻", "#e3e9ff");
        addBook(books, "B-103", "Java: A Beginner's Guide", "Java: бастаушыларға арналған нұсқаулық", "Java. Руководство для начинающих", "Textbooks", "Herbert Schildt", 10900, "A friendly, hands-on introduction to Java programming.", "☕", "#f6e7dd");
        addBook(books, "B-104", "The Alchemist", "Алхимик", "Алхимик", "Novels", "Paulo Coelho", 6500, "A much-loved story about following a dream and finding your own path.", "🌙", "#f4e3c8");
        addBook(books, "B-105", "Pride and Prejudice", "Тәкаппарлық пен жаңсақ пікір", "Гордость и предубеждение", "Novels", "Jane Austen", 5900, "Jane Austen's witty classic about love, family, and first impressions.", "🌷", "#f2dfeb");
        addBook(books, "B-106", "The Little Prince", "Кішкентай ханзада", "Маленький принц", "Children", "Antoine de Saint-Exupéry", 4900, "A poetic tale of friendship, imagination, and seeing with the heart.", "🪐", "#dff0ef");
        addBook(books, "B-107", "Atomic Habits", "Атомдық әдеттер", "Атомные привычки", "Personal Growth", "James Clear", 7500, "Small, repeatable changes that help build lasting habits.", "🌱", "#e4edda");
        addBook(books, "B-108", "A Brief History of Time", "Уақыттың қысқаша тарихы", "Краткая история времени", "Science", "Stephen Hawking", 8200, "An accessible journey through space, time, and the universe.", "✨", "#e6e2f4");

        addBook(books, "B-109", "Flowers for Algernon", "Элджернонға арналған гүлдер", "Цветы для Элджернона", "Science Fiction", "Daniel Keyes", 7200, "A moving science-fiction classic about intelligence, memory, and human dignity.", "🌼", "#f4e8c8");
        addBook(books, "B-110", "The Book Thief", "Кітап ұрысы", "Книжный вор", "Historical Fiction", "Markus Zusak", 7900, "A powerful story about a young girl, words, and courage during wartime.", "📚", "#e5d4bf");
        addBook(books, "B-111", "In the Dark", "Қараңғыда", "В темноте", "Mystery", "—", 6100, "A dark and mysterious story selected for the Qalam shelf.", "🌑", "#d9dce2");
        addBook(books, "B-112", "The Green Mile", "Жасыл миль", "Зелёная миля", "Drama", "Stephen King", 8500, "A moving story of compassion and injustice on death row.", "🟩", "#dce8dc");
        addBook(books, "B-113", "Me Before You", "Сенен бұрын", "До встречи с тобой", "Romance", "Jojo Moyes", 6800, "An emotional love story about choices, change, and living fully.", "💌", "#f3e0dc");
        addBook(books, "B-114", "Five Feet Apart", "Бір-бірімізден бес қадам", "В метре друг от друга", "Young Adult", "Rachael Lippincott", 6400, "Two young people find connection while keeping a life-saving distance.", "🫧", "#dcebed");
        addBook(books, "B-115", "The Dead Zone", "Өлі аймақ", "Мёртвая зона", "Thriller", "Stephen King", 7600, "A suspenseful novel about a man who wakes with an extraordinary ability.", "⚡", "#d9dce8");
        addBook(books, "B-116", "Heart of a Dog", "Иттің жүрегі", "Собачье сердце", "Satire", "Mikhail Bulgakov", 5200, "A sharp, fantastical satire about science and society.", "🐾", "#e8ded0");
        addBook(books, "B-117", "The Foxhole Court", "Түлкілер алаңы", "Лисья нора", "Sports Fiction", "Nora Sakavic", 6900, "The first All for the Game novel: a dangerous game, a new team, and a chance to belong.", "🦊", "#ebd6c4");
        addBook(books, "B-118", "The Raven King", "Қарғалар патшасы", "Король воронов", "Sports Fiction", "Nora Sakavic", 7100, "The second All for the Game novel follows the Foxes through another season.", "🐦‍⬛", "#d9d8e5");
        addBook(books, "B-119", "The King's Men", "Патшаның адамдары", "Свита короля", "Sports Fiction", "Nora Sakavic", 7300, "The third All for the Game novel brings the team's story to a dramatic turning point.", "👑", "#e8dec5");
        addBook(books, "B-120", "The Fault in Our Stars", "Жұлдыздар кінәлі", "Виноваты звёзды", "Young Adult", "John Green", 6300, "A tender young-adult love story about life, loss, and hope.", "🌟", "#e3e2f1");
        addBook(books, "B-121", "They Both Die at the End", "Екеуі де ақырында өледі", "В конце они оба умрут", "Young Adult", "Adam Silvera", 6600, "Two strangers meet on the day they learn they have only one day left.", "⌛", "#e7d9df");
        addBook(books, "B-122", "The Master and Margarita", "Шебер мен Маргарита", "Мастер и Маргарита", "Classics", "Mikhail Bulgakov", 7400, "A fantastical literary classic about love, power, and a mysterious visitor.", "🐈‍⬛", "#ddd9e8");
        addBook(books, "B-123", "The Song of the Shrike", "Сорокопут жыры", "Песнь сорокопута", "Fantasy", "Francis Kel", 7800, "A dark-academia fantasy about a divided society and the search for truth.", "🪶", "#d9e4dc");
        addBook(books, "B-124", "If Cats Disappeared from the World", "Әлемнен барлық мысық жоғалса", "Если все коты в мире исчезнут", "Contemporary Fiction", "Genki Kawamura", 6100, "A gentle, thought-provoking story about time, love, and what makes life matter.", "🐈", "#e9e1d4");
        addBook(books, "B-125", "The Lovely Bones", "Сүйкімді сүйектер", "Милые кости", "Drama", "Alice Sebold", 6700, "A haunting story of family, grief, memory, and the possibility of healing.", "🦴", "#e5dfed");
        addBook(books, "B-126", "The Boy in the Striped Pyjamas", "Жолақты пижамалы бала", "Мальчик в полосатой пижаме", "Historical Fiction", "John Boyne", 6200, "A moving story of childhood friendship set beside a terrible historical tragedy.", "🧵", "#e1e6df");
        return books;
    }

    private static void addBook(Map<String, BookDetails> books, String id, String titleEn, String titleKk, String titleRu,
                                String category, String author,
                                double price, String description, String icon, String color) {
        String factoryCategory = switch (category) {
            case "Programming" -> "programming";
            case "Textbooks" -> "textbook";
            case "Novels" -> "novel";
            case "Children" -> "children";
            case "Personal Growth" -> "selfhelp";
            case "Science" -> "science";
            default -> category.toLowerCase(java.util.Locale.ROOT).replace(' ', '-');
        };
        Product product = PRODUCT_FACTORY.create(factoryCategory, id, titleEn, price);
        books.put(id, new BookDetails(product, Map.of("en", titleEn, "kk", titleKk, "ru", titleRu), category, author, description, icon, color));
    }

    private static CheckoutFacade createCheckout() {
        OrderTracker tracker = new OrderTracker();
        tracker.subscribe(new CustomerNotifier());
        tracker.subscribe(new StoreDashboard());
        return new CheckoutFacade(tracker);
    }

    private static void handleBooks(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("GET")) {
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        StringBuilder json = new StringBuilder("{\"books\":[");
        boolean first = true;
        for (BookDetails book : BOOKS.values()) {
            Product product = book.product();
            if (!first) json.append(',');
            first = false;
            json.append("{\"id\":\"").append(escape(book.id())).append("\",")
                    .append("\"title\":\"").append(escape(book.name())).append("\",")
                    .append("\"titles\":{")
                    .append("\"en\":\"").append(escape(book.titles().get("en"))).append("\",")
                    .append("\"kk\":\"").append(escape(book.titles().get("kk"))).append("\",")
                    .append("\"ru\":\"").append(escape(book.titles().get("ru"))).append("\"},")
                    .append("\"author\":\"").append(escape(book.author())).append("\",")
                    .append("\"category\":\"").append(escape(book.category())).append("\",")
                    .append("\"description\":\"").append(escape(book.description())).append("\",")
                    .append("\"icon\":\"").append(escape(book.icon())).append("\",")
                    .append("\"color\":\"").append(escape(book.color())).append("\",")
                    .append("\"price\":").append(String.format(java.util.Locale.ROOT, "%.2f", book.price())).append('}');
        }
        json.append("]}");
        sendJson(exchange, 200, json.toString());
    }

    private static void handleCheckout(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("POST")) {
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        try {
            String body = new String(exchange.getRequestBody().readNBytes(16_385), StandardCharsets.UTF_8);
            if (body.length() > 16_384) throw new IllegalArgumentException("Order form is too large.");
            Map<String, List<String>> form = parseForm(body);
            String customer = first(form, "customer").trim();
            String phone = first(form, "phone").trim();
            String address = first(form, "address").trim();
            if (customer.isBlank() || phone.isBlank() || address.isBlank()) throw new IllegalArgumentException("Enter your name, phone number, and delivery address.");

            List<Product> products = new ArrayList<>();
            for (String id : form.getOrDefault("bookId", List.of())) {
                BookDetails book = BOOKS.get(id);
                if (book == null) throw new IllegalArgumentException("A selected book is not in the catalog.");
                products.add(book.product());
            }
            if (products.isEmpty()) throw new IllegalArgumentException("Your cart is empty.");

            String orderId = "BOOK-" + NEXT_ORDER.getAndIncrement();
            boolean giftWrap = "true".equals(first(form, "giftWrap"));
            var result = CHECKOUT.checkout(orderId, customer, phone, address, products.toArray(Product[]::new),
                    new PercentageDiscount(10), giftWrap, false);
            String json = "{\"orderId\":\"" + escape(result.orderId()) + "\",\"customer\":\"" + escape(result.customer())
                    + "\",\"itemCount\":" + result.itemCount() + ",\"subtotal\":" + money(result.subtotal())
                    + ",\"amountDue\":" + money(result.amountDue()) + ",\"options\":\"" + escape(result.options()) + "\"}";
            sendJson(exchange, 200, json);
        } catch (IllegalArgumentException | IllegalStateException exception) {
            sendJson(exchange, 400, "{\"error\":\"" + escape(exception.getMessage()) + "\"}");
        } catch (Exception exception) {
            exception.printStackTrace();
            sendJson(exchange, 500, "{\"error\":\"Unable to process the order. Please try again.\"}");
        }
    }

    private static void serveFrontend(HttpExchange exchange, Path webRoot) throws IOException {
        if (!exchange.getRequestMethod().equals("GET")) {
            sendText(exchange, 405, "text/plain; charset=utf-8", "Method not allowed");
            return;
        }
        String path = exchange.getRequestURI().getPath();
        String file = path.equals("/") ? "index.html" : path.substring(1);
        if (!List.of("index.html", "styles.css", "app.js").contains(file)) {
            sendText(exchange, 404, "text/plain; charset=utf-8", "Not found");
            return;
        }
        Path target = webRoot.resolve(file).normalize();
        if (!target.startsWith(webRoot) || !Files.isRegularFile(target)) {
            sendText(exchange, 404, "text/plain; charset=utf-8", "Frontend file not found");
            return;
        }
        String contentType = file.endsWith(".css") ? "text/css; charset=utf-8"
                : file.endsWith(".js") ? "text/javascript; charset=utf-8" : "text/html; charset=utf-8";
        byte[] bytes = Files.readAllBytes(target);
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
        exchange.sendResponseHeaders(200, bytes.length);
        try (var output = exchange.getResponseBody()) { output.write(bytes); }
    }

    private static Map<String, List<String>> parseForm(String body) {
        Map<String, List<String>> values = new LinkedHashMap<>();
        if (body.isBlank()) return values;
        for (String part : body.split("&")) {
            String[] pair = part.split("=", 2);
            String key = URLDecoder.decode(pair[0], StandardCharsets.UTF_8);
            String value = pair.length > 1 ? URLDecoder.decode(pair[1], StandardCharsets.UTF_8) : "";
            values.computeIfAbsent(key, ignored -> new ArrayList<>()).add(value);
        }
        return values;
    }

    private static String first(Map<String, List<String>> form, String key) {
        return form.getOrDefault(key, List.of("" )).get(0);
    }

    private static String money(double amount) {
        return String.format(java.util.Locale.ROOT, "%.2f", amount);
    }

    private static String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
    }

    private static void sendJson(HttpExchange exchange, int status, String json) throws IOException {
        sendText(exchange, status, "application/json; charset=utf-8", json);
    }

    private static void sendText(HttpExchange exchange, int status, String contentType, String text) throws IOException {
        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.getResponseHeaders().set("Cache-Control", "no-store");
        exchange.sendResponseHeaders(status, bytes.length);
        try (var output = exchange.getResponseBody()) { output.write(bytes); }
    }

    private record BookDetails(Product product, Map<String, String> titles, String category, String author, String description, String icon, String color) {
        private String id() { return product.id(); }
        private String name() { return product.name(); }
        private double price() { return product.price(); }
    }
}
