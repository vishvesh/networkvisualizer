package com.adaranet.repository;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.annotation.QueryType;

import com.adaranet.model.Port;
import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.repository.generic.GenericRepository;

public interface PortRepository extends GenericRepository<Port> {
	
	public Port findPortByPortName(String portName);
	
	@Query(type = QueryType.Cypher, value = "START root = node:Port(portName = {0}) " +
			"MATCH (root) - [relationship:CONNECTS_TO_PORT] -> port " +
			"RETURN relationship")
	public ConnectsToPort findConnectsToRelationshipByPortNames(String sourcePortName, String destPortName);
}
