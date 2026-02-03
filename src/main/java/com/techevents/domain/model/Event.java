package com.techevents.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Event {
    private final UUID id;
    private final String title;
    private final String description;
    private final LocalDateTime date;
    private final String location;
    private final String bannerUrl;

    public Event(UUID id, String title, String description, LocalDateTime date, String location, String bannerUrl) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Event title cannot be null or empty");
        }
        if (date == null) {
            throw new IllegalArgumentException("Event date cannot be null");
        }
        if (date.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Event date cannot be in the past");
        }
        
        this.id = id != null ? id : UUID.randomUUID();
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.bannerUrl = bannerUrl;
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDateTime getDate() { return date; }
    public String getLocation() { return location; }
    public String getBannerUrl() { return bannerUrl; }
}
