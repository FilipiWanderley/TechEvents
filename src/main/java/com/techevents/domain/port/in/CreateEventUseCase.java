package com.techevents.domain.port.in;

import com.techevents.domain.model.Event;

public interface CreateEventUseCase {
    Event createEvent(Event event);
}
