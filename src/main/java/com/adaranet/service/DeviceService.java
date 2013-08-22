package com.adaranet.service;

import com.adaranet.model.Devices;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface DeviceService extends GraphRepository<Devices> {

    
}
