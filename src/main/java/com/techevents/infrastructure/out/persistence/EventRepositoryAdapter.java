package com.techevents.infrastructure.out.persistence;

import com.techevents.domain.model.Event;
import com.techevents.domain.port.out.EventRepositoryPort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class EventRepositoryAdapter implements EventRepositoryPort {

    private final SpringDataEventRepository springDataEventRepository;

    public EventRepositoryAdapter(SpringDataEventRepository springDataEventRepository) {
        this.springDataEventRepository = springDataEventRepository;
    }

    @Override
    public Event save(Event event) {
        EventEntity entity = toEntity(event);
        EventEntity savedEntity = springDataEventRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<Event> findById(UUID id) {
        return springDataEventRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Event> findAll() {
        return springDataEventRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private EventEntity toEntity(Event event) {
        return new EventEntity(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getDate(),
            event.getLocation(),
            event.getBannerUrl()
        );
    }

    private Event toDomain(EventEntity entity) {
        return new Event(
            entity.getId(),
            entity.getTitle(),
            entity.getDescription(),
            entity.getDate(),
            entity.getLocation(),
            entity.getBannerUrl()
        );
    }
}
