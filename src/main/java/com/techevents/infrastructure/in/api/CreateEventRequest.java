package com.techevents.infrastructure.in.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record CreateEventRequest(
    @NotBlank(message = "Title is required")
    @Size(min = 5, message = "Title must be at least 5 characters long")
    String title,

    @NotBlank(message = "Description is required")
    @Size(min = 5, message = "Description must be at least 5 characters long")
    String description,

    @NotNull(message = "Date is required")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    LocalDateTime date,

    @NotBlank(message = "Location is required")
    String location
) {}
