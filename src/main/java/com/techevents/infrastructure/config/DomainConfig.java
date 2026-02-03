package com.techevents.infrastructure.config;

import com.techevents.domain.port.out.EventRepositoryPort;
import com.techevents.domain.port.out.StoragePort;
import com.techevents.domain.service.EventService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DomainConfig {

    @Bean
    public EventService eventService(EventRepositoryPort eventRepositoryPort, StoragePort storagePort) {
        return new EventService(eventRepositoryPort, storagePort);
    }
}
