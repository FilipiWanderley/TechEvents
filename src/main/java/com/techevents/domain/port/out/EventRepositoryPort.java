package com.techevents.domain.port.out;

import com.techevents.domain.model.Event;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface EventRepositoryPort {
    Event save(Event event);
    Optional<Event> findById(UUID id);
    List<Event> findAll();
}
