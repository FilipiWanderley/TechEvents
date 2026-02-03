package com.techevents.infrastructure.config;

import com.techevents.domain.port.in.CreateEventUseCase;
import com.techevents.domain.port.in.GetEventsUseCase;
import com.techevents.domain.port.out.EventRepositoryPort;
import com.techevents.domain.service.EventService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DomainConfig {

    @Bean
    public EventService eventService(EventRepositoryPort eventRepositoryPort) {
        return new EventService(eventRepositoryPort);
    }

    @Bean
    public CreateEventUseCase createEventUseCase(EventService eventService) {
        return eventService;
    }

    @Bean
    public GetEventsUseCase getEventsUseCase(EventService eventService) {
        return eventService;
    }
}
