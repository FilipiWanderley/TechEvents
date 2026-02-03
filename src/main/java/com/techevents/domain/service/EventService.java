package com.techevents.domain.service;

import com.techevents.domain.model.Event;
import com.techevents.domain.port.in.CreateEventUseCase;
import com.techevents.domain.port.in.GetEventsUseCase;
import com.techevents.domain.port.out.EventRepositoryPort;
import com.techevents.domain.port.out.StoragePort;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

public class EventService implements CreateEventUseCase, GetEventsUseCase {

    private final EventRepositoryPort eventRepositoryPort;
    private final StoragePort storagePort;

    public EventService(EventRepositoryPort eventRepositoryPort, StoragePort storagePort) {
        this.eventRepositoryPort = eventRepositoryPort;
        this.storagePort = storagePort;
    }

    @Override
    public Event createEvent(String title, String description, String dateStr, String location, String fileName, InputStream bannerContent) {
        String bannerUrl = null;
        if (fileName != null && bannerContent != null) {
             bannerUrl = storagePort.upload(fileName, bannerContent);
        }

        LocalDateTime date = LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        // Instantiate with internal validation
        Event event = new Event(UUID.randomUUID(), title, description, date, location, bannerUrl);

        return eventRepositoryPort.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepositoryPort.findAll();
    }
}
