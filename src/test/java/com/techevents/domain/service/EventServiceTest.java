package com.techevents.domain.service;

import com.techevents.domain.model.Event;
import com.techevents.domain.port.out.EventRepositoryPort;
import com.techevents.domain.port.out.StoragePort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepositoryPort eventRepositoryPort;

    @Mock
    private StoragePort storagePort;

    private EventService eventService;

    @BeforeEach
    void setUp() {
        eventService = new EventService(eventRepositoryPort, storagePort);
    }

    @Test
    void createEvent_Success() {
        // Given
        String title = "TechEvents Launch";
        String description = "Official Platform Launch";
        // Ensure date is in the future to pass validation
        String futureDateStr = LocalDateTime.now().plusDays(7).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        String location = "São Paulo, SP";
        
        // Mock repository to return the event passed to it
        when(eventRepositoryPort.save(any(Event.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // When
        Event result = eventService.createEvent(title, description, futureDateStr, location, null, null);

        // Then
        assertNotNull(result);
        assertEquals(title, result.getTitle());
        assertEquals(description, result.getDescription());
        assertEquals(location, result.getLocation());
        assertNotNull(result.getId()); // ID is generated in service/entity
        
        // Verify dependencies
        verify(eventRepositoryPort, times(1)).save(any(Event.class));
        verifyNoInteractions(storagePort); // No file provided, so no upload
    }

    @Test
    void createEvent_Exception_NullTitle() {
        // Given
        String title = null; // Invalid
        String description = "Valid Description";
        String futureDateStr = LocalDateTime.now().plusDays(1).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        String location = "Valid Location";

        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            eventService.createEvent(title, description, futureDateStr, location, null, null);
        });

        assertEquals("Event title cannot be null or empty", exception.getMessage());
        
        // Verify repository is NOT called
        verify(eventRepositoryPort, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenDateIsPast() {
        // Given
        String title = "Past Event";
        String description = "This event happened already";
        // Date in the past
        String pastDateStr = "2020-01-01T10:00:00";
        String location = "History Museum";

        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            eventService.createEvent(title, description, pastDateStr, location, null, null);
        });

        assertEquals("Event date cannot be in the past", exception.getMessage());
        
        // Ensure repository is NEVER called when validation fails
        verifyNoInteractions(eventRepositoryPort);
        verifyNoInteractions(storagePort);
    }
}
