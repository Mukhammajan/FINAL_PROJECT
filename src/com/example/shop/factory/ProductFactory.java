package com.example.shop.factory;

import com.example.shop.model.Product;
import java.util.Locale;

// Factory pattern: creates book products by store category.
public class ProductFactory {
    public Product create(String type, String id, String name, double price) {
        if (price < 0) throw new IllegalArgumentException("Book price cannot be negative");
        String category = switch (type.trim().toLowerCase(Locale.ROOT)) {
            case "novel" -> "Novels";
            case "textbook" -> "Textbooks";
            case "programming" -> "Programming Books";
            case "children" -> "Children's Books";
            case "selfhelp" -> "Personal Growth";
            case "science" -> "Science";
            case "science-fiction" -> "Science Fiction";
            case "historical-fiction" -> "Historical Fiction";
            case "mystery" -> "Mystery";
            case "drama" -> "Drama";
            case "romance" -> "Romance";
            case "young-adult" -> "Young Adult";
            case "thriller" -> "Thriller";
            case "satire" -> "Satire";
            case "sports-fiction" -> "Sports Fiction";
            case "classics" -> "Classics";
            case "fantasy" -> "Fantasy";
            case "contemporary-fiction" -> "Contemporary Fiction";
            default -> throw new IllegalArgumentException("Unknown book category: " + type);
        };
        return new Product(id, name, price, category);
    }
}
