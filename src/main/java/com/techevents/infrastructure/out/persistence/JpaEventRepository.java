package com.techevents.infrastructure.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface JpaEventRepository extends JpaRepository<EventEntity, UUID> {
}
