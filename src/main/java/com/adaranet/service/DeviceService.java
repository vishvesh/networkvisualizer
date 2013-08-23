package com.adaranet.service;

import com.adaranet.model.Device;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface DeviceService extends GraphRepository<Device> {
   
}
