package com.adaranet.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Ports;
import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.service.generic.GenericService;

@Service
@Transactional
public interface PortsService extends GenericService<Ports> {
	@Transactional
	public Ports findPortByPortName(String portName);
	@Transactional
	public ConnectsToPort findConnectsToRelationshipByPortNames(String sourcePortName, String destPortName);
}
