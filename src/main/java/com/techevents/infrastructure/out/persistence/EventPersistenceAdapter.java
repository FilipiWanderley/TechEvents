package com.techevents.infrastructure.out.persistence;

import com.techevents.domain.model.Event;
import com.techevents.domain.port.out.EventRepositoryPort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class EventPersistenceAdapter implements EventRepositoryPort {

    private final JpaEventRepository jpaEventRepository;

    public EventPersistenceAdapter(JpaEventRepository jpaEventRepository) {
        this.jpaEventRepository = jpaEventRepository;
    }

    @Override
    public Event save(Event event) {
        EventEntity entity = toEntity(event);
        EventEntity savedEntity = jpaEventRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<Event> findById(UUID id) {
        return jpaEventRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Event> findAll() {
        return jpaEventRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private EventEntity toEntity(Event event) {
        return new EventEntity(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getDate(),
            event.getLocation()
        );
    }

    private Event toDomain(EventEntity entity) {
        return new Event(
            entity.getId(),
            entity.getTitle(),
            entity.getDescription(),
            entity.getDate(),
            entity.getLocation()
        );
    }
}
