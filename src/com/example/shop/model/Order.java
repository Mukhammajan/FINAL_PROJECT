package com.example.shop.model;

import java.util.List;

public record Order(String customer, String address, List<Product> products) {
    public double subtotal() { return products.stream().mapToDouble(Product::price).sum(); }
}
