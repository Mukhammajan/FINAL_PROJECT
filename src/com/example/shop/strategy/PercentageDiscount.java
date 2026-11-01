package com.example.shop.strategy;

public class PercentageDiscount implements DiscountStrategy {
    private final double percent;
    public PercentageDiscount(double percent) { if (percent < 0 || percent > 100) throw new IllegalArgumentException("Percent must be 0..100"); this.percent = percent; }
    public double apply(double subtotal) { return subtotal * (1 - percent / 100); }
    public String name() { return percent + "% discount"; }
}
