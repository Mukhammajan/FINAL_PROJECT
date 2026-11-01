package com.example.shop.observer;

public class StoreDashboard implements OrderObserver {
    public void onStatusChanged(String id, String status) { System.out.println("[Dashboard] " + id + " -> " + status); }
}
