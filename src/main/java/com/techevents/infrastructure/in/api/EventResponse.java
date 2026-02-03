package com.techevents.infrastructure.in.api;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventResponse(
    UUID id,
    String title,
    String description,
    LocalDateTime date,
    String location
) {}
