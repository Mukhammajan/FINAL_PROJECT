# Qalam Online Bookstore

Java 17 online bookstore demo with an HTML/CSS/JavaScript frontend and six design patterns.

## Open the local website

Start the project from IntelliJ IDEA, then open [Qalam Online Bookstore](http://localhost:8080). This address works on the same computer while the Java server is running; it is not a public internet link.

## Run in IntelliJ IDEA

1. Open this project in IntelliJ IDEA and select JDK 17 or newer.
2. Open `src/Main.java` and click **Run**.
3. Keep the Run console open and visit `http://localhost:8080` in a browser.
4. Click **Stop** in IntelliJ to stop the local server.

The website is served by Java's built-in HTTP server. The frontend files are in `web/`; the Java catalog and checkout API are in `src/`. The 26-book catalog includes the requested titles and has Kazakh, Russian, and English language options. Search books, filter by category, add books to the cart, apply the automatic 10% discount, choose gift wrapping, and submit a demo order. The sample uses in-memory products and does not save data or process real payments.

## Patterns used

- **Factory:** creates book products by category.
- **Builder:** assembles a complete order.
- **Strategy:** calculates the 10% discount.
- **Decorator:** adds optional gift wrapping.
- **Facade:** coordinates order checkout.
- **Observer:** sends order status notifications to the customer and store dashboard; events appear in the IntelliJ Run console.
# FINAL_PROJECT
