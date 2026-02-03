package com.techevents.domain.port.out;

import java.io.InputStream;

public interface StoragePort {
    String upload(String fileName, InputStream content);
}
