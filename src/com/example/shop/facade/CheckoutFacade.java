package com.example.shop.facade;

import com.example.shop.builder.OrderBuilder;
import com.example.shop.decorator.*;
import com.example.shop.model.Order;
import com.example.shop.model.Product;
import com.example.shop.observer.OrderTracker;
import com.example.shop.strategy.DiscountStrategy;

// Facade pattern: one simple entry point coordinates order creation and checkout.
public class CheckoutFacade {
    private final OrderTracker tracker;
    public CheckoutFacade(OrderTracker tracker) { this.tracker = tracker; }
    public CheckoutResult checkout(String id, String customer, String phone, String address, Product[] products, DiscountStrategy discount, boolean giftWrap, boolean warranty) {
        OrderBuilder builder = new OrderBuilder().customer(customer).address(address);
        for (Product product : products) builder.add(product);
        Order order = builder.build();
        double discounted = discount.apply(order.subtotal());
        OrderAddon payable = new BasicOrder(discounted);
        if (giftWrap) payable = new GiftWrap(payable);
        if (warranty) payable = new ExtendedWarranty(payable);
        System.out.println("\n=== Checkout ===");
        System.out.println("Customer: " + order.customer() + " | Phone: " + phone + " | Address: " + order.address());
        System.out.println("Items: " + order.products().size() + " | Subtotal: " + money(order.subtotal()) + " ₸");
        System.out.println("Offer: " + discount.name());
        System.out.println("Options: " + payable.description());
        System.out.printf(java.util.Locale.ROOT, "Amount due: %,.0f ₸%n", payable.cost());
        tracker.changeStatus(id, "CONFIRMED");
        tracker.changeStatus(id, "SHIPPED");
        return new CheckoutResult(id, order.customer(), order.products().size(), order.subtotal(), payable.cost(), payable.description());
    }

    private String money(double amount) {
        return String.format(java.util.Locale.ROOT, "%,.0f", amount);
    }
}
