package com.example.shop.observer;

public class CustomerNotifier implements OrderObserver {
    public void onStatusChanged(String id, String status) { System.out.println("[Customer notification] Order " + id + " is " + status); }
}
