package com.techevents.infrastructure.in.api;

public record CreateEventRequest(
    String title,
    String description,
    String date,
    String location
) {}
