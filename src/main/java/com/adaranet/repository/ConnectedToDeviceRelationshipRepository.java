package com.adaranet.repository;

import org.springframework.data.neo4j.repository.NamedIndexRepository;

import com.adaranet.relationships.ConnectedToDevice;
import com.adaranet.repository.generic.GenericRepository;

public interface ConnectedToDeviceRelationshipRepository extends GenericRepository<ConnectedToDevice>, NamedIndexRepository<ConnectedToDevice> {

}
