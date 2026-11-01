package com.example.shop.observer;

public interface OrderObserver { void onStatusChanged(String orderId, String status); }
