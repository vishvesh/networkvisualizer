package com.adaranet.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Port;
import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.service.generic.GenericService;

@Service
@Transactional
public interface PortService extends GenericService<Port> {
	@Transactional
	public Port findPortByPortName(String portName);
	@Transactional
	public ConnectsToPort findConnectsToRelationshipByPortNames(String sourcePortName, String destPortName);
}
