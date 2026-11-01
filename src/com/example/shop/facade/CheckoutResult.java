package com.example.shop.facade;

public record CheckoutResult(String orderId, String customer, int itemCount, double subtotal, double amountDue, String options) {}
