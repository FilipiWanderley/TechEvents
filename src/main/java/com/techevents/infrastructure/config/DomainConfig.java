package com.techevents.infrastructure.config;

import com.techevents.domain.port.in.CreateEventUseCase;
import com.techevents.domain.port.out.EventRepositoryPort;
import com.techevents.domain.service.EventService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DomainConfig {

    @Bean
    public CreateEventUseCase createEventUseCase(EventRepositoryPort eventRepositoryPort) {
        return new EventService(eventRepositoryPort);
    }
}
