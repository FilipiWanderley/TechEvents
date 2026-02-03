package com.techevents.infrastructure.out.storage;

import com.techevents.domain.port.out.StoragePort;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class LocalFileStorageAdapter implements StoragePort {

    private final Path rootLocation = Path.of("uploads");

    public LocalFileStorageAdapter() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    @Override
    public String upload(String fileName, InputStream content) {
        try {
            String storedFileName = UUID.randomUUID() + "_" + fileName;
            Path destinationFile = this.rootLocation.resolve(Path.of(storedFileName)).normalize().toAbsolutePath();
            
            Files.copy(content, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            
            return destinationFile.toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
