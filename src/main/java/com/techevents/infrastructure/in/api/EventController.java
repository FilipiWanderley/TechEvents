package com.techevents.infrastructure.in.api;

import com.techevents.domain.model.Event;
import com.techevents.domain.port.in.CreateEventUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final CreateEventUseCase createEventUseCase;

    public EventController(CreateEventUseCase createEventUseCase) {
        this.createEventUseCase = createEventUseCase;
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest request) {
        Event event = new Event(null, request.title(), request.description(), request.date(), request.location());
        Event createdEvent = createEventUseCase.createEvent(event);
        
        EventResponse response = new EventResponse(
            createdEvent.getId(),
            createdEvent.getTitle(),
            createdEvent.getDescription(),
            createdEvent.getDate(),
            createdEvent.getLocation()
        );

        return ResponseEntity.created(URI.create("/api/v1/events/" + createdEvent.getId())).body(response);
    }
}
