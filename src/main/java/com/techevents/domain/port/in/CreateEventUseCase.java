package com.techevents.domain.port.in;

import com.techevents.domain.model.Event;
import java.io.InputStream;

public interface CreateEventUseCase {
    Event createEvent(String title, String description, String date, String location, String fileName, InputStream bannerContent);
}
