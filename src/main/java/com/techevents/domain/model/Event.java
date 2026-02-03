package com.techevents.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Event {
    private UUID id;
    private String title;
    private String description;
    private LocalDateTime date;
    private String location;

    public Event(UUID id, String title, String description, LocalDateTime date, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
    }

    // Getters
    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDateTime getDate() { return date; }
    public String getLocation() { return location; }

    // Domain logic methods can be added here
    public void updateDetails(String title, String description, LocalDateTime date, String location) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
    }
}
