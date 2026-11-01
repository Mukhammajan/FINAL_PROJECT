package com.example.shop.decorator;

public abstract class OrderAddonDecorator implements OrderAddon {
    protected final OrderAddon order;
    protected OrderAddonDecorator(OrderAddon order) { this.order = order; }
}
