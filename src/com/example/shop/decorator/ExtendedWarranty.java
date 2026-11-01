package com.example.shop.decorator;

public class ExtendedWarranty extends OrderAddonDecorator {
    public ExtendedWarranty(OrderAddon order) { super(order); }
    public double cost() { return order.cost() + 12.0; }
    public String description() { return order.description() + " + extended warranty"; }
}
