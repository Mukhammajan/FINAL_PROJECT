package com.example.shop.strategy;

public class NoDiscount implements DiscountStrategy {
    public double apply(double subtotal) { return subtotal; }
    public String name() { return "No discount"; }
}
