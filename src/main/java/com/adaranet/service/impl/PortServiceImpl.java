package com.adaranet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Port;
import com.adaranet.repository.PortRepository;
import com.adaranet.service.PortService;

@Service
@Transactional
public class PortServiceImpl implements PortService {
	
	@Autowired
	private PortRepository portRepository;

	@Transactional
	public Port saveEntity(Port entity) {
		return portRepository.save(entity);
	}

	@Transactional
	public void deleteEntity(Port entity) {
		portRepository.delete(entity);
	}

	@Transactional
	public EndResult<Port> findAll() {
		return portRepository.findAll();
	}

	@Transactional
	public void deleteAll() {
		portRepository.deleteAll();
	}

	@Transactional
	public long count() {
		return portRepository.count();
	}

	@Transactional
	public Port findPortByPortName(String portName) {
		return portRepository.findPortByPortName(portName);
	}


}
