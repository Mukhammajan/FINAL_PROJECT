package com.example.shop.decorator;

public class BasicOrder implements OrderAddon {
    private final double total;
    public BasicOrder(double total) { this.total = total; }
    public double cost() { return total; }
    public String description() { return "Products"; }
}
