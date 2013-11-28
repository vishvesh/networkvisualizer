package com.adaranet.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.relationships.ConnectedToDevice;
import com.adaranet.service.generic.GenericService;

@Service
@Transactional
public interface ConnectedToDeviceRelationshipService extends GenericService<ConnectedToDevice> {

}
