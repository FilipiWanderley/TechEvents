package com.techevents.infrastructure.in.api;

import com.techevents.domain.model.Event;
import com.techevents.domain.port.in.CreateEventUseCase;
import com.techevents.domain.port.in.GetEventsUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final CreateEventUseCase createEventUseCase;
    private final GetEventsUseCase getEventsUseCase;

    public EventController(CreateEventUseCase createEventUseCase, GetEventsUseCase getEventsUseCase) {
        this.createEventUseCase = createEventUseCase;
        this.getEventsUseCase = getEventsUseCase;
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody CreateEventRequest request) {
        // Note: Passing null for banner file/content as this endpoint currently only supports JSON.
        // Future improvement: Support MultipartFile or separate upload endpoint.
        Event createdEvent = createEventUseCase.createEvent(
            request.title(),
            request.description(),
            request.date(),
            request.location(),
            null, // fileName
            null  // bannerContent
        );
        
        EventResponse response = toResponse(createdEvent);

        return ResponseEntity.created(URI.create("/api/v1/events/" + createdEvent.getId())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        List<EventResponse> events = getEventsUseCase.getAllEvents().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(events);
    }

    private EventResponse toResponse(Event event) {
        return new EventResponse(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getDate(),
            event.getLocation(),
            event.getBannerUrl()
        );
    }
}
