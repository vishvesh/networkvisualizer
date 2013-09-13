package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Port;

@RelationshipEntity(type = "CONNECTS_TO_PORT")
public class ConnectsToPort {
	
	@GraphId
	private Long id;
	
	@Fetch
	@StartNode
	private Port sourcePort;
	
	@Fetch
	@EndNode
	private Port destPort;
	
	public ConnectsToPort() {
		
	}
	
	public ConnectsToPort(Port sourcePort, Port destPort) {
		this.sourcePort = sourcePort;
		this.destPort = destPort;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Port getSourcePort() {
		return sourcePort;
	}

	public void setSourcePort(Port sourcePort) {
		this.sourcePort = sourcePort;
	}

	public Port getDestPort() {
		return destPort;
	}

	public void setDestPort(Port destPort) {
		this.destPort = destPort;
	}
	
	
}
