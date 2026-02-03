package com.techevents.infrastructure.in.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record EventRequest(
    @NotBlank String title,
    @NotBlank String description,
    @NotNull LocalDateTime date,
    @NotBlank String location
) {}
