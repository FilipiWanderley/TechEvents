package com.techevents.domain.port.in;

import com.techevents.domain.model.Event;
import java.util.List;

public interface GetEventsUseCase {
    List<Event> getAllEvents();
}
