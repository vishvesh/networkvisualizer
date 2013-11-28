package com.adaranet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.relationships.ConnectedToDevice;
import com.adaranet.repository.ConnectedToDeviceRelationshipRepository;
import com.adaranet.service.ConnectedToDeviceRelationshipService;

@Service
@Transactional
public class ConnectedToDeviceRelationshipServiceImpl implements ConnectedToDeviceRelationshipService {
	
	@Autowired
	private ConnectedToDeviceRelationshipRepository connectedToDeviceRelationshipRepository;

	@Transactional
	public ConnectedToDevice saveEntity(ConnectedToDevice entity) {
		return connectedToDeviceRelationshipRepository.save(entity);
	}

	@Transactional
	public void deleteEntity(ConnectedToDevice entity) {
		connectedToDeviceRelationshipRepository.delete(entity);
	}

	@Transactional
	public EndResult<ConnectedToDevice> findAll() {
		return connectedToDeviceRelationshipRepository.findAll();
	}

	@Transactional
	public void deleteAll() {
		connectedToDeviceRelationshipRepository.deleteAll();
	}
	
	@Transactional
	public void delete(ConnectedToDevice entity) {
		connectedToDeviceRelationshipRepository.delete(entity);
	}

	@Transactional
	public long count() {
		return connectedToDeviceRelationshipRepository.count();
	}

}
