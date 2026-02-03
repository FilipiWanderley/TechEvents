package com.techevents.infrastructure.in.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record CreateEventRequest(
    String title,
    String description,
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    LocalDateTime date,
    String location
) {}
