package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Port;
import com.adaranet.util.RelationshipTypes;

@RelationshipEntity(type = RelationshipTypes.CONNECTS_TO_PORT)
public class ConnectsToPort {
	
	@GraphId
	private Long id;
	
	@Fetch
	@StartNode
	private Port sourcePort;
	
	@Fetch
	@EndNode
	private Port destPort;
	
	private String linkCapacity;
	private String availableBandwidth;
	private String latency;
	
	public ConnectsToPort() {
		
	}
	
	public ConnectsToPort(Port sourcePort, Port destPort) {
		super();
		this.sourcePort = sourcePort;
		this.destPort = destPort;
	}
	
	public ConnectsToPort(Port sourcePort, Port destPort, String linkCapacity, String availableBandwidth, String latency) {
		super();
		this.sourcePort = sourcePort;
		this.destPort = destPort;
		this.linkCapacity = linkCapacity;
		this.availableBandwidth = availableBandwidth;
		this.latency = latency;
	}

	public String getLinkCapacity() {
		return linkCapacity;
	}

	public void setLinkCapacity(String linkCapacity) {
		this.linkCapacity = linkCapacity;
	}

	public String getAvailableBandwidth() {
		return availableBandwidth;
	}

	public void setAvailableBandwidth(String availableBandwidth) {
		this.availableBandwidth = availableBandwidth;
	}

	public String getLatency() {
		return latency;
	}

	public void setLatency(String latency) {
		this.latency = latency;
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
