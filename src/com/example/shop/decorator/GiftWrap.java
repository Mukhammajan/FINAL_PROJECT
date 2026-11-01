package com.example.shop.decorator;

public class GiftWrap extends OrderAddonDecorator {
    public GiftWrap(OrderAddon order) { super(order); }
    public double cost() { return order.cost() + 500.0; }
    public String description() { return order.description() + " + gift wrap"; }
}
