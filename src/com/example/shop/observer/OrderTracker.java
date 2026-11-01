package com.example.shop.observer;

import java.util.ArrayList;
import java.util.List;

public class OrderTracker {
    private final List<OrderObserver> observers = new ArrayList<>();
    public void subscribe(OrderObserver observer) { observers.add(observer); }
    public void changeStatus(String orderId, String status) {
        System.out.println("Order status changed: " + status);
        observers.forEach(observer -> observer.onStatusChanged(orderId, status));
    }
}
