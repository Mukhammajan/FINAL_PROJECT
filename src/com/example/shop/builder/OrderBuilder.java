package com.example.shop.builder;

import com.example.shop.model.Order;
import com.example.shop.model.Product;
import java.util.ArrayList;
import java.util.List;

// Builder pattern: constructs an order step by step.
public class OrderBuilder {
    private String customer;
    private String address;
    private final List<Product> products = new ArrayList<>();
    public OrderBuilder customer(String value) { customer = value; return this; }
    public OrderBuilder address(String value) { address = value; return this; }
    public OrderBuilder add(Product product) { products.add(product); return this; }
    public Order build() {
        if (customer == null || address == null || products.isEmpty()) throw new IllegalStateException("Customer, address and at least one product are required");
        return new Order(customer, address, List.copyOf(products));
    }
}
