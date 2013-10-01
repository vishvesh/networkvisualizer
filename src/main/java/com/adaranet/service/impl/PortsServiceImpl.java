package com.adaranet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Ports;
import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.repository.PortsRepository;
import com.adaranet.service.PortsService;

@Service
@Transactional
public class PortsServiceImpl implements PortsService {

	@Autowired
	private PortsRepository portsRepository;
	
	@Transactional
	public Ports saveEntity(Ports entity) {
		return portsRepository.save(entity);
	}

	@Transactional
	public void deleteEntity(Ports entity) {
		portsRepository.delete(entity);
	}

	@Transactional
	public EndResult<Ports> findAll() {
		return portsRepository.findAll();
	}

	@Transactional
	public void deleteAll() {
		portsRepository.deleteAll();
	}

	@Transactional
	public long count() {
		return portsRepository.count();
	}

	@Transactional
	public Ports findPortByPortName(String portName) {
		return portsRepository.findPortByPortName(portName);
	}

	@Transactional
	public ConnectsToPort findConnectsToRelationshipByPortNames(String sourcePortName, String destPortName) {
		return portsRepository.findConnectsToRelationshipByPortNames(sourcePortName, destPortName);
	}

}
